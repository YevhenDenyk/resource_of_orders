import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layout/MainLayout";
import {
    ContractorDetailPage, ContractorsPage, ContractorCreatePage,
    ForgotPage, LoginPage, UpdateForgotPasswordPage,
    OrderDetailPage, OrdersPage, OrderCreatePage,
    UsersPage, UserCreatePage, UserDetailPage,
    LocationsPage, LocationDetailPage, LocationCreatePage
} from "./pages";

import {JobType} from "./components/JobTypeSetOfComponents";

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
                <Route path={'order/create'} element={<OrderCreatePage/>}/>

                <Route path={'users'} element={<UsersPage/>}/>
                <Route path={'users/:id'} element={<UserDetailPage/>}/>
                <Route path={'user/create'} element={<UserCreatePage/>}/>

                <Route path={'contractors'} element={<ContractorsPage/>}/>
                <Route path={'contractors/:id'} element={<ContractorDetailPage/>}/>
                <Route path={'contractor/create'} element={<ContractorCreatePage/>}/>

                <Route path={'locations'} element={<LocationsPage/>}/>
                <Route path={'locations/:id'} element={<LocationDetailPage/>}>
                    <Route path={'jobType'} element={<JobType/>}/>
                </Route>
                <Route path={'location/create'} element={<LocationCreatePage/>}/>
            </Route>
        </Routes>
    );
};

export {App};