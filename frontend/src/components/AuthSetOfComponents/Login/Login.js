import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {authService} from "../../../services";
import {loginValidator} from "../../../validators";

const Login = () => {

    const {state} = useLocation(); // щоб витягнути стейт в якому є шлях на який ми переходили

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
            authService.setToken(data)

            if (state) {
                navigate(state.pathname, {replace: true})
            }
            if (!state) {
                navigate('/orders', {replace: true})
            }

            setError(null)
        } catch (e) {
            setError(e.response.data)
        }
        reset()
    }
    const [query,] = useSearchParams();

    return (
        <div>
            <h1>login</h1>

            {query.has('expSession') && <h1>Сесія закінчилася, увійдіть знову</h1>}
            {query.has('endSession') && <h1>Всі активні сесії завершено, увійдіть знову</h1>}
            {query.has('updatePassword') && <h1>Ваш пароль успішно змінено</h1>}

            <form onSubmit={handleSubmit(submit)}>

                {error && <h2>{error.message}</h2>}

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


// {
//     "essenceId": "64919f159cc69362e170453a",
//     "essenceEmail": "denyk.yevhen@gmail.com",
//     "essenceName": "Yevhen Denyk",
//     "accessLevel": 100,
//     "location": "64f8b640ffea82561f59d289",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..8CrqFuXoCenBlvKotSMo_yQD3q7qmzdcGeLCOaKom1k",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..9aw0H6MwI7m6c5VJzWYVNUuS7Pcl3I1w_T7TyCtA99U"
// }