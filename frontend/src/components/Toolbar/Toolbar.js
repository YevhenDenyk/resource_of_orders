import {Link} from "react-router-dom";

import css from './Toolbar.module.css'

const Toolbar = () => {

    return (
        <div>
            <Link to={'/login'} className={css.link}>
                <div className={css.button}>
                    Увійти
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

        </div>
    );
};

export {Toolbar};