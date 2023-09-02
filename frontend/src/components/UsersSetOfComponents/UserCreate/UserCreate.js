import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createUserValidator} from "../../../validators";
import {locationService, userService} from "../../../services";

const UserCreate = () => {

    const navigate = useNavigate();
    const [hideButton, setHideButton] = useState(false);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        locationService.getAbsolutelyAll().then(({data}) => setLocations(data.locations))
    }, [])

    const {
        handleSubmit,
        register,
        reset,
        formState: {isValid, errors}
    } = useForm({resolver: joiResolver(createUserValidator), mode: 'all'});


    const submit = async (newUser) => {
        try {
            setHideButton(true)
            const {data} = await userService.create(newUser);
            reset()

            navigate(`/users/${data._id}?userCreated=true`)
            setError(null)
        }catch (e) {
            setError(e.response.data)
            setHideButton(false)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>

                <div>
                    <input type="text" placeholder={'Ім\'я'} {...register('firstName')}/><label>Ім'я</label>
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Прізвище'} {...register('lastName')}/><label>Прізвище</label>
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Посада'} {...register('profession')}/><label>Посада</label>
                    {errors.profession && <span>{errors.profession.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Пошта'} {...register('email')}/><label>Пошта</label>
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Пароль'} {...register('password')}/><label>Пароль</label>
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Телефон'} {...register('phone')}/><label>Телефон</label>
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                <div>
                    <select {...register('accessLevel')}>
                        <option value="" disabled selected hidden>Права доступу</option>
                        <option value='40'>Базовий</option>
                        <option value='60'>Інженер</option>
                        <option value='80'>Провідний інженер</option>
                        <option value='100'>Абсолютний</option>
                    </select>
                    <label>Права доступу</label>
                </div>
                <div>
                    <select {...register('location')}>
                        <option value="" disabled selected hidden>Об'єкт</option>
                        {locations.map(location =>
                            <option value={location._id} key={location._id}> {location?.fullAddress} </option>)}
                    </select>
                    <label>Об'єкт</label>
                </div>

                {!hideButton && <button disabled={!isValid}>Створити користувача</button>}
            </form>
            {error&&<h2>{error.message}</h2>}
        </div>
    );
};

export {UserCreate};