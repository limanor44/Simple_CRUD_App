function closeModal() {
    clearModal();
    createTableBody();
}

//очистка модального окна
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
//содержание в зависмости от вызова
function toggleModalContent(event, exampleModal) {
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
            document.getElementById("deleteBtn").style = 'display: none';
            break;

        case 'edit':
            modalMode = 'edit';
            modalTitle.textContent = `Изменить контакт`;
            document.getElementById("deleteBtn").style = '';
            const idRow = targetElement.getAttribute('id-row');
            // console.log(idRow);
            //const contact = getContact(idRow).then(data => { return data; });
            //console.log(contact);
            //contact.then(data => console.log(data));
            setFormFields(idRow);
            break;
    }
}
// получение контакта и 
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
//форматирование даты
function getDateFormat(date) {
    return `
        ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
    `;
}
//функция валидации полей формы
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
                        messages.push("\"Дата рождения\" не может быть позже текущей даты");
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
// добавление эвентов модального окна
function addModalEvents() {
    const exampleModal = document.getElementById('contactModal');
    if (exampleModal) {
        //изменение модального окна в зависмости объекта вызова
        exampleModal.addEventListener('show.bs.modal', event => toggleModalContent(event, exampleModal));
        //очистка модального окна после закрытия
        exampleModal.addEventListener('hide.bs.modal', event => closeModal());
        // добавление/изменение контакта
        const modalForm = document.getElementById('modalForm');
        modalForm.addEventListener("submit", event => sendContact(event));
        //удаление контакта
        const deleteBtn = document.getElementById('deleteBtn');
        deleteBtn.addEventListener("click", event => deleteContact());
    }
}