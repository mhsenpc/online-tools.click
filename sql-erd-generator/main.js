const sqlInput = document.getElementById('sql-input');
const erdContainer = document.getElementById('erd-container');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
    const sql = sqlInput.value;
    const tables = parseSQL(sql);
    renderERD(tables);
});

function parseSQL(sql) {
    const tableMatches = [...sql.matchAll(/CREATE TABLE (\w+)\s*\(([\s\S]*?)\)/gi)];
    return tableMatches.map(match => ({
        name: match[1],
        columns: match[2].split(',').map(col => col.trim().split(' ')[0])
    }));
}

function renderERD(tables) {
    erdContainer.innerHTML = '';
    tables.forEach(table => {
        const div = document.createElement('div');
        div.style.border = '1px solid black';
        div.style.margin = '10px';
        div.style.padding = '10px';
        div.innerHTML = '<strong>' + table.name + '</strong><ul>' + 
            table.columns.map(col => '<li>' + col + '</li>').join('') + '</ul>';
        erdContainer.appendChild(div);
    });
}
