const updateOrderHelper = (upOrder) => {
    if (!upOrder.description) {
        delete upOrder.description
    }
    if (!upOrder.executionTime) {
        delete upOrder.executionTime
    }
    if (!upOrder.orderStatus) {
        delete upOrder.orderStatus
    }

    return upOrder
}

export {updateOrderHelper}