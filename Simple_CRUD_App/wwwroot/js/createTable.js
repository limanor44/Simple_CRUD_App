async function getAllContacts() {
    const responce = await fetch('/api/contacts');
    const json = await responce.json();
    return json;
}

function createTableBody(data) {
    const tableData = data.map(item => {
        const birthDate = new Date(item.birthDate);
        return (
            `<tr onclick = 'console.log(${item.id})'>
                <td scope="row" hidden >${item.id}</td>
                <td scope="row">${item.name}</td>
                <td scope="row">${item.mobilePhone}</td>
                <td scope="row">${item.jobTitle}</td>
                <td scope="row">${birthDate.toDateString()}</td>
            </tr>`
        );
    }).join('');
    $("#table-body").append(tableData);
}

function getDateFormat(date) {
    return `
        ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
    `;
}

function openCreateModal(id) {

}