import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import css from './Orders.module.css'
import {orderAction} from "../../../redux";
import {Order} from "../Order/Order";
import {orderFormFilterHelper} from "../../../helpers";

const Orders = () => {

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
                <input type="number" placeholder={'page'} {...register('page')}/><label>сторінка</label><br/>
                <input type="number" placeholder={'limit'} {...register('limit')}/><label>Ліміт</label><br/>
                <div>
                    <select {...register('jobType')}>
                        <option value="" disabled selected hidden>Тип робіт</option>
                        <option value=''></option>
                        <option value='generalConstructionWorks'>Загальнобудівельні роботи</option>
                        <option value='refrigerationEquipment'>Холодильне обладнання</option>
                        <option value='technologicalEquipment'>Технологічне обладнання</option>
                        <option value='ventilationAndAirConditioning'>Вентиляції та кондиціонування обладнання</option>
                        <option value='liftingEquipmentAndElevators'>Ліфти та підйомне обладнання</option>
                        <option value='dieselGenerators'>Дизельні генератори</option>
                        <option value='electricity'>Електрика</option>
                        <option value='waterAndHeating'>Вода та опалення</option>
                    </select>
                    <label>Типи робіт</label>
                </div>

                <div>
                    <select {...register('orderStatus')}>
                        <option value="" disabled selected hidden>Статус заявки</option>
                        <option value=''></option>
                        <option value='Нова'>Нова</option>
                        <option value='В роботі'>В роботі</option>
                        <option value='Виконана'>Виконана</option>
                        <option value='Відхилена'>Відхилена</option>
                        <option value='Скасована'>Скасована</option>
                    </select>
                    <label>Статус заявки</label>
                </div>

                <div>
                    <input type="checkbox" {...register('overdue')}/>
                    <label>Протерміновані заявки</label>
                </div>

                <div>
                    <select {...register('priority')}>
                        <option value="" disabled selected hidden>Пріорітет</option>
                        <option value=''></option>
                        <option value='Критичний'>Критичний</option>
                        <option value='Високий'>Високий</option>
                        <option value='Плановий'>Плановий</option>
                        <option value='Низький'>Низький</option>
                    </select>
                    <label>Пріорітет виконання</label>
                </div>

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

export {Orders};