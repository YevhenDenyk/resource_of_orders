import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {contractorAction} from "../../../redux";
import {contractorFormFilterHelper} from "../../../helpers";
import {Contractor} from "../Contractor/Contractor";


const Contractors = () => {

    const dispatch = useDispatch();
    const [filter, setFilter] = useState({});
    const {contractors, count, limit, page} = useSelector(state => state.contractorReducer);

    useEffect(() => {
        dispatch(contractorAction.getAll(filter))
    }, [filter]);

    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = (formFilter) => {
        const formFilterHelper = contractorFormFilterHelper(formFilter);

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
                <input type="text" placeholder={'name'} {...register('name')}/> <label>Назва компанії</label> <br/>
                <input type="text" placeholder={'email'} {...register('email')}/> <label>Пошта</label> <br/>
                <input type="text" placeholder={'phone'} {...register('phone')}/> <label>Телефон</label> <br/>
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
                    <th>Назва компанії</th>
                    <th>Регіон</th>
                    <th>Представник</th>
                    <th>Посада</th>
                    <th>Пошта</th>
                    <th>Телефон</th>
                </tr>
                </thead>
                <tbody>
                {contractors.map(contractor => <Contractor key={contractor._id} contractor={contractor}/>)}
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