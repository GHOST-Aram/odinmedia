export const formatUser = (user) =>{
    return {
        id: user._id.toString(),
        name: `${user.first_name} ${user.last_name}`,
        pictureUrl: user.pictureUrl
    }
}