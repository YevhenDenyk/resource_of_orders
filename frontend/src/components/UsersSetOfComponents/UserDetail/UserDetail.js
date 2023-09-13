import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {userAction} from "../../../redux";
import {updateUserHelper} from "../../../helpers";
import {locationService, userService} from "../../../services";

const UserDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [query,] = useSearchParams();
    const dispatch = useDispatch();
    const {user,} = useSelector(state => state.userReducer);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [hideButton, setHideButton] = useState(false);

    useEffect(() => {
        dispatch(userAction.getById(id))
    }, [id])

    useEffect(() => {
        locationService.getAll({limit: 1000}).then(({data}) => setLocations(data.locations))
    }, [])

// валідатор ???
    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();
    const submit = async (upUserInfo) => {
        try {
            setHideButton(true)
            const upUserHelper = updateUserHelper(upUserInfo);

            if (Object.keys(upUserHelper).length > 0) {
                const upUser = await userService.update(user._id, upUserHelper);
                dispatch(userAction.putUpdateUser(upUser))
            }
            setError(null)
        } catch (e) {
            setHideButton(false)
            setError(e.response.data)
        }
    }

    const deleteUser = async () => {
        await userService.delete(user._id)
        navigate('/users?userDelete=true')
    }

    return (
        <div>
            {query.has('userCreated') && <h1>Профіль працівника успішно створений</h1>}
            {error && <h2>{error.message}</h2>}
            {hideButton && <h2>Зміни збережено</h2>}
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    Ім'я:
                    <input
                        type={"text"}
                        defaultValue={user.firstName}
                        {...register('firstName', {required: false, minLength: 3, maxLength: 30})}
                    />
                </div>
                <div>
                    Прізвище:
                    <input
                        type={"text"}
                        defaultValue={user.lastName}
                        {...register('lastName', {required: false, minLength: 3, maxLength: 30})}
                    />
                </div>
                <div>
                    Посада:
                    <input
                        type={"text"}
                        defaultValue={user.profession}
                        {...register('profession', {required: false, minLength: 3, maxLength: 30})}
                    />
                </div>
                <div>
                    Телефон:
                    <input
                        type={"text"}
                        defaultValue={user.phone}
                        {...register('phone', {required: false, minLength: 3, maxLength: 30})}
                    />
                </div>
                <div>
                    Пошта:
                    <input
                        type={"text"}
                        defaultValue={user.email}
                        {...register('email', {required: false, minLength: 3, maxLength: 30})}
                    />
                </div>
                <div>
                    Адреса місця роботи:
                    <select {...register('location')}>
                        <option value="" disabled selected hidden>{user.location?.fullAddress}</option>
                        {locations.map(location =>
                            <option value={location._id} key={location._id}> {location?.fullAddress} </option>)}
                    </select>
                </div>
                Опис місця: {user.location?.description} <br/>
                {!hideButton && <button>Зберегти зміни</button>}
            </form>

            <button onClick={deleteUser}>Видалити користувача</button>
        </div>
    );
};

export {UserDetail};

// {
//     "_id": "64919f159cc69362e170453a",
//     "firstName": "Yevhen",
//     "lastName": "Denyk",
//     "profession": "admin",
//     "email": "denyk.yevhen@gmail.com",
//     "phone": "+380937170795",
//     "accessLevel": 100,
//     "location": {
//     "_id": "64918c93c3a37bd27f525444",
//         "region": "Північ",
//         "city": "Суми",
//         "address": "вул. Зелена 13",
//         "phone": "+380937170795",
//         "status": "Відкритий",
//         "description": "офіс",
//         "createdAt": "2023-06-20T11:25:07.781Z",
//         "updatedAt": "2023-06-20T11:25:07.781Z",
//         "__v": 0,
//         "fullAddress": "Регіон Північ, м.Суми, вул. Зелена 13",
//         "id": "64918c93c3a37bd27f525444"
// },
//     "name": "Yevhen Denyk"
// }