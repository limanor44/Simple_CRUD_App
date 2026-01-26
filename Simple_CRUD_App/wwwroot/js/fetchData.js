//gлучение всех контактов
async function getAllContacts() {
    const responce = await fetch('/api/contacts');
    const json = await responce.json();
    return json;
}
//получение контакта по id
async function getContact(id) {
    //console.log(id);
    const responce = await fetch(`/api/contacts/${id}`);
    const json = await responce.json();
    return json;
}
// отправка запроса на сервер
async function sendRequest(method, url, obj = undefined) {
    let responce = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    return responce;
}
//отправка контакта
async function sendContact(e) {
    let contact = {
        id: $('#form-id').val() || 0,
        name: $('#form-name').val(),
        mobilePhone: $('#form-phone').val(),
        jobTitle: $('#form-job-title').val(),
        birthDate: $('#form-birth-date').val()
    };
    //console.log(contact);
    //console.log(JSON.stringify(contact));
    let responce;
    if (fieldsValidation(e)) {
        e.preventDefault();
        switch (modalMode) {
            case 'create':
                responce = await sendRequest('POST', '/api/contacts', contact);
                break;
            case 'edit':
                responce = await sendRequest('PUT', `/api/contacts/${contact.id}`, contact);
                break;
        }
        showMessage(responce)
    }
    //console.log(responce);
}
//удавление контакта
async function deleteContact() {
    if (confirm('Удалить контакт?')) {
        const id = document.getElementById('form-id');
        console.log(id.value);
        let responce = await sendRequest('DELETE', `/api/contacts/${id.value}`);
        showMessage(responce);
    }
}
