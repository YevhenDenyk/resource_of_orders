import {Link, Outlet, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {locationAction} from "../../../redux";
import {locationService} from "../../../services";
import {User} from "../../UsersSetOfComponents";
import {updateLocationHelper} from "../../../helpers";

const LocationDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query,] = useSearchParams();

    const [error, setError] = useState(null);
    const [hideButton, setHideButton] = useState(false);
    const [usersAvailable, setUsersAvailable] = useState(false)

    const {location} = useSelector(state => state.locationReducer);

    useEffect(() => {
        dispatch(locationAction.getById(id))
    }, [id])

    useEffect(() => {
        setUsersAvailable(location.users?.length > 0)
    }, [location]);

    // додати валідатор???
    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = async (upLocationInfo) => {
        try {
            setHideButton(true)
            const upLocationHelper = updateLocationHelper(upLocationInfo);
            if (Object.keys(upLocationHelper).length > 0) {
                const upLocation = await locationService.update(location._id, upLocationHelper);
                dispatch(locationAction.putUpdateLocation(upLocation))
            }
            setError(null)
        } catch (e) {
            setHideButton(false)
            setError(e.response.data)
        }
    }

    return (
        <div>
            {query.has('locationCreated') && <h1>Профіль локації успішно створено</h1>}
            {error && <h2>{error.message}</h2>}
            {hideButton && <h2>Зміни збережено</h2>}

            <h2>{location.region} м. {location.city}, {location.address}</h2>

            <form onSubmit={handleSubmit(submit)}>
                <div>
                    Статус:
                    <select {...register('status')}>
                        <option value="" disabled selected hidden>{location.status}</option>
                        <option value='Проект'>Проект</option>
                        <option value='Відкритий'>Відкритий</option>
                        <option value='Реконструкція'>Реконструкція</option>
                        <option value='Закритий'>Закритий</option>
                    </select>
                </div>
                <div>
                    Телефон:
                    <input type="text"
                           defaultValue={location.phone}
                           {...register('phone', {})}
                    />
                </div>
                <div>
                    Опис:
                    <input type="text"
                           defaultValue={location.description}
                           {...register('description', {})}
                    />
                </div>
                {!hideButton && <button>Зберегти зміни</button>}
            </form>

            <h2>Працівники:</h2>
            {usersAvailable &&
                <table>
                    <thead>
                    <tr>
                        <th>ПІБ</th>
                        <th>Посада</th>
                        <th>Телефон</th>
                        <th>Пошта</th>
                    </tr>
                    </thead>
                    <tbody>
                    {location.users.map(user => <User key={user._id} user={user}/>)}
                    </tbody>
                </table>
            }
            {!usersAvailable && <h2>Об'єкт не має зареєстрованих працівників</h2>}

            <Link to={`/locations/${id}/jobType`}>
                <div>
                    <h2>Відповідальні компанії за типами робіт:</h2>
                </div>
            </Link>
            <Outlet/>

        </div>
    );
};

export {LocationDetail};


// {
//     "_id": "64918c93c3a37bd27f525444",
//     "region": "Північ",
//     "city": "Суми",
//     "address": "вул. Зелена 13",
//     "phone": "+380937170795",
//     "status": "Відкритий",
//     "description": "офіс",
//     "createdAt": "2023-06-20T11:25:07.781Z",
//     "updatedAt": "2023-06-20T11:25:07.781Z",
//     "__v": 0,
//     "users": [
//     {
//         "_id": "64919f159cc69362e170453a",
//         "firstName": "Yevhen",
//         "lastName": "Denyk",
//         "profession": "admin",
//         "email": "denyk.yevhen@gmail.com",
//         "phone": "+380937170795",
//         "accessLevel": 100,
//         "location": "64918c93c3a37bd27f525444"
//     },

// }