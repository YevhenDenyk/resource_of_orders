import {Outlet} from "react-router-dom";

import css from './MainLayout.module.css'
import {Toolbar} from "../components/Toolbar/Toolbar";

const MainLayout = () => {
    return (
        <div className={css.layout}>
            <Toolbar/>
            <Outlet/>

        </div>
    );
};

export {MainLayout};