import { showErrorAlert, showSuccessAlert } from './alerts.js';
import { effectLevel, lastClass } from './effects.js';
import { closeModal, escCloseModal } from './utils.js';

const Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
}

const Slider = {
    MAX: 100,
    MIN: 0,
    STEP: 1,
}

const bodyElement = document.querySelector('body')
const uploadModal = document.querySelector('.img-upload__overlay')
const uploadModalCloseButton = document.querySelector('#upload-cancel')
const uploadInput = document.querySelector('#upload-file')

// Открытие и закрытие модалки редактирования изображения

uploadInput.addEventListener('change', () => {
    uploadModal.classList.remove('hidden')
    bodyElement.classList.add('modal-open')
    resetSettings()
})

uploadModalCloseButton.addEventListener('click', () => {
    closeModal(uploadModal)
    uploadInput.value = ''
})

escCloseModal(uploadModal)

// Изменение масштаба изображения

const scaleSmallerButton = uploadModal.querySelector('.scale__control--smaller')
const scaleBiggerButton = uploadModal.querySelector('.scale__control--bigger')
const scaleInput = uploadModal.querySelector('.scale__control--value')
const imagePreview = uploadModal.querySelector('.img-upload__preview > img')


const resetSettings = () => {
    imagePreview.style = 'transform: scale(1.00)'
    imagePreview.style.filter = ''

    if (lastClass) {
        imagePreview.classList.remove(lastClass)
    }

    scaleInput.value = '100%'
    effectLevel.classList.add('visually-hidden')
}

const scaleChanger = (sign) => {
    let scale = parseInt(scaleInput.value, 10)

    if (sign === 'minus') {
        scale = scale - Scale.STEP
    }

    if (sign === 'plus') {
        scale = scale + Scale.STEP
    }

    if (scale >= Scale.MAX) {
        scale = Scale.MAX
    }

    if (scale <= Scale.MIN) {
        scale = Scale.MIN
    }

    scaleInput.value = scale + '%'
    scale = scale / 100
    imagePreview.style.transform = `scale(${scale})`
}

scaleSmallerButton.addEventListener('click', () => {
    scaleChanger('minus')
})

scaleBiggerButton.addEventListener('click', () => {
    scaleChanger('plus')
})

// Отправка фотки на сервер

const main = document.querySelector('main')
const uploadImageForm = document.querySelector('#upload-select-image')

uploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    closeModal(uploadModal)

    const formData = new FormData(uploadImageForm)

    fetch('https://23.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,
    })
        .then(() => showSuccessAlert(main))
        .then(() => uploadImageForm.reset())
        .catch(() => showErrorAlert(main))
})



