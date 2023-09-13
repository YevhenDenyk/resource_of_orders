import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {jobTypeAction} from "../../../redux";
import {JobTypeCreate} from "../JobTypeCreate/JobTypeCreate";

const JobType = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeAction.getById(id))
    }, [id])

    const {jobType, errors} = useSelector(state => state.jobTypeReducer);


    return (
        <div>
            {!jobType && <JobTypeCreate/>}

            {jobType &&
                <table>
                    <thead>
                    <tr>
                        <th>Тип робіт</th>
                        <th>Компанія</th>
                        <th>Телефон</th>
                        <th>Пошта</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>

                        <td>Загальнобудівельні роботи</td>
                        <td>
                            <Link to={`/contractors/${jobType.generalConstructionWorks._id}`}>
                                {jobType.generalConstructionWorks.name}
                            </Link>
                        </td>
                        <td>{jobType.generalConstructionWorks.phone}</td>
                        <td>{jobType.generalConstructionWorks.email}</td>

                    </tr>
                    <tr>

                        <td>Холодильне обладнання</td>
                        <td>
                            <Link to={`/contractors/${jobType.refrigerationEquipment._id}`}>
                                {jobType.refrigerationEquipment.name}
                            </Link>
                        </td>
                        <td>{jobType.refrigerationEquipment.phone}</td>
                        <td>{jobType.refrigerationEquipment.email}</td>

                    </tr>
                    <tr>

                        <td>Технологічне обладнання</td>
                        <td>
                            <Link to={`/contractors/${jobType.technologicalEquipment._id}`}>
                                {jobType.technologicalEquipment.name}
                            </Link>
                        </td>
                        <td>{jobType.technologicalEquipment.phone}</td>
                        <td>{jobType.technologicalEquipment.email}</td>

                    </tr>
                    <tr>

                        <td>Вентиляція та кондиціонування</td>
                        <td>
                            <Link to={`/contractors/${jobType.ventilationAndAirConditioning._id}`}>
                                {jobType.ventilationAndAirConditioning.name}
                            </Link>
                        </td>
                        <td>{jobType.ventilationAndAirConditioning.phone}</td>
                        <td>{jobType.ventilationAndAirConditioning.email}</td>

                    </tr>
                    <tr>

                        <td>Ліфти та підйомне обладнання</td>
                        <td>
                            <Link to={`/contractors/${jobType.liftingEquipmentAndElevators._id}`}>
                                {jobType.liftingEquipmentAndElevators.name}
                            </Link>
                        </td>
                        <td>{jobType.liftingEquipmentAndElevators.phone}</td>
                        <td>{jobType.liftingEquipmentAndElevators.email}</td>

                    </tr>
                    <tr>

                        <td>Дизельгенератори</td>
                        <td>
                            <Link to={`/contractors/${jobType.dieselGenerators._id}`}>
                                {jobType.dieselGenerators.name}
                            </Link>
                        </td>
                        <td>{jobType.dieselGenerators.phone}</td>
                        <td>{jobType.dieselGenerators.email}</td>

                    </tr>
                    <tr>

                        <td>Електрика</td>
                        <td>
                            <Link to={`/contractors/${jobType.electricity._id}`}>
                                {jobType.electricity.name}
                            </Link>
                        </td>
                        <td>{jobType.electricity.phone}</td>
                        <td>{jobType.electricity.email}</td>

                    </tr>
                    <tr>

                        <td>Вода, опалення та каналізація</td>
                        <td>
                            <Link to={`/contractors/${jobType.waterAndHeating._id}`}>
                                {jobType.waterAndHeating.name}
                            </Link>
                        </td>
                        <td>{jobType.waterAndHeating.phone}</td>
                        <td>{jobType.waterAndHeating.email}</td>

                    </tr>

                    </tbody>
                </table>
            }

        </div>
    );
};

export {JobType};
