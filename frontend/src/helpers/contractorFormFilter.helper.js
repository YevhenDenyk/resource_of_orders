const contractorFormFilterHelper = (formFilter) => {
    const {page, limit, name, email, phone} = formFilter
    if (!page || page <= 0) {
        formFilter = {...formFilter, page: null}
    }
    if (!limit || limit <= 0) {
        formFilter = {...formFilter, limit: null}
    }
    if (!name) {
        formFilter = {...formFilter, name: null}
    }

    if (!email) {
        formFilter = {...formFilter, email: null}
    }
    if (!phone) {
        formFilter = {...formFilter, phone: null}
    }
    return formFilter
}

export {contractorFormFilterHelper}