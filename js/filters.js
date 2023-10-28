import { renderPictures } from "./pictures.js"
import { renderServerPhotos } from "./server.js"

const showFiltersContainer = () => {
    const imageFiltersContainer = document.querySelector('.img-filters')
    imageFiltersContainer.classList.remove('img-filters--inactive')
}

const imageFilterButtons = document.querySelectorAll('.img-filters__button')

const renderTenRandomPhotos = () => {
    fetch('https://23.javascript.pages.academy/kekstagram/data')
        .then((response) => response.json())
        .then((photos) => {
            const tenRandomPhotos = photos.slice().sort(() => Math.random() - 0.5).slice(0, 10)
            return renderPictures(tenRandomPhotos)
        })
        .then(() => showFiltersContainer())
        .catch((error) => console.log(error))
}

const getPhotoCommentLength = (photo) => {
    return photo.comments.length
}

const renderDiscussedPhotos = () => {
    fetch('https://23.javascript.pages.academy/kekstagram/data')
        .then((response) => response.json())
        .then((photos) => {
            const discussedPhotos = photos.slice().sort((a, b) => getPhotoCommentLength(b) - getPhotoCommentLength(a))
            return renderPictures(discussedPhotos)
        })
        .then(() => showFiltersContainer())
        .catch((error) => console.log(error))
}

document.querySelector('.img-filters__form').addEventListener('click', _.debounce((evt) => {
        
    if (evt.target.getAttribute('id') === 'filter-random') {
        renderTenRandomPhotos()
    }

    if (evt.target.getAttribute('id') === 'filter-default') {
        renderServerPhotos()
    }

    if (evt.target.getAttribute('id') === 'filter-discussed') {
        renderDiscussedPhotos()
    }
}, 500))

imageFilterButtons.forEach((filter) => {
    

    filter.addEventListener('click', () => {
        imageFilterButtons.forEach((filter) => filter.classList.remove('img-filters__button--active'))
        filter.classList.add('img-filters__button--active')
    })
})

export { showFiltersContainer }