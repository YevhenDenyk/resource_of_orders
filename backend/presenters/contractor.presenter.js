
const normalizeContractor = (contractor)=>{
    contractor = contractor.toJSON()
    return {
        _id: contractor._id,
        region: contractor.region,
        name: contractor.name,
        email: contractor.email,
        phone: contractor.phone,
        representative: contractor.representative,
        jobPosition: contractor.jobPosition,
    }
};

const normalizeContractors = (contractors)=>{
    return contractors.map(contractor=> normalizeContractor(contractor))
};

module.exports={
    normalizeContractor,
    normalizeContractors
}