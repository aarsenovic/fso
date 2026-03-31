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


module.exports = {
    dummy,
    totalLikes 
}