const hashtagsInputElement = document.querySelector('.text__hashtags')
const commentAreaElement = document.querySelector('.text__description')

hashtagsInputElement.addEventListener('input', () => {
    hashtagsInputElement.setCustomValidity('')

    let hashtagsInputText = hashtagsInputElement.value.toLowerCase().trim()

    const hashtags = hashtagsInputText.split(' ')

    if (hashtags.length === 0) {
        return
    }

    const isStartNotHashtag = hashtags.some((item) => {
        return item[0] !== '#'
    })

    if (isStartNotHashtag) {
        hashtagsInputElement.setCustomValidity('Хэштег должен начинаться с #')
    }

    const isOnlyLatticeHashtag = hashtags.some((item) => {
        return item === '#'
    })

    if (isOnlyLatticeHashtag) {
        hashtagsInputElement.setCustomValidity('Хэштег не может состоять только из #')
    }

    const isSplitSpaceHashtag = hashtags.some((item) => {
        return item.indexOf('#', 1) >= 1
    })

    if (isSplitSpaceHashtag) {
        hashtagsInputElement.setCustomValidity('Хэштеги должны разделяться пробелами')
    }

    const isRepeatingHashtag = hashtags.some((item, i, arr) => {
        return hashtags.indexOf(item, i + 1) >= i + 1
    })

    if (isRepeatingHashtag) {
        hashtagsInputElement.setCustomValidity('Хэштеги не должны повторяться')
    }

    const isLongHashtag = hashtags.some((item) => {
        return item.length > 25
    })

    if (isLongHashtag) {
        hashtagsInputElement.setCustomValidity('Хэштег не должен превышать 25 симоволов')
    }

    if (hashtags.length > 5) {
        hashtagsInputElement.setCustomValidity('Максимум 5  хэштегов')
    }
})