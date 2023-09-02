const formFilterUserHelper = (formFilter) => {
    const {page, limit, firstName, lastName, email, phone} = formFilter
    if (!page || page <= 0) {
        delete formFilter.page
    }
    if (!limit || limit <= 0) {
        delete formFilter.limit
    }
    if (!firstName) {
        delete formFilter.firstName
    }
    if (!lastName) {
        delete formFilter.lastName
    }

    if (!email) {
        delete formFilter.email
    }
    if (!phone) {
        delete formFilter.phone
    }
    return formFilter
}

export {formFilterUserHelper}