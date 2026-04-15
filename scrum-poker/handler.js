
let sessions = {};

export async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/scrum-poker', '');
    const method = request.method;

    // Helper to return JSON
    const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });

    try {
        if (path === '/status' && method === 'GET') {
            const sessionId = url.searchParams.get('sessionId');
            if (!sessionId || !sessions[sessionId]) return jsonResponse({ error: 'Session not found' }, 404);
            return jsonResponse(sessions[sessionId]);
        }

        if (path === '/join' && method === 'POST') {
            const { sessionId, userName, userId } = await request.json();
            if (!sessions[sessionId]) {
                sessions[sessionId] = { users: {}, revealed: false };
            }
            sessions[sessionId].users[userId] = { name: userName, vote: null };
            return jsonResponse(sessions[sessionId]);
        }

        if (path === '/vote' && method === 'POST') {
            const { sessionId, userId, vote } = await request.json();
            if (!sessions[sessionId]) return jsonResponse({ error: 'Session not found' }, 404);
            sessions[sessionId].users[userId].vote = vote;
            return jsonResponse({ success: true });
        }

        if (path === '/reveal' && method === 'POST') {
            const { sessionId } = await request.json();
            if (!sessions[sessionId]) return jsonResponse({ error: 'Session not found' }, 404);
            sessions[sessionId].revealed = true;
            return jsonResponse({ success: true });
        }

        if (path === '/reset' && method === 'POST') {
            const { sessionId } = await request.json();
            if (!sessions[sessionId]) return jsonResponse({ error: 'Session not found' }, 404);
            sessions[sessionId].revealed = false;
            Object.keys(sessions[sessionId].users).forEach(uid => {
                sessions[sessionId].users[uid].vote = null;
            });
            return jsonResponse({ success: true });
        }

        return jsonResponse({ error: 'Not Found' }, 404);
    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}
