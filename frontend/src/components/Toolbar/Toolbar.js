import {Link} from "react-router-dom";

import css from './Toolbar.module.css'

const Toolbar = () => {

    return (
        <div>
            <Link to={'/orders'} className={css.link}>
                <div className={css.button}>
                    Заявки
                </div>
            </Link>
            <Link to={'/users'} className={css.link}>
                <div className={css.button}>
                    Користувачі
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