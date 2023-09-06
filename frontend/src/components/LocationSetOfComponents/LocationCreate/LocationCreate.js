import {useNavigate} from "react-router-dom";
import { useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {locationService, userService} from "../../../services";
import {createLocationValidator} from "../../../validators";

const LocationCreate = () => {
    const navigate = useNavigate();
    const [hideButton, setHideButton] = useState(false);
    const [error, setError] = useState(null);

    const {
        handleSubmit,
        register,
        reset,
        formState: {isValid, errors}
    } = useForm({resolver: joiResolver(createLocationValidator), mode: 'all'});


    const submit = async (newLocation) => {
        try {
            setHideButton(true)
            const {data} = await locationService.create(newLocation);
            reset()

            navigate(`/locations/${data._id}?locationCreated=true`)
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
                    <select {...register('status')}>
                        <option value="" disabled selected hidden>Виберіть Статус</option>
                        <option value='Проект'>Проект</option>
                        <option value='Відкритий'>Відкритий</option>
                        <option value='Реконструкція'>Реконструкція</option>
                        <option value='Закритий'>Закритий</option>
                    </select>
                    <label>Статус</label>
                    {errors.status && <span>{errors.status.message}</span>}
                </div>
                <div>
                    <select {...register('region')}>
                        <option value="" disabled selected hidden>Виберіть Регіон</option>
                        <option value='Північ'>Північ</option>
                        <option value='Схід'>Схід</option>
                        <option value='Центр'>Центр</option>
                        <option value='Південь'>Південь</option>
                        <option value='Захід'>Захід</option>
                    </select>
                    <label>Регіон</label>
                    {errors.region && <span>{errors.region.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Місто'} {...register('city')}/><label>Місто</label>
                    {errors.city && <span>{errors.city.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Адреса'} {...register('address')}/><label>Адреса</label>
                    {errors.address && <span>{errors.address.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Телефон'} {...register('phone')}/><label>Телефон</label>
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Опис'} {...register('description')}/><label>Опис</label>
                    {errors.description && <span>{errors.description.message}</span>}
                </div>

                {!hideButton && <button disabled={!isValid}>Створити локацію</button>}
            </form>
            {error&&<h2>{error.message}</h2>}
        </div>
    );
};

export {LocationCreate};