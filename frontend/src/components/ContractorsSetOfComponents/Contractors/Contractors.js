import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {orderAction} from "../../../redux";
import {contractorFormFilterHelper, orderFormFilterHelper} from "../../../helpers";
import {Order} from "../../OrdersSetOfComponents";

const Contractors = () => {

    const dispatch = useDispatch();
    const [filter, setFilter] = useState({});
    const {orders, count, limit, page} = useSelector(state => state.orderReducer);
    useEffect(() => {
        dispatch(orderAction.getAll(filter))
    }, [filter]);

    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = (formFilter) => {
        const formFilterHelper = orderFormFilterHelper(formFilter);

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
                <input type="number" placeholder={'page'} {...register('page')}/> <br/>
                <input type="number" placeholder={'limit'} {...register('limit')}/><br/>
                <input type="text" placeholder={'name'} {...register('name')}/><br/>
                <input type="text" placeholder={'email'} {...register('email')}/><br/>
                <input type="text" placeholder={'phone'} {...register('phone')}/><br/>
                <button>filter</button>
            </form>
            <div>
                <button onClick={resetFilter}>reset filter</button>
            </div>

            <div>
                Всього заявок {count} <br/>
                Кількість показано {limit} <br/>
                Сторінка {page}
            </div>

            <table>
                <thead>
                <tr>
                    <th>Номер заявки</th>
                    <th>Виконати до</th>
                    <th>Статус</th>
                    <th>Пріорітет</th>
                    <th>Тип робіт</th>
                    <th>Дата подачі</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => <Order key={order._id} order={order}/>)}
                </tbody>
            </table>


            <div>
                <button onClick={prevPage}>Назад</button>
                <button onClick={nextPage}>Вперед</button>

            </div>
        </div>
    );
};

export {Contractors};