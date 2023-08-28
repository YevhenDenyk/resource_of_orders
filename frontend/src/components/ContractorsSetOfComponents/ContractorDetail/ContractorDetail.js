import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

import {contractorAction} from "../../../redux";
import {dateTransformer} from "../../../helpers";

const ContractorDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contractorAction.getById(id))
    }, [id])

    const {contractor} = useSelector(state => state.contractorReducer);
    const createdAt = dateTransformer(contractor.createdAt);
    const updatedAt = dateTransformer(contractor.updatedAt);

    return (
        <div>
            <h2>{contractor.name}</h2>
            Регіон: {contractor.region} <br/>
            Представник: {contractor.representative} <br/>
            Посада: {contractor.jobPosition} <br/>
            Пошта: {contractor.email} <br/>
            Телефон: {contractor.phone} <br/>

            В останнє оновлено інформацію: {updatedAt} <br/>
            Створено: {createdAt}
        </div>
    );
};

export {ContractorDetail};
