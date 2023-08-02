const orderFormFilterHelper = (formFilter) => {
    const {page, limit, jobType, orderStatus, overdue, priority, contractor, location} = formFilter
    if (!page || page <= 0) {
        delete formFilter.page
    }
    if (!limit || limit <= 0) {
        delete formFilter.limit
    }
    if (!overdue) {
        delete formFilter.overdue
    }

    if (!jobType) {
        delete formFilter.jobType
    }
    if (!orderStatus) {
        delete formFilter.orderStatus
    }
    if (!priority) {
        delete formFilter.priority
    }
    if (!contractor) {
        delete formFilter.contractor
    }
    if (!location) {
        delete formFilter.location
    }
    return formFilter
}

export {orderFormFilterHelper}