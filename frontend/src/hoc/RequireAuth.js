import {Navigate, useLocation} from "react-router-dom";
import {authService} from "../services";


const RequireAuth = ({children, minAccessLevel}) => {

    const location = useLocation();

    const accessLevel = authService.getAccessLevel();

    if (!accessLevel) {
        return <Navigate to={'/login'} state={location}/>
    }
    if (accessLevel >= minAccessLevel) {
        return children
    }
    if (accessLevel < minAccessLevel) {
        return <Navigate to={'/accessLevelIsInsufficient'}/>
    }


};

export {RequireAuth};
