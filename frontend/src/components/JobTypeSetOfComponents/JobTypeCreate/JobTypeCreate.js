import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {contractorAction, jobTypeAction} from "../../../redux";
import {JobTypeValidator} from "../../../validators";
import {jobTypeService} from "../../../services";

const JobTypeCreate = () => {

    const {id} = useParams()
    const dispatch = useDispatch();
    const [hideButton, setHideButton] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(contractorAction.getAll({limit: 1000}))
    }, [])

    const {contractors} = useSelector(state => state.contractorReducer);

    const {handleSubmit, register, reset, formState: {isValid}} =
        useForm({mode: "all", resolver: joiResolver(JobTypeValidator)});

    const submit = async (newJobType) => {
        try {
            setHideButton(true)
            const {data} = await jobTypeService.create({...newJobType, location: id});
            console.log(data)
            dispatch(jobTypeAction.setJobType(data))
            reset()
            setError(null)
        } catch (e) {
            setError(e.response.data)
            setHideButton(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Типи робіт не містять виконавців</h2>
            <h3>Виберіть відповідного підрядника до типу робіт</h3>
            <div>
                Загальнобудівельні роботи:
                <select {...register('generalConstructionWorks')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Холодильне обладнання:
                <select {...register('refrigerationEquipment')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Технологічне обладнання:
                <select {...register('technologicalEquipment')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Вентиляція та кондиціонування:
                <select {...register('ventilationAndAirConditioning')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Ліфти та підйомне обладнання:
                <select {...register('liftingEquipmentAndElevators')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Дизельгенератори:
                <select {...register('dieselGenerators')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Електрика:
                <select {...register('electricity')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            <div>
                Вода, опалення та каналізація:
                <select {...register('waterAndHeating')}>
                    <option value="" disabled selected hidden>Виберіть підрядну організацію</option>
                    {contractors.map(contractor =>
                        <option key={contractor._id} value={contractor._id}>{contractor.name}</option>
                    )}
                </select>
            </div>
            {!hideButton && <button disabled={!isValid}>Призначити підрядників</button>}
            {error && <h1>{error.message}</h1>}
        </form>
    );
};

export {JobTypeCreate};