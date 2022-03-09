const URL = 'https://jsonplaceholder.typicode.com/posts';
const emailRegExp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');

const popup = document.querySelector('.popup');
const body = document.querySelector('body');
const popupCrossButton = document.querySelector('.cross__button');
const popupCloseButton = document.querySelector('.close__button');
const emailInput = document.querySelector('.email__input');
const submitButton = document.querySelector('.submit__button');
const popupTitle = document.querySelector('.popup__title');
const popupText = document.querySelector('.popup__text');

function successModalContent(email) {
    popupTitle.textContent = 'Success';
    popupText.textContent = `You have successfully subscribed to the email newsletter with ${email}`;
}

function failedModalContent(error) {
    popupTitle.textContent = 'Failed';
    popupText.textContent = `You have not subscribed to the email newsletter. Error: ${error}`;
}

function openModal() {
    body.classList.add('overflow-hidden')
    popup.classList.remove('hidden')
    popup.classList.add('opened')
}

function hideModal() {
    body.classList.remove('overflow-hidden');
    popup.classList.remove('opened');
    popup.classList.add('hidden');
    emailInput.value = '';
}

function subscribeForAnEvent(email) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ email }), 
    }

    return fetch(URL, options)
        .then((response) => response.json())
        .then((json) => {
            successModalContent(json.email);
            openModal()
        })
        .catch((error) => {
            failedModalContent(error.message);
            openModal();
        })
}

submitButton.addEventListener('click', (event) => {
    if (emailRegExp.test(emailInput.value)) {
        return subscribeForAnEvent(emailInput.value)
    }
})
popupCrossButton.addEventListener('click', hideModal)
popupCloseButton.addEventListener('click', hideModal)