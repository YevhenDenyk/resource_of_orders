import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {createContractorValidator} from "../../../validators";
import {contractorService} from "../../../services";

const ContractorCreate = () => {

    const navigate = useNavigate();
    const [hideButton, setHideButton] = useState(false);
    const [error, setError] = useState(null);

    const {
        handleSubmit,
        register,
        reset,
        formState: {isValid, errors}
    } = useForm({resolver: joiResolver(createContractorValidator), mode: 'all'});


    const submit = async (newContractor) => {
        try {
            setHideButton(true)
            const {data} = await contractorService.create(newContractor);
            reset()
            setError(null)
            navigate(`/contractors/${data._id}?contractorCreated=true`)
        } catch (e) {
            setError(e.response.data)
            setHideButton(false)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <select {...register('region')}>
                        <option value="" disabled selected hidden>Регіон</option>
                        <option value='Північ'>Північ</option>
                        <option value='Схід'>Схід</option>
                        <option value='Центр'>Центр</option>
                        <option value='Південь'>Південь</option>
                        <option value='Захід'>Захід</option>
                    </select>
                    <label>Основний регіон роботи</label>
                </div>
                <div>
                    <input type="text" placeholder={'Назва компанії'} {...register('name')}/><label>Назва
                    компанії</label>
                    {errors.name && <span>{errors.name.message}</span>}
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
                    <input type="text" placeholder={'Представник компані'} {...register('representative')}/><label>Представник
                    компані</label>
                    {errors.representative && <span>{errors.representative.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder={'Посада'} {...register('jobPosition')}/><label>Посада</label>
                    {errors.jobPosition && <span>{errors.jobPosition.message}</span>}
                </div>

                {!hideButton && <button disabled={!isValid}>Створити Підрядника</button>}
            </form>
            {error && <h1>{error.message}</h1>}
        </div>
    );
};


export {ContractorCreate};