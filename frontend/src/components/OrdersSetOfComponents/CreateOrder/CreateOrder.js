import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createOrderValidator} from "../../../validators";
import {orderService} from "../../../services";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateOrder = () => {
    const [fileList, setFileList] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [hideButton, setHideButton] = useState(false);


    const navigate = useNavigate();

    const LIMIT_FILES_TO_UPLOAD = 5
    const formData = new FormData();

    const handleUploadFile = files => {
        const uploaded = [...fileList]
        let limitExceeded = false

        //////Якщо вкласти файлів більше норми не збереже жодного, та видасть помилку про кількість
        files.some((file) => {
            ////перевіряємо чи не завантажують нам один і той же файл
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file)

                if (uploaded.length === LIMIT_FILES_TO_UPLOAD) {
                    setFileLimit(true);
                }
                if (uploaded.length > LIMIT_FILES_TO_UPLOAD) {
                    alert(`You can only add a maximum of ${LIMIT_FILES_TO_UPLOAD} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })

        if (!limitExceeded) setFileList(uploaded)

    }

    const handleFileEvent = (e) => {
        const selectedFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFile(selectedFiles);
    };

    const {
        handleSubmit,
        register,
        reset,
        formState: {isValid, errors}
    } = useForm({resolver: joiResolver(createOrderValidator), mode: 'all'});


    const submit = async (newOrder) => {
        setHideButton(true)
        const {data: order} = await orderService.create(newOrder);
        reset()

        console.log(fileList)
        for (const file of fileList) {
            formData.set('file', file)
            await orderService.addImage(order._id, formData);
        }

        navigate(`/orders/${order._id}?orderCreated=true`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <select {...register('priority')}>
                        <option value="" disabled selected hidden>Пріорітет</option>
                        <option value='Критичний'>Критичний</option>
                        <option value='Високий'>Високий</option>
                        <option value='Плановий'>Плановий</option>
                        <option value='Низький'>Низький</option>
                    </select>
                    <label>Пріорітет виконання</label>
                </div>
                <div>
                    <select {...register('jobType')}>
                        <option value="" disabled selected hidden>Тип робіт</option>
                        <option value='generalConstructionWorks'>Загальнобудівельні роботи</option>
                        <option value='refrigerationEquipment'>Холодильне обладнання</option>
                        <option value='technologicalEquipment'>Технологічне обладнання</option>
                        <option value='ventilationAndAirConditioning'>Вентиляції та кондиціонування обладнання</option>
                        <option value='liftingEquipmentAndElevators'>Ліфти та підйомне обладнання</option>
                        <option value='dieselGenerators'>Дизельні генератори</option>
                        <option value='electricity'>Електрика</option>
                        <option value='waterAndHeating'>Вода та опалення</option>
                    </select>
                    <label>Типи робіт</label>
                </div>
                <div>
                    <input type="text" {...register('description')}/>
                </div>
                <div>
                    <input type="file" onChange={handleFileEvent} multiple
                           disabled={fileLimit}
                           accept='image/gif, image/jpeg, image/png'
                    />

                    <div>
                        Прикріплені файли:
                        {fileList.map(file => <p key={file.lastModified}> {file.name}</p>)}
                    </div>
                </div>
                {!hideButton && <button disabled={!isValid}>Створити заявку</button>}
            </form>

        </div>
    );
};

export {CreateOrder};