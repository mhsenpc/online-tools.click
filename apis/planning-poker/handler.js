import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "PlanningPoker";

export const handler = async (event) => {
    const { action, sessionId, userId, userName, vote } = JSON.parse(event.body);

    try {
        switch (action) {
            case "join":
                // اضافه کردن کاربر به سشن
                await docClient.send(new UpdateCommand({
                    TableName: TABLE_NAME,
                    Key: { sessionId },
                    UpdateExpression: "SET users.#uid = :uinfo",
                    ExpressionAttributeNames: { "#uid": userId },
                    ExpressionAttributeValues: { ":uinfo": { name: userName, vote: null } }
                }));
                break;

            case "vote":
                // ثبت رای
                await docClient.send(new UpdateCommand({
                    TableName: TABLE_NAME,
                    Key: { sessionId },
                    UpdateExpression: "SET users.#uid.vote = :v",
                    ExpressionAttributeNames: { "#uid": userId },
                    ExpressionAttributeValues: { ":v": vote }
                }));
                break;

            case "show":
                // نمایش آرا (فقط وضعیت رو عوض می‌کنیم)
                await docClient.send(new UpdateCommand({
                    TableName: TABLE_NAME,
                    Key: { sessionId },
                    UpdateExpression: "SET visible = :v",
                    ExpressionAttributeValues: { ":v": true }
                }));
                break;

            case "reset":
                // پاک کردن آرا
                const session = await docClient.send(new GetCommand({ TableName: TABLE_NAME, Key: { sessionId } }));
                const users = session.Item.users;
                Object.keys(users).forEach(uid => users[uid].vote = null);
                
                await docClient.send(new UpdateCommand({
                    TableName: TABLE_NAME,
                    Key: { sessionId },
                    UpdateExpression: "SET users = :u, visible = :v",
                    ExpressionAttributeValues: { ":u": users, ":v": false }
                }));
                break;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Success" }),
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        };
    }
};
