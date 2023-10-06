export const formatAuthor = (author) =>{
    return {
        id: author._id.toString(),
        name: `${author.first_name} ${author.last_name}`,
        pictureUrl: author.pictureUrl
    }
}