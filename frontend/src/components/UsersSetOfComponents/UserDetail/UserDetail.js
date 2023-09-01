import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";

import {userAction} from "../../../redux";
import {updateUserHelper} from "../../../helpers";
import {userService} from "../../../services";

const UserDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const {user,} = useSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(userAction.getById(id))
    }, [id])

    const {handleSubmit, register} = useForm();
    const submit = async (upUserInfo) => {
        try {
            const upUserHelper = updateUserHelper(upUserInfo);

            if (Object.keys(upUserHelper).length > 0) {
                const upUser = await userService.update(user._id, upUserHelper);
                dispatch(userAction.putUpdateUser(upUser))
            }
        } catch (e) {
////додати обробку помилок
        }

    }


    return (
        <div>
            {user &&
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
                    Адреса місця роботи: {user.location?.fullAddress} <br/>
                    Опис місця: {user.location?.description} <br/>
                    <button>Зберегти зміни</button>
                </form>
            }
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