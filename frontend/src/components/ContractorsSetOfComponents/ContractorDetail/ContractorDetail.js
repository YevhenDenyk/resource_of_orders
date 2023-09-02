import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {contractorAction} from "../../../redux";
import {dateTransformer, updateContractorHelper} from "../../../helpers";
import {contractorService} from "../../../services";

const ContractorDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query,] = useSearchParams();
    const [error, setError] = useState(null);
    const [hideButton, setHideButton] = useState(false);

    useEffect(() => {
        dispatch(contractorAction.getById(id))
    }, [id])

    const {contractor} = useSelector(state => state.contractorReducer);
    const createdAt = dateTransformer(contractor.createdAt);
    const updatedAt = dateTransformer(contractor.updatedAt);

    // додати валідатор???
    const {handleSubmit, register, reset, formState: {isValid, errors}} = useForm();

    const submit = async (upContractorInfo) => {
        try {
            setHideButton(true)
            const upContractorHelper = updateContractorHelper(upContractorInfo);
            if (Object.keys(upContractorHelper).length > 0) {
                const upContractor = await contractorService.update(contractor._id, upContractorHelper);
                dispatch(contractorAction.putUpdateContractor(upContractor))
            }
            setError(null)
        } catch (e) {
            setHideButton(false)
            setError(e.response.data)
        }
    }

    const deleteContractor = async () => {
        await contractorService.delete(contractor._id)
        navigate('/contractors?contractorDelete=true')
    }

    return (
        <div>
            {query.has('contractorCreated') && <h1>Профіль підрядної організації успішно створено</h1>}
            {error && <h2>{error.message}</h2>}
            {hideButton && <h2>Зміни збережено</h2>}
            <h2>{contractor.name}</h2>

            <form onSubmit={handleSubmit(submit)}>
                <div>
                    Регіон:
                    <select {...register('region')}>
                        <option value="" disabled selected hidden>{contractor.region}</option>
                        <option value='Північ'>Північ</option>
                        <option value='Схід'>Схід</option>
                        <option value='Центр'>Центр</option>
                        <option value='Південь'>Південь</option>
                        <option value='Захід'>Захід</option>
                    </select>
                </div>
                <div>
                    Представник:
                    <input type="text"
                           defaultValue={contractor.representative}
                           {...register('representative', {})}
                    />
                </div>
                <div>
                    Посада:
                    <input type="text"
                           defaultValue={contractor.jobPosition}
                           {...register('jobPosition', {})}
                    />
                </div>
                <div>
                    Пошта:
                    <input type="text"
                           defaultValue={contractor.email}
                           {...register('email', {})}
                    />
                </div>
                <div>
                    Телефон:
                    <input type="text"
                           defaultValue={contractor.phone}
                           {...register('phone', {})}
                    />
                </div>

                В останнє оновлено інформацію: {updatedAt} <br/>
                Створено: {createdAt} <br/>
                {!hideButton && <button>Зберегти зміни</button>}
            </form>
            <button onClick={deleteContractor}>Видалити підрядника</button>
        </div>
    );
};

export {ContractorDetail};
