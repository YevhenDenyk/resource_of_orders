import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

import css from './Toolbar.module.css'
import {authService} from "../../services";

const Toolbar = () => {
    // може кудись вивести потенційну помилку?
    const [error, setError] = useState(null);

    const logout = async () => {
        try {
            await authService.logout()
            authService.deleteToken()
            setError(null)
        } catch (e) {
            setError(e.response.data)
        }
    }

    return (
        <div>
            <Link to={'/login'} className={css.link}>
                <div className={css.button}>
                    Увійти
                </div>
            </Link>
            <Link to={'/login?endSession=true'} onClick={logout} className={css.link}>
                <div className={css.button}>
                    Завершити роботу
                </div>
            </Link>
            <Link to={'/order/create'} className={css.link}>
                <div className={css.button}>
                    Нова заявка
                </div>
            </Link>
            <Link to={'/orders'} className={css.link}>
                <div className={css.button}>
                    Заявки
                </div>
            </Link>
            <Link to={'/user/create'} className={css.link}>
                <div className={css.button}>
                    Новий користувач
                </div>
            </Link>
            <Link to={'/users'} className={css.link}>
                <div className={css.button}>
                    Користувачі
                </div>
            </Link>
            <Link to={'/contractor/create'} className={css.link}>
                <div className={css.button}>
                    Новий підрядник
                </div>
            </Link>
            <Link to={'/contractors'} className={css.link}>
                <div className={css.button}>
                    Підрядники
                </div>
            </Link>
            <Link to={'/location/create'} className={css.link}>
                <div className={css.button}>
                    Нова Локація
                </div>
            </Link>
            <Link to={'/locations'} className={css.link}>
                <div className={css.button}>
                    Локації
                </div>
            </Link>
        </div>
    );
};

export {Toolbar};