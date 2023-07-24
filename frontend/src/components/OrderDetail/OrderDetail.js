import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {orderAction} from "../../redux";


import {dateTransformer, jobTypeTranslateHelper} from "../../helpers"

const OrderDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderAction.getById(id))
    }, [id]);
    let {order} = useSelector(state => state.orderReducer);

    const createdAt = dateTransformer(order.createdAt);
    const executionDate = dateTransformer(order.executionDate);
    const jobType = jobTypeTranslateHelper(order.jobType);


    return (
        <div>
            {order &&
                <div>
                    <h2>Заявка № {order.orderNumber}</h2>
                    <div>
                        Тип робіт: {jobType} <br/>
                        Статус: {order.orderStatus} <br/>
                        Пріорітет: {order.priority} <br/>
                        Виконати до: {executionDate} <br/>
                        Дата подачі: {createdAt} <br/>

                    </div>
                    <div>
                        <h3>Локація</h3>
                        Регіон:{order.detailLocation?.region} <br/>
                        Адреса: {order.detailLocation?.city}, {order.detailLocation?.address} <br/>
                        Телефон: {order.detailLocation?.phone}
                    </div>
                    <div>
                        <h3>Виконавець</h3>
                        Назва компанії: {order.detailContractor?.name} <br/>
                        Представник: {order.detailContractor?.representative} <br/>
                        Посада: {order.detailContractor?.jobPosition} <br/>
                        Пошта: {order.detailContractor?.email} <br/>
                        Телефон: {order.detailContractor?.phone}
                    </div>
                    <div>
                        <h3>Заявник</h3>
                        Представник: {order.detailUser?.firstName} {order.detailUser?.lastName}<br/>
                        Посада: {order.detailUser?.profession} <br/>
                        Пошта: {order.detailUser?.email} <br/>
                        Телефон: {order.detailUser?.phone}
                    </div>
                    <div>
                        <h3>Опис заявки:</h3>
                        <p>{order.description}</p>
                    </div>
                    <div>
                        <h3>Вкладення:</h3>
                        {order?.files?.map(file => <p>{file}</p>)}
                    </div>
                    <div>
                        <h3>Коментарі:</h3>
                        {order?.commits?.map(commit => <div key={commit._id}>
                            <h3>{commit.essenceName} пише:</h3>
                            <p>{commit.text}</p>
                            <p>{commit.createdAt}</p>
                        </div>)}
                    </div>
                </div>}
        </div>
    );
};

export {OrderDetail};
// {
//     "_id": "649af9c4d0f09f0c7a7b41ee",
//     "jobType": "technologicalEquipment",
//     "orderStatus": "Нова",
//     "executionTime": 870,
//     "contractor": "649d9a4a837a17cfb3514e14",
//     "user": "64919f159cc69362e170453a",
//     "location": "64918c93c3a37bd27f525444",
//     "priority": "Високий",
//     "description": "ой горіло ой палало",
//     "files": [
//     "vsvwe32fe32ew32ew",
//     "https://learning-2022-2023.s3.eu-north-1.amazonaws.com/fileToOrder/649af9c4d0f09f0c7a7b41ee/568d7dc0-1cd1-11ee-92b0-6bf7fb248a85.jpeg"
// ],
//     "overdue": false,
//     "orderNumber": 1687878084208,
//     "createdAt": "2023-06-27T15:01:24.209Z",
//     "updatedAt": "2023-07-19T14:45:00.012Z",
//     "__v": 0,
//     "executionDate": "2023-08-27T16:01:24.209Z",
//     "detailContractor": {
//     "_id": "649d9a4a837a17cfb3514e14",
//         "region": "Північ",
//         "name": "Fero Start 2.0",
//         "email": "denyk.yevhen@gmail.com",
//         "password": "$2b$10$KlV3ySOjipjf6FtiGMIne.6Fl.OqLkTbiTCeiarFZrPuiWb9cDy5O",
//         "phone": "+380937170795",
//         "representative": "Олег ",
//         "jobPosition": "Директор",
//         "accessLevel": 20,
//         "createdAt": "2023-06-29T14:50:50.596Z",
//         "updatedAt": "2023-06-29T14:50:50.596Z",
//         "__v": 0
// },
//     "detailLocation": {
//     "_id": "64918c93c3a37bd27f525444",
//         "region": "Північ",
//         "city": "Суми",
//         "address": "вул. Зелена 13",
//         "phone": "+380937170795",
//         "status": "Відкритий",
//         "description": "офіс",
//         "createdAt": "2023-06-20T11:25:07.781Z",
//         "updatedAt": "2023-06-20T11:25:07.781Z",
//         "__v": 0
// },
//     "detailUser": {
//     "_id": "64919f159cc69362e170453a",
//         "firstName": "Yevhen",
//         "lastName": "Denyk",
//         "profession": "admin",
//         "email": "denyk.yevhen@gmail.com",
//         "password": "$2b$10$jMhiM7UH.JaMhn.xfDfugebToD8jXaSjrKwBfxUoBNbjJ.E2s4EW2",
//         "phone": "+380937170795",
//         "accessLevel": 100,
//         "createdAt": "2023-06-20T12:44:05.007Z",
//         "updatedAt": "2023-07-17T18:27:48.856Z",
//         "__v": 0,
//         "location": "64918c93c3a37bd27f525444"
// },
//     "": [
//     {
//         "_id": "64be81b75319ce717e81bc36",
//         "essenceId": "64919f159cc69362e170453a",
//         "essenceName": "Yevhen Denyk",
//         "order": "649af9c4d0f09f0c7a7b41ee",
//         "text": "ну це тяжко зробити 123",
//         "createdAt": "2023-07-24T13:50:47.008Z",
//         "updatedAt": "2023-07-24T13:50:47.008Z",
//         "__v": 0
//     }
// ]
// }