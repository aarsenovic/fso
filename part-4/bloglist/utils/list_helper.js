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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}