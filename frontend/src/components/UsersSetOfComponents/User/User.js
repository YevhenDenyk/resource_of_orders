import {Link} from "react-router-dom";

const User = ({user}) => {
    const {profession, email, phone, name, _id} = user

    // const setContractorToState = () => {
    //     dispatch(contractorAction.setContractor(contractor))
    // }

    return (
        <tr>
            <td>
                <Link to={`/users/${_id}`}
                    // onClick={setContractorToState}
                >
                    {name}
                </Link>
            </td>
            <td>{profession}</td>
            <td>{phone}</td>
            <td>{email}</td>
        </tr>
    );
};

export {User};
//     profession: user.profession,
//     email: user.email,
//     phone: user.phone,
//     accessLevel: user.accessLevel,
//     location: user.location,
//     name:user.name,