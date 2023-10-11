import {Navigate, Route, Routes} from "react-router-dom";
import {ScopedCssBaseline} from "@mui/material";

import {MainLayout} from "./layout/MainLayout";
import {
    ContractorDetailPage, ContractorsPage, ContractorCreatePage,
    ForgotPage, LoginPage, UpdateForgotPasswordPage,
    OrderDetailPage, OrdersPage, OrderCreatePage,
    UsersPage, UserCreatePage, UserDetailPage,
    LocationsPage, LocationDetailPage, LocationCreatePage, AccessLevelIsInsufficientPage, UnknownPage
} from "./pages";
import {JobType} from "./components/JobTypeSetOfComponents";
import {RequireAuth} from "./hoc";

const App = () => {
    return (
        <ScopedCssBaseline>
            <Routes>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'forgot/password'} element={<ForgotPage/>}/>
                <Route path={'password/new'} element={<UpdateForgotPasswordPage/>}/>

                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'login'}/>}/>
                    <Route path={'accessLevelIsInsufficient'} element={<AccessLevelIsInsufficientPage/>}/>

                    <Route path={'orders'} element={
                        <RequireAuth minAccessLevel={10}>
                            <OrdersPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'orders/:id'} element={
                        <RequireAuth minAccessLevel={10}>
                            <OrderDetailPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'order/create'} element={
                        <RequireAuth minAccessLevel={21}>
                            <OrderCreatePage/>
                        </RequireAuth>
                    }/>

                    <Route path={'users'} element={
                        <RequireAuth minAccessLevel={21}>
                            <UsersPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'users/:id'} element={
                        <RequireAuth minAccessLevel={21}>
                            <UserDetailPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'user/create'} element={
                        <RequireAuth minAccessLevel={61}>
                            <UserCreatePage/>
                        </RequireAuth>
                    }/>

                    <Route path={'contractors'} element={
                        <RequireAuth minAccessLevel={41}>
                            <ContractorsPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'contractors/:id'} element={
                        <RequireAuth minAccessLevel={41}>
                            <ContractorDetailPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'contractor/create'} element={
                        <RequireAuth minAccessLevel={41}>
                            <ContractorCreatePage/>
                        </RequireAuth>
                    }/>

                    <Route path={'locations'} element={
                        <RequireAuth minAccessLevel={41}>
                            <LocationsPage/>
                        </RequireAuth>
                    }/>

                    <Route path={'locations/:id'} element={
                        <RequireAuth minAccessLevel={41}>
                            <LocationDetailPage/>
                        </RequireAuth>}>
                        <Route path={'jobType'} element={<JobType/>}/>
                    </Route>

                    <Route path={'location/create'} element={
                        <RequireAuth minAccessLevel={61}>
                            <LocationCreatePage/>
                        </RequireAuth>
                    }/>

                    <Route path={'*'} element={
                        <RequireAuth minAccessLevel={10}>
                            <UnknownPage/>
                        </RequireAuth>
                    }/>

                </Route>
            </Routes>
        </ScopedCssBaseline>
    );
};

export {App};