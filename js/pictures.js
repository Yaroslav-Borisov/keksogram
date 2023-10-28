import { openPreview, renderComments } from "./preview.js"

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture')

const renderPicture = ({ url, comments, likes, description }) => {
    const pictureElement = pictureTemplate.cloneNode(true)

    pictureElement.querySelector('.picture__img').src = url
    pictureElement.querySelector('.picture__likes').textContent = likes
    pictureElement.querySelector('.picture__comments').textContent = comments.length

    pictureElement.addEventListener('click', (event) => {
        event.preventDefault()
        openPreview({ url, comments, likes, description })
        renderComments(comments)

        const socialCommentsArr = document.querySelectorAll('.social__comment')
        if (comments.length < 5) {
            for (let i = 0; i <= socialCommentsArr.length - 1; i++) {
                socialCommentsArr[i].classList.remove('hidden')
                document.querySelector('social__comments-loader').classList.add('hidden')
            }
        } else {
            for (let i = 0; i <= 4; i++) {
                socialCommentsArr[i].classList.remove('hidden')
            }
        }

    })

    return pictureElement
}

const renderPictures = (pictures) => {
    let picturesContainerFragment = document.createDocumentFragment()
    const usersPicturesContainer = document.querySelector('#users-pictures')

    usersPicturesContainer.style.display = 'contents'

    pictures.forEach((picture) => {
        picturesContainerFragment.appendChild(renderPicture(picture))
    })

    usersPicturesContainer.innerHTML = ''
    usersPicturesContainer.appendChild(picturesContainerFragment)
}

export { renderPictures }