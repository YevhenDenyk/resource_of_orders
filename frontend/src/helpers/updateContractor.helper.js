const updateContractorHelper = (upContractorInfo) => {
    if (!upContractorInfo.region) {
        delete upContractorInfo.region
    }
    if (!upContractorInfo.email) {
        delete upContractorInfo.email
    }
    if (!upContractorInfo.phone) {
        delete upContractorInfo.phone
    }
    if (!upContractorInfo.representative) {
        delete upContractorInfo.representative
    }
    if (!upContractorInfo.jobPosition) {
        delete upContractorInfo.jobPosition
    }

    return upContractorInfo
}

export {updateContractorHelper}