export const ConvertDayNumbertoDayName = (dayNumber) => {
    switch (dayNumber) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        default:
            return "Good Day"
    }
}


export const dispatchEditBlog = (blogs,id,data) => {
    let updatedBlogs = blogs.map((blog)=>{
        if(blog._id ===id ){
            blog.title = data.title
            blog.description = data.description,
            blog.keywordone = data.keywordone
            blog.keywordtwo = data.keywordtwo
            blog.keywordthree = data.keywordthree
            blog.url = data.url
            return blog
        }
        return blog
    })
    return updatedBlogs
}

export const dispatchDeleteBlog = (blogs,id) => {
    let updatedBlogs = blogs.filter((blog) => blog._id !== id)
    return updatedBlogs
}