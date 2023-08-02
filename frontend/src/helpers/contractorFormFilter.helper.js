const contractorFormFilterHelper = (formFilter) => {
    const {page, limit, name, email, phone} = formFilter
    if (!page || page <= 0) {
        delete formFilter.page
    }
    if (!limit || limit <= 0) {
        delete formFilter.limit
    }
    if (!name) {
        delete formFilter.name
    }

    if (!email) {
        delete formFilter.email
    }
    if (!phone) {
        delete formFilter.phone
    }
    return formFilter
}

export {contractorFormFilterHelper}