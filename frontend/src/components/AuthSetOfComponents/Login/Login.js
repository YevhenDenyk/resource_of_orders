import {useForm} from "react-hook-form";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {
    Alert, Box,
    Button, Container,
    FormControl,
    FormControlLabel, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Paper,
    Switch, TextField, Typography
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {authService} from "../../../services";
import {loginValidator} from "../../../validators";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)

    const {state} = useLocation(); // щоб витягнути стейт в якому є шлях на який ми переходили

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isValid}
    } = useForm({resolver: joiResolver(loginValidator), mode: "onBlur"});

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


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
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
                    Вхід
                </Typography>

                <form onSubmit={handleSubmit(submit)}>

                    {
                        query.has('expSession') &&
                        <Alert variant="outlined" severity="info">
                            Сесія закінчилася, увійдіть знову
                        </Alert>
                    }
                    {
                        query.has('endSession') &&
                        <Alert variant="outlined" severity="info">
                            Всі активні сесії завершено
                        </Alert>
                    }
                    {
                        query.has('updatePassword') &&
                        <Alert variant="outlined" severity="success">
                            Ваш пароль успішно змінено
                        </Alert>
                    }
                    {error &&
                        <Alert variant="outlined" severity="error">
                            {error.message}
                        </Alert>}

                    <TextField
                        {...register('email')}
                        label="Пошта"
                        error={errors.email}
                        helperText={errors.email ? 'Будь ласка, введіть коректну адресу пошти.' : ''}
                        variant="outlined"
                        margin={"normal"}
                        fullWidth={true}
                    />

                    <FormControl
                        error={errors.password}
                        variant="outlined"
                        margin={'normal'}
                        fullWidth={true}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
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
                            label="Пароль"
                        />
                        <FormHelperText error={errors.password}>
                            {errors.password ? 'Перевірте пароль' : ''}
                        </FormHelperText>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch {...register('contractor')} />}
                        label={'Я підрядник'}
                        sx={{m: 1}}
                    />


                    <Box sx={{
                        mt: 2,
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Button href={'/forgot/password'} size={'small'}>Відновити пароль</Button>
                        <Button type="submit" disabled={!isValid} variant={"contained"}>Увійти</Button>
                    </Box>
                </form>
            </Paper>
        </Container>

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