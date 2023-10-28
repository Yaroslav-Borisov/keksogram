const Keys = {
    ESC: 'Esc',
    ESCAPE: 'Escape',
}

const getRandomInt = (start, end) => {
    if (start < 0 || end < 0) {
        return -1
    }

    if (start > end) {
        [start, end] = [end, start]
    }

    return ((Math.random() * (end - start)) + start).toFixed(0)
}

const getRandomElementArr = (arr) => {
    return arr[getRandomInt(0, arr.length -1)]
}

const checkStringLength = (str, length) => {
    if (str.length <= length) {
        return true
    } else {
        return false
    }
}

const closeModal = (modal) => {
    const bodyElement = document.querySelector('body')

    modal.classList.add('hidden')
    bodyElement.classList.remove('modal-open')
}

const escCloseModal = (modal) => {
    document.addEventListener('keydown', (evt) => {
        if(evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
            closeModal(modal)
        }
    })
}

export {getRandomInt,checkStringLength, getRandomElementArr, closeModal, escCloseModal }