import {Link} from "react-router-dom";

import {dateTransformer} from "../../../helpers"
import css from './Order.module.css'

const Order = ({order}) => {
    let {createdAt, executionDate, jobType, orderStatus, priority, overdue, orderNumber, _id} = order
    let color = ''

    createdAt = dateTransformer(createdAt);
    executionDate = dateTransformer(executionDate);

    switch (jobType) {
        case 'generalConstructionWorks':
            jobType = 'Загальнобудівельні роботи'
            break
        case 'refrigerationEquipment':
            jobType = 'Холодильне обладнання'
            break
        case 'technologicalEquipment':
            jobType = 'Технологічне обладнання'
            break
        case 'ventilationAndAirConditioning':
            jobType = 'Вентиляції та кондиціонування обладнання'
            break
        case 'liftingEquipmentAndElevators':
            jobType = 'Ліфти та підйомне обладнання'
            break
        case 'dieselGenerators':
            jobType = 'Дизельні генератори'
            break
        case 'electricity':
            jobType = 'Електрика'
            break
        case 'waterAndHeating':
            jobType = 'Вода та опалення'
            break
    }

    if (orderStatus === 'Нова') color = 'orange'
    if (orderStatus === 'В роботі') color = 'lawngreen'
    if (overdue) color = 'red'
    if (orderStatus === 'Виконана' || orderStatus === 'Відхилена' || orderStatus === 'Скасована') color = 'lightgrey'

    return (
        <tr bgcolor={color}>
            <td>
                <Link to={`/orders/${_id}`}>
                    {orderNumber}
                </Link>
            </td>
            <td>{executionDate}</td>
            <td>{orderStatus}</td>
            <td>{priority}</td>
            <td>{jobType}</td>
            <td>{createdAt}</td>
        </tr>
    );
};

export {Order};


// "_id": "649af9c4d0f09f0c7a7b41ee",
//     "jobType": "technologicalEquipment",
//     "orderStatus": "Нова",
//     "executionTime": 1,
//     "contractor": "649d9a4a837a17cfb3514e14",
//     "user": "64919f159cc69362e170453a",
//     "location": "64918c93c3a37bd27f525444",
//     "priority": "Високий",
//     "description": "ой горіло ой палало",
//     "files": [
//     "vsvwe32fe32ew32ew",
//     "https://learning-2022-2023.s3.eu-north-1.amazonaws.com/fileToOrder/649af9c4d0f09f0c7a7b41ee/568d7dc0-1cd1-11ee-92b0-6bf7fb248a85.jpeg"
// ],
//     "overdue": true,
//     "orderNumber": 1687878084208,
//     "createdAt": "2023-06-27T15:01:24.209Z",
//     "updatedAt": "2023-07-19T14:45:00.012Z",
//     "__v": 0,
//     "executionDate": "2023-06-27T16:01:24.209Z"