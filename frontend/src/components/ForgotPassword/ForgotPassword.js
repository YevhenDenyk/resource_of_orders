import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useState} from "react";

import {emailValidator} from "../../validators";
import {authService} from "../../services";

const ForgotPassword = () => {
    const [successfulResponse, setSuccessfulResponse] = useState(null)

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isValid}
    } = useForm({resolver: joiResolver(emailValidator), mode: "all"});


    const submit = async (email) => {
        try {
            await authService.forgotPassword(email);

            setSuccessfulResponse(true)
        } catch (e) {
            //додати обробку помилки
        }
        reset()
    }


    return (
        <div>
            {/*подумати як одне зховати а інше показати            */}
            {!successfulResponse &&
                <div>
                    <h1>Forgot password</h1>

                    <form onSubmit={handleSubmit(submit)}>
                        <input type="text" placeholder={'email'} {...register('email')}/>
                        <input type='checkbox'  {...register('contractor')} />
                        <button disabled={!isValid}>Forgot password</button>
                    </form>
                </div>
            }
            {successfulResponse &&
                <div>
                    <h3>На вашу пошту надіслано лист з інструкціями для скидання паролю</h3>
                </div>
            }
        </div>
    );
};

export {ForgotPassword};