import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {locationAction} from "../../../redux";
import {formFilterLocationHelper} from "../../../helpers";
import {Location} from "../Location/Location";

const Locations = () => {
    const [query,] = useSearchParams();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({});
    const {locations, count, limit, page} = useSelector(state => state.locationReducer);

    useEffect(() => {
        dispatch(locationAction.getAll(filter))
    }, [filter]);

    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = (formFilter) => {
        const formFilterHelper = formFilterLocationHelper(formFilter);

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
                <select {...register('status')}>
                    <option value="" disabled selected hidden>Статус</option>
                    <option value='Проект'>Проект</option>
                    <option value='Відкритий'>Відкритий</option>
                    <option value='Реконструкція'>Реконструкція</option>
                    <option value='Закритий'>Закритий</option>
                </select>
                <label>Статус</label> <br/>
                <select {...register('region')}>
                    <option value="" disabled selected hidden>Регіон</option>
                    <option value='Північ'>Північ</option>
                    <option value='Схід'>Схід</option>
                    <option value='Центр'>Центр</option>
                    <option value='Південь'>Південь</option>
                    <option value='Захід'>Захід</option>
                </select>
                <label>Регіон</label> <br/>
                <input type="text" placeholder={'city'} {...register('city')}/> <label>Місто</label> <br/>
                <input type="text" placeholder={'address'} {...register('address')}/> <label>Адреса</label> <br/>
                <input type="text" placeholder={'phone'} {...register('phone')}/> <label>Телефон</label> <br/>
                <button>filter</button>
            </form>
            <div>
                <button onClick={resetFilter}>reset filter</button>
            </div>

            <div>
                Всього локацій {count} <br/>
                Ліміт відображення {limit} <br/>
                Сторінка {page}
            </div>


            <table>
                <thead>
                <tr>
                    <th>Статус</th>
                    <th>Регіон</th>
                    <th>Місто</th>
                    <th>Адреса</th>
                </tr>
                </thead>
                <tbody>
                {locations.map(location => <Location key={location._id} location={location}/>)}
                </tbody>
            </table>


            <div>
                <button onClick={prevPage}>Назад</button>
                <button onClick={nextPage}>Вперед</button>

            </div>
        </div>
    );
};
export {Locations};

