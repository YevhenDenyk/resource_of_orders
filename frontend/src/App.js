import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layout/MainLayout";
import {
    ContractorsPage,
    CreateOrderPage,
    ForgotPage,
    LoginPage,
    OrderDetailPage,
    OrdersPage,
    UpdateForgotPasswordPage,
    UsersPage
} from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'login'}/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'forgot/password'} element={<ForgotPage/>}/>
                <Route path={'password/new'} element={<UpdateForgotPasswordPage/>}/>
                <Route path={'orders'} element={<OrdersPage/>}/>
                <Route path={'orders/:id'} element={<OrderDetailPage/>}/>
                <Route path={'order/create'} element={<CreateOrderPage/>}/>
                <Route path={'users'} element={<UsersPage/>}/>
                <Route path={'contractors'} element={<ContractorsPage/>}/>

            </Route>
        </Routes>
    );
};

export {App};