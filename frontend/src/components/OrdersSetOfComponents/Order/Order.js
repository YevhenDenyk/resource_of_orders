import {Link} from "react-router-dom";

import {dateTransformer} from "../../../helpers"

import {TableCell, TableRow} from "@mui/material";

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
            jobType = 'Вентиляція та кондиціонування обладнання'
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
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': {border: 0},
                backgroundColor: color
            }}
        >
            <TableCell component="th" scope="row">
                <Link to={`/orders/${_id}`}>
                    {orderNumber}
                </Link >
            </TableCell>
            <TableCell>{executionDate}</TableCell>
            <TableCell>{orderStatus}</TableCell>
            <TableCell align="center">{priority}</TableCell>
            <TableCell>{jobType}</TableCell>
            <TableCell>{createdAt}</TableCell>
        </TableRow>
    );
};

export {Order};
