const updateLocationHelper = (upLocationInfo) => {
    if (!upLocationInfo.status) {
        delete upLocationInfo.status
    }
    if (!upLocationInfo.description) {
        delete upLocationInfo.description
    }
    if (!upLocationInfo.phone) {
        delete upLocationInfo.phone
    }


    return upLocationInfo
}

export {updateLocationHelper}