
const normalizeUser = (user)=>{
    user = user.toJSON()
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        profession: user.profession,
        email: user.email,
        phone: user.phone,
        accessLevel: user.accessLevel,
        location: user.location,
        name:user.name,
    }
};

const normalizeUsers = (users)=>{
    return users.map(user=> normalizeUser(user))
};

module.exports={
    normalizeUser,
    normalizeUsers
}