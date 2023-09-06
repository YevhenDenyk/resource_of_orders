import {Link} from "react-router-dom";

const User = ({user}) => {
    const {profession, email, phone, _id, firstName, lastName} = user

    // const setContractorToState = () => {
    //     dispatch(contractorAction.setContractor(contractor))
    // }

    return (
        <tr>
            <td>
                <Link to={`/users/${_id}`}
                    // onClick={setContractorToState}
                >
                    {firstName} {lastName}
                </Link>
            </td>
            <td>{profession}</td>
            <td>{phone}</td>
            <td>{email}</td>
        </tr>
    );
};

export {User};