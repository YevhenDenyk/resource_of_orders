const formFilterLocationHelper = (formFilter) => {
    const {page, limit, city, address, region, phone, status} = formFilter
    if (!page || page <= 0) {
        delete formFilter.page
    }
    if (!limit || limit <= 0) {
        delete formFilter.limit
    }
    if (!region) {
        delete formFilter.region
    }
    if (!city) {
        delete formFilter.city
    }
    if (!address) {
        delete formFilter.address
    }
    if (!phone) {
        delete formFilter.phone
    }
    if (!status) {
        delete formFilter.status
    }
    return formFilter
}

export {formFilterLocationHelper}