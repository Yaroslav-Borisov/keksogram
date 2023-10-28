import { closeModal, escCloseModal } from "./utils.js"

const successTemplate = document.querySelector('#success').content
const successFragment = document.createDocumentFragment()

const showSuccessAlert = (root) => {
    const successElement = successTemplate.cloneNode(true)
    const successButton = successElement.querySelector('.success__button')
    
    successButton.addEventListener('click', () => {
        closeModal(successButton.parentElement.parentElement)
    })
    
    escCloseModal(successButton.parentElement.parentElement)
    
    successFragment.appendChild(successElement)
    root.appendChild(successFragment)
}

const errorTemplate = document.querySelector('#error').content
const errorFragment = document.createDocumentFragment()

const showErrorAlert = (root) => {
    const errorElement = errorTemplate.cloneNode(true)
    const errorButton = errorElement.querySelector('.error__button')

    errorButton.addEventListener('click', () => {
        closeModal(errorButton.parentElement.parentElement)
    })
    
    escCloseModal(errorButton.parentElement.parentElement)
    
    errorFragment.appendChild(errorElement)
    root.appendChild(errorFragment)
}

export { showSuccessAlert, showErrorAlert }