import { showFiltersContainer } from "./filters.js"
import { renderPictures } from "./pictures.js"


const renderServerPhotos = () => {
    fetch('https://23.javascript.pages.academy/kekstagram/data')
        .then((response) => response.json())
        .then((photos) => {
            return renderPictures(photos)
        })
        .then(() => showFiltersContainer())
        .catch((error) => console.log(error))
}

export { renderServerPhotos }


