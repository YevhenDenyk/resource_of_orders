import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layout/MainLayout";
import {ForgotPage, LoginPage, UpdateForgotPasswordPage} from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'login'}/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'forgot/password'} element={<ForgotPage/>}/>
                <Route path={'password/new'} element={<UpdateForgotPasswordPage/>}/>
            </Route>
        </Routes>
    );
};

export {App};