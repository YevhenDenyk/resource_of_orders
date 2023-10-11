import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useState} from "react";

import {emailValidator} from "../../../validators";
import {authService} from "../../../services";
import {
    Alert, Box, Button,
    Container,
    FormControlLabel,
    Paper, Switch, TextField,
    Typography
} from "@mui/material";


const ForgotPassword = () => {
    const [successfulResponse, setSuccessfulResponse] = useState(null)
    const [error, setError] = useState(null)

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isValid}
    } = useForm({resolver: joiResolver(emailValidator), mode: "onBlur"});


    const submit = async (email) => {
        try {
            await authService.forgotPassword(email);

            setSuccessfulResponse(true)
            setError(null)
        } catch (e) {
            setSuccessfulResponse(false)
            setError(e.response.data)
            console.log(e.response.data)
        }
        reset()
    }


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
                    Відновлення паролю
                </Typography>


                {successfulResponse &&
                    <Alert variant="outlined" severity="success">
                        На вашу пошту надіслано лист з інструкціями для скидання паролю.
                    </Alert>
                }

                {!successfulResponse &&
                    <form onSubmit={handleSubmit(submit)}>

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

                        <FormControlLabel
                            control={<Switch {...register('contractor')} />}
                            label={'Я підрядник'}
                            sx={{m: 1}}
                        />


                        <Box sx={{
                            mt: 2,
                            mb: 2,
                            display: "flex",
                            justifyContent: "end",
                        }}>
                            <Button type="submit" disabled={!isValid} variant={"contained"}>Відновити пароль</Button>
                        </Box>
                    </form>
                }
            </Paper>
        </Container>
    );
};

export {ForgotPassword};