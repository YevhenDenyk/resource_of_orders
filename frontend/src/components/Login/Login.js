import {useForm} from "react-hook-form";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {authService} from "../../services";
import {loginValidator} from "../../validators";

const Login = () => {

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isValid}
    } = useForm({resolver: joiResolver(loginValidator), mode: "all"});

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const submit = async (essence) => {
        try {
            const {data} = await authService.login(essence);
            console.log(data)
            authService.setToken(data)
            navigate('/orders')
        } catch (e) {

////розібратися з помилкою при невірних даних видає якусь діч замість помилки яку я відправляю
            setError(e.response)
            console.log(e)
        }
        reset()
    }
    const [query,] = useSearchParams();

    return (
        <div>
            <h1>login</h1>

            {query.has('expSession') && <h1>Сесія закінчилася, увійдіть знову</h1>}
            {query.has('updatePassword') && <h1>Ваш пароль успішно змінено</h1>}

            <form onSubmit={handleSubmit(submit)}>
                {error && <h3>{error}</h3>}
                <input type="text" placeholder={'email'} {...register('email')}/>
                {errors.email && <span>{errors.email.message}</span>}
                <input type="text" placeholder={'password'} {...register('password')}/>
                {errors.password && <span>{errors.password.message}</span>}
                <input type='checkbox'  {...register('contractor')} />
                <label>Я підрядник</label>
                <button disabled={!isValid}>Login</button>
            </form>

            <div>
                <Link to={'/forgot/password'}>Forgot password</Link>
            </div>
        </div>
    );
};

export {Login};