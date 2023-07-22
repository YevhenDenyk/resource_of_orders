const orderFormFilterHelper = (formFilter) => {
    const {page, limit, jobType, orderStatus, overdue, priority, contractor, location} = formFilter
    if (!page || page <= 0) {
        formFilter = {...formFilter, page: null}
    }
    if (!limit || limit <= 0) {
        formFilter = {...formFilter, limit: null}
    }
    if (!overdue) {
        formFilter = {...formFilter, overdue: null}
    }

    if (!jobType) {
        formFilter = {...formFilter, jobType: null}
    }
    if (!orderStatus) {
        formFilter = {...formFilter, orderStatus: null}
    }
    if (!priority) {
        formFilter = {...formFilter, priority: null}
    }
    if (!contractor) {
        formFilter = {...formFilter, contractor: null}
    }
    if (!location) {
        formFilter = {...formFilter, location: null}
    }
    return formFilter
}

export {orderFormFilterHelper}