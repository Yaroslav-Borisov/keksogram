import { closeModal, escCloseModal } from "./utils.js"

const renderComments = (comments) => {
    const socialComments = document.querySelector('.social__comments')
    socialComments.innerHTML = ''

    const commentsHtml = []
    comments.forEach((comment) => {
        commentsHtml.push(
            `<li class="social__comment hidden">
                <img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
                <p class="social__text">${comment.message}</p>
            </li>`
        )
    })

    commentsHtml.forEach((commentHtml) => {
        socialComments.insertAdjacentHTML('beforeend', commentHtml)
    })
}

const openPreview = ({ url, comments, likes, description }) => {
    const bigPictureContainer = document.querySelector('.big-picture')
    const bigPicture = bigPictureContainer.querySelector('.big-picture__img').firstElementChild
    const likesCount = bigPictureContainer.querySelector('.likes-count')
    const commentsCount = bigPictureContainer.querySelector('.comments-count')
    const pictureDesc = bigPictureContainer.querySelector('.social__caption')
    const socialCommentCount = commentsCount.parentElement
    const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader')
    const currentCommentsCount = bigPictureContainer.querySelector('.comment-count-current')
    const bodyElement = document.querySelector('body')

    const pictureCloseButton = document.querySelector('#picture-cancel')
    pictureCloseButton.addEventListener('click', () => {
        closeModal(bigPictureContainer)
    })

    escCloseModal(bigPictureContainer)

    bodyElement.classList.add('modal-open')
    bigPictureContainer.classList.remove('hidden')

    bigPicture.setAttribute('src', url)
    likesCount.textContent = likes
    commentsCount.textContent = comments.length
    pictureDesc.textContent = description

    // Загрузка комментариев

    let commentCount = 5
    
    if (comments.length < 5) {
        currentCommentsCount.innerHTML = comments.length
    } else {
        currentCommentsCount.innerHTML = commentCount
    }
    
    commentsLoaderButton.addEventListener('click', (evt) => {
        const commentsArr = document.querySelectorAll('.social__comment')
        commentCount = commentCount + 5

        if (commentCount >= commentsArr.length) {
            currentCommentsCount.innerHTML = comments.length
            commentsArr.forEach((comment) => comment.classList.remove('hidden'))
            evt.target.classList.add('hidden')
        } else {
            for (let i = 0; i <= commentCount - 1; i++) {
                currentCommentsCount.innerHTML = commentCount
                commentsArr[i].classList.remove('hidden')
            }
        }

    })

    // Лайки

    likesCount.addEventListener('click', () => {
        
        if (parseInt(likesCount.textContent) === likes + 1) {
            likesCount.innerHTML = likes 
        } else {
            likesCount.innerHTML = likes + 1
        }

    })
}

export { openPreview, renderComments }