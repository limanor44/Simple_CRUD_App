var modalMode = '';// значение модального окна в зависмости добавление или изменение

// получение данных таблицы + отрисовка
async function createTableBody() {
    const data = await getAllContacts();
    // console.log(data.contacts);
    renderTableBody(data.contacts);
}
//отрисовка таблицы
function renderTableBody(data) {
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
    $("#table-body").html('');
    $("#table-body").append(tableData);
}
// отображение результата запроса
function showMessage(responce) {
    if (responce.ok) {
        alert('Успешно!');
    } else {
        alert('Ошибка!Попробуйте позже.')
    }
    const contactModal = document.getElementById('contactModal');
    const modal = bootstrap.Modal.getInstance(contactModal);
    modal.hide();
}
