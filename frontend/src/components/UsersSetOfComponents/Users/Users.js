import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {userAction} from "../../../redux";
import {formFilterUserHelper} from "../../../helpers";
import {User} from "../User/User";
import {useSearchParams} from "react-router-dom";

const Users = () => {

    const [query,] = useSearchParams();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({});
    const {users, page, count, limit} = useSelector(state => state.userReducer);

    useEffect(() => {
            dispatch(userAction.getAll(filter))
        }, [filter]
    );

    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = (formFilter) => {
        const formFilterHelper = formFilterUserHelper(formFilter);

        if (Object.keys(formFilterHelper).length !== 0) {
            setFilter(formFilterHelper)
        }
    };
    const resetFilter = () => {
        reset()
        setFilter({})
    };

    const nextPage = () => {
        if (page * limit < count) {
            setFilter({...filter, page: page + 1})
        }
    }
    const prevPage = () => {
        if (page > 1) {
            setFilter({...filter, page: page - 1})
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="number" placeholder={'page'} {...register('page')}/> <label>Сторінка</label> <br/>
                <input type="number" placeholder={'limit'} {...register('limit')}/> <label>Ліміт</label> <br/>
                <input type="text" placeholder={'firstName'} {...register('firstName')}/> <label>Ім'я</label> <br/>
                <input type="text" placeholder={'lastName'} {...register('lastName')}/> <label>Прізвище</label> <br/>
                <input type="text" placeholder={'email'} {...register('email')}/> <label>Пошта</label> <br/>
                <input type="text" placeholder={'phone'} {...register('phone')}/> <label>Телефон</label> <br/>
                <button>filter</button>
            </form>
            <div>
                <button onClick={resetFilter}>reset filter</button>
            </div>

            <div>
                Всього користувачів {count} <br/>
                Ліміт відображення {limit} <br/>
                Сторінка {page}
            </div>

            {query.has('userDelete') && <h1>Профіль користувача успішно видалений</h1>}

            <table>
                <thead>
                <tr>
                    <th>ПІБ</th>
                    <th>Посада</th>
                    <th>Телефон</th>
                    <th>Пошта</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => <User key={user._id} user={user}/>)}
                </tbody>
            </table>


            <div>
                <button onClick={prevPage}>Назад</button>
                <button onClick={nextPage}>Вперед</button>

            </div>

        </div>
    );
};

export {Users};