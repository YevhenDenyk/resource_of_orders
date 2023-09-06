import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {locationAction} from "../../../redux";

const Location = ({location}) => {

    const {_id, region, city, address, status} = location
    const dispatch = useDispatch();

    const setLocationToState = () => {
        dispatch(locationAction.setLocation(location))
    }

    return (

        <tr>
            <td>
                <Link to={`/locations/${_id}`} onClick={setLocationToState}>
                    {status}
                </Link>
            </td>
            <td>
                <Link to={`/locations/${_id}`} onClick={setLocationToState}>
                    {region}
                </Link>
            </td>
            <td>
                <Link to={`/locations/${_id}`} onClick={setLocationToState}>
                    {city}
                </Link>
            </td>
            <td>
                <Link to={`/locations/${_id}`} onClick={setLocationToState}>
                    {address}
                </Link>
            </td>
        </tr>

    );
};

export {Location};