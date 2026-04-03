const countBy = require('lodash/countBy')

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogList) => {
    const reducer = ( sum, item ) => {
        return sum  + item.likes
    }

    return blogList.length === 0
    ? 0
    : blogList.reduce(reducer,  0)
}

const favoriteBlog = (blogList) => {
    
    if(blogList.length === 0) {
        return null
    }

    const mostLikes = blogList.reduce(( max, item ) => (item.likes > max.likes ? item : max))

    return mostLikes
}

const mostBlogs = (blogList) => {
    if(blogList.length === 0) {
        return null
    }
    
    const blogsCount = countBy(blogList, 'author')
    const authorWithMostBlogs = Object.keys(blogsCount).reduce((most,item) => blogsCount[most]>blogsCount[item] ?most :item) 


    

    return {author: authorWithMostBlogs, blogs: blogsCount[authorWithMostBlogs]}
   
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}