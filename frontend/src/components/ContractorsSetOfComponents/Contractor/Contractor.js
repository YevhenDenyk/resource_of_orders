import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {contractorAction} from "../../../redux";

const Contractor = ({contractor}) => {
    const {name, region, representative, jobPosition, email, phone, _id} = contractor
    const dispatch = useDispatch();

    const setContractorToState = () => {
        dispatch(contractorAction.setContractor(contractor))
    }

    return (

        <tr>
            <td>
                <Link to={`/contractors/${_id}`} onClick={setContractorToState}>
                    {name}
                </Link>
            </td>
            <td>{region}</td>
            <td>{representative}</td>
            <td>{jobPosition}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>

    );
};

export {Contractor};

// "_id": "649af63790b7459f91f34e32",
//     "region": "Північ",
//     "name": "Fero Start",
//     "email": "denyk.yevhen@gmail.com",
//     "password": "$2b$10$tUrOLDUjXWfUZ9ZKflcU7ewfAy7OFamFP6WRbBZ2Ksf3E8Op.YQD2",
//     "phone": "+380937170795",
//     "representative": "Олег ",
//     "jobPosition": "Директор",
//     "accessLevel": 20,
//     "createdAt": "2023-06-27T14:46:15.787Z",
//     "updatedAt": "2023-06-29T14:50:31.295Z",
