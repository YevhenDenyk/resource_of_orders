import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {useState} from "react";
import {passwordValidator} from "../../../validators";
import {authService} from "../../../services";

import {
    Alert, Box, Button,
    Container,
    FormControl, FormHelperText, IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Typography
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const UpdateForgotPassword = () => {
    const [params,] = useSearchParams();
    const actionToken = params.get('actionToken')

    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        handleSubmit,
        reset,
        register,
        formState: {isValid, errors}
    } = useForm({resolver: joiResolver(passwordValidator), mode: "onBlur"});


    const submit = async (obj) => {
        try {
            const {data} = await authService.updatePasswordAfterForgot(obj.password, actionToken);
            console.log(data)

            setError(null)
            navigate('/login?updatePassword=true')
        } catch (e) {
            setError(e.response.data)
        }
        reset()
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Container maxWidth="xs">


            <Paper elevation={4} sx={{
                mt: 8,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <Typography
                    component="h1" variant={"h3"}
                    sx={{my: 3}}
                >
                    Введіть новий пароль
                </Typography>

                <form onSubmit={handleSubmit(submit)}>

                    {error &&
                        <Alert variant="outlined" severity="error">
                            {error.message}
                        </Alert>}

                    <FormControl
                        error={errors.password}
                        variant="outlined"
                        margin={'normal'}
                        fullWidth={true}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Новий пароль</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Новий пароль"
                        />
                        <FormHelperText error={errors.password}>
                            {errors.password ? 'Пароль повинен складатися з малих та великих англійських літер, мітити цифри та хоч один із спецсимволів @$!%*?&_'
                                : 'Пароль повинен складатися з малих та великих англійських літер, мітити цифри та хоч один із спецсимволів @$!%*?&_'}
                        </FormHelperText>
                    </FormControl>


                    <FormControl
                        error={errors.confirmPassword}
                        variant="outlined"
                        margin={'normal'}
                        fullWidth={true}
                    >
                        <InputLabel htmlFor="outlined-adornment-Confirm-password">Підтвердіть пароль</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-Confirm-password"
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Підтвердіть пароль"
                        />
                        <FormHelperText error={errors.confirmPassword}>
                            {errors.confirmPassword ? 'Паролі повинні бути однакові' : ''}
                        </FormHelperText>
                    </FormControl>

                    <Box sx={{
                        mt: 2,
                        mb: 2,
                        display: "flex",
                        justifyContent: "end",
                    }}>
                        <Button type="submit" disabled={!isValid} variant={"contained"}>Змінити пароль</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export {UpdateForgotPassword};