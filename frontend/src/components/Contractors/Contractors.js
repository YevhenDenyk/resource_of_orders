import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {orderAction} from "../../redux";
import {contractorFormFilterHelper} from "../../helpers";

const Contractors = () => {

    const dispatch = useDispatch();
    const [filter, setFilter] = useState({});
    const {orders} = useSelector(state => state.orderReducer);
    useEffect(() => {
        dispatch(orderAction.getAll(filter))
    }, [filter]);

    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = (formFilter) => {
        const formFilterHelper = contractorFormFilterHelper(formFilter);
        setFilter(formFilterHelper)
    };
    const resetFilter = () => {
        reset()
        setFilter({})
    };

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
        </div>
    );
};

export {Contractors};