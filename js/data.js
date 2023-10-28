import { getRandomElementArr, getRandomInt } from "./utils.js";

const AUTHOR_COMMENT_NAMES = [
    'Артём', 
    'Володя', 
    'Анжелла', 
    'Даша', 
    'Павел', 
    'Влад'
]

const COMMENTS_TEXTS = [
    'Всё отлично!', 
    'В целом всё неплохо. Но не всё.', 
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const addComments = () => {
    const comments = []
    const commentsCount = getRandomInt(1, 2)

    if (commentsCount === 1) {
        comments.push(getRandomElementArr(COMMENTS_TEXTS))
    } else {
        const firstComment = getRandomElementArr(COMMENTS_TEXTS)
        const commentsWithoutFirst = COMMENTS_TEXTS.filter((comment) => { return comment !== firstComment })
        const secondComment = getRandomElementArr(commentsWithoutFirst)

        comments.push(firstComment + ' ' + secondComment)
    }

    return comments
}

const createMockData = () => {
    const mockData = new Array(25).fill(null).map(() => {
        return {
            id: getRandomInt(1, 25),
            url: `photos/${getRandomInt(1, 25)}.jpg`,
            description: 'Мне понравилась эта фотография, потому что она передаёт чувства и эмоции присутствующих на ней людей. Я считаю, что снимок получился удачным.',
            likes: getRandomInt(15, 200),
            comments: [
                {
                    id: getRandomInt(1, 200),
                    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
                    message: addComments(),
                    name: getRandomElementArr(AUTHOR_COMMENT_NAMES),
                }
            ]
        }
    })

    return mockData
}

export { createMockData }