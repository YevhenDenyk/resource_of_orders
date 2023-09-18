import {authService, history} from "../../services";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const AccessLevelIsInsufficientPage = () => {

    const essenceName = authService.getEssenceName();

    const navigate = useNavigate();

    useEffect( () => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
               navigate('/orders', {replace: true})
        })
    }, []);

    return (
        <div>
            <h2>Шановний користувач {essenceName}, рівень вашого доступу недостатній для доступу до цього розділу</h2>
        </div>
    );
};

export {AccessLevelIsInsufficientPage};