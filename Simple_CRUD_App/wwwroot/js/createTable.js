async function getAllContacts() {
    const responce = await fetch('/api/contacts');
    const json = await responce.json();
    return json;
}

function createTableBody(data) {
    const tableData = data.map(item => {
        const birthDate = new Date(item.birthDate);
        return (
            `<tr data-bs-toggle="modal"  data-bs-target="#contactModal" data-bs-whatever="edit" id-row=${item.id} )'>
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
//функция валидации полей формы
function fieldsValidation() {
    const phoneRegEx = '^\+375\d{9}$';

    const modalBody = document.querySelector('.modal-body');
    // console.log(modalBody);
    for (item of modalBody.children) {
        // console.log(item.tagName);
        if (item.tagName === 'INPUT') {
            switch (item.name) {
                case 'name':

                    break;
                case 'mobilePhone':
                    break;
                case 'jobTitle':
                    break;
                case 'birthDate':
                    break;
        }
        }
    }
}