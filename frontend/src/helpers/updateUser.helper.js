const updateUserHelper = (upUserInfo) => {
    if (!upUserInfo.firstName) {
        delete upUserInfo.firstName
    }
    if (!upUserInfo.lastName) {
        delete upUserInfo.lastName
    }
    if (!upUserInfo.profession) {
        delete upUserInfo.profession
    }
    if (!upUserInfo.phone) {
        delete upUserInfo.phone
    }
    if (!upUserInfo.email) {
        delete upUserInfo.email
    }


    return upUserInfo
}

export {updateUserHelper}