import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {useState} from "react";
import {passwordValidator} from "../../../validators";
import {authService} from "../../../services";

const UpdateForgotPassword = () => {
    const [params,] = useSearchParams();
    const actionToken =params.get('actionToken')

    const navigate = useNavigate();

    const [error, setError] = useState(null)

    const {
        handleSubmit,
        reset,
        register,
        formState: {isValid, errors}
    } = useForm({resolver: joiResolver(passwordValidator), mode: "all"});


    const submit = async (obj) => {
        try {
            const data = await authService.updatePasswordAfterForgot( obj.password, actionToken);
            console.log(data)

            navigate('/login?updatePassword=true')
        } catch (e) {
            // setError(e.response.data)
            console.log(e)
        }
        reset()
    }


    return (
        <div>
            <h2>Set new password</h2>

            <form onSubmit={handleSubmit(submit)}>
                {error && <h3>{error}</h3>}
                <input type="text" placeholder={"new password"} {...register('password')} />
                {errors.password && <span>{errors.password.message}</span>}
                <input type="text" placeholder={"confirm password"} {...register('confirmPassword')}/>
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                <button disabled={!isValid}>Save new password</button>
            </form>


        </div>
    );
}

export {UpdateForgotPassword};