var modalMode = '';

async function createTableBody() {
    const data = await getAllContacts();
    // console.log(data.contacts);
    renderTableBody(data.contacts);
}
async function getAllContacts() {
    const responce = await fetch('/api/contacts');
    const json = await responce.json();
    return json;
}
//
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

function getDateFormat(date) {
    return `
        ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
    `;
}
//функция валидации полей формы
//DONE
function fieldsValidation(e) {
    const nameRegEx = /^[A-Za-zА-Яа-яЁё]+\s+[A-Za-zА-Яа-яЁё]+$/;
    const phoneRegEx = /^\+?\d{7,15}$/;

    let messages = [];

    const errorElem = document.getElementById('errors');
    errorElem.innerHTML = '';
    //console.log(errorElem);
    const modalBody = document.querySelector('.modal-body');
    //console.log(modalBody);

    const form = e.target;

    for (item of modalBody.children) {
        //console.log(item.tagName);
        if (item.tagName === 'INPUT') {
            switch (item.name) {
                case 'name':
                    if (!nameRegEx.test(item.value.trim())) {
                        messages.push("Введите ФИО в формате \"Фамилия Имя\"");
                    }
                    break;
                case 'mobilePhone':
                    if (!phoneRegEx.test(item.value.trim())) {
                        messages.push("Введите номер телефона в формате +999999999999.");
                    }
                    break;
                //case 'jobTitle':
                //    break;
                case 'birthDate':
                    //console.log(item.value > Date.now());
                    if (new Date(item.value) > Date.now()) {
                        messages.push("\"Дата рождения\" не может быть больше текущей даты");
                    }
                    break;
            }
        }
    }
    
    //console.log(messages.length);
    if (messages.length > 0) {
        e.preventDefault();
        const ul = document.createElement('ul');
        messages.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            ul.appendChild(li);
        });
        errorElem.appendChild(ul);
    }

    return messages.length == 0;
}

function addModalEvents(){
    const exampleModal = document.getElementById('contactModal');
    if (exampleModal) {
        //изменение модального окна в зависмости объекта вызова
        exampleModal.addEventListener('show.bs.modal', event => toggleModalContent(event, exampleModal));
        //очистка модального окна после закрытия
        exampleModal.addEventListener('hide.bs.modal', event => closeModal());

        const modalForm = document.getElementById('modalForm');
        modalForm.addEventListener("submit", event => sendContact(event));

    }
}

function closeModal() {
    clearModal();
    createTableBody();
}
//очистка модального окна
//DONE
function clearModal() {
    const modalBody = document.querySelector('.modal-body');
    // console.log(modalBody);
    for (item of modalBody.children) {
        // console.log(item.tagName);
        if (item.tagName === 'INPUT') {
            item.value = '';
        }
        document.getElementById('errors').innerHTML = '';
    }
}

function toggleModalContent(event, exampleModal){
    const targetElement = event.relatedTarget

     //console.log(targetElement);

    const recipient = targetElement.getAttribute('data-bs-whatever');

    // console.log(recipient);

    const modalTitle = exampleModal.querySelector('.modal-title');

    // const submitBtn =

    switch (recipient) {
        case 'create':
            modalMode = 'create';
            modalTitle.textContent = `Создать контакт`
            break;

        case 'edit':
            modalMode = 'edit';
            modalTitle.textContent = `Изменить контакт`
            const idRow = targetElement.getAttribute('id-row');
            // console.log(idRow);
            //const contact = getContact(idRow).then(data => { return data; });
            //console.log(contact);
            //contact.then(data => console.log(data));
            setFormFields(idRow);
            break;
    }
}

async function setFormFields(id) {
    const contact = await getContact(id);
    //console.log(contact);
    if (contact) {
        let date = new Date(contact.birthDate);

        //console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);
        $('#form-id').val(contact.id);
        $('#form-name').val(contact.name);
        $('#form-phone').val(contact.mobilePhone);
        $('#form-job-title').val(contact.jobTitle);
        $('#form-birth-date').val(date.toISOString().substr(0, 10));
    }

}

async function getContact(id) {
    //console.log(id);
    const responce = await fetch(`/api/contacts/${id}`);
    const json = await responce.json();
    return json;
}

async function sendJSONData(method, url, obj) {
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

async function sendContact(e) {
    let contact = {
        id: $('#form-id').val(),
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
                responce = await sendJSONData('POST', '/api/contacts', contact);
                break;
            case 'edit':
                responce = await sendJSONData('PUT', `/api/contacts/${contact.id}`, contact);
                break;
        }
    }
    if (responce.ok) {
        alert('Контакт успешно создан!');
    } else {
        alert('Ошибка сервера!<br>Попробуйте позже.')
    }
    //console.log(responce);

}
