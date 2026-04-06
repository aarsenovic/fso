const countBy = require('lodash/countBy')
const maxBy = require('lodash/maxBy')

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogList) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogList.length === 0
        ? 0
        : blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {

    if (blogList.length === 0) {
        return null
    }

    const mostLikes = blogList.reduce((max, item) => (item.likes > max.likes ? item : max))

    return mostLikes
}

const mostBlogs = (blogList) => {
    if (blogList.length === 0) {
        return null
    }

    const blogsCount = countBy(blogList, 'author')
    const authorWithMostBlogs = Object.keys(blogsCount).reduce((most, item) => blogsCount[most] > blogsCount[item] ? most : item)




    return { author: authorWithMostBlogs, blogs: blogsCount[authorWithMostBlogs] }

}

const mostLikes = (blogList) => {
    if (blogList.length === 0) {
        return null
    }



    const authoursWithLikes = {}

    const count = (item) => {
        if (authoursWithLikes.hasOwnProperty(item.author) === false) {
            authoursWithLikes[item.author] = 0;
        }

        authoursWithLikes[item.author] = authoursWithLikes[item.author] + item.likes

    }

    blogList.forEach(count)

    const maxVal = Math.max(...Object.values(authoursWithLikes));
    const maxKey = Object.keys(authoursWithLikes).filter(key => authoursWithLikes[key] === maxVal);


    
    return {author:maxKey[0], 
            likes:maxVal}
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}