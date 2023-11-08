import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createOrderValidator} from "../../../validators";
import {orderService} from "../../../services";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Button, FormControl, InputLabel, MenuItem, Paper, Select, styled, TextField} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SendIcon from '@mui/icons-material/Send';

const CreateOrder = () => {
    const [fileList, setFileList] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [loading, setLoading] = useState(false)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
        setLoading(true)
        const {data: order} = await orderService.create(newOrder);
        reset()

        for (const file of fileList) {
            formData.set('file', file)
            await orderService.addImage(order._id, formData);
        }

        navigate(`/orders/${order._id}?orderCreated=true`)
    }

    return (
        <Paper elevation={4} sx={{
            mt: 2,
            p: 3,
            display: 'flex',
            flexDirection: 'left',
            alignItems: 'center'
        }}>
            <form onSubmit={handleSubmit(submit)}>

                <FormControl sx={{m: 1, minWidth: 500}} size="normal">
                    <InputLabel id="priority-label">Пріорітет</InputLabel>
                    <Select
                        {...register('priority')}
                        labelId="priority-label"
                        id="priority"
                        label="Пріорітет"
                    >
                        <MenuItem value=''>
                            <em>Не вибрано</em>
                        </MenuItem>
                        <MenuItem value={'Критичний'}>Критичний</MenuItem>
                        <MenuItem value={'Високий'}>Високий</MenuItem>
                        <MenuItem value={'Плановий'}>Плановий</MenuItem>
                        <MenuItem value={'Низький'}>Низький</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <FormControl sx={{m: 1, minWidth: 500}} size="normal">
                    <InputLabel id="jobType-label">Тип робіт</InputLabel>
                    <Select
                        {...register('jobType')}
                        labelId="jobType-label"
                        id="jobType"
                        label="Тип робіт"
                    >
                        <MenuItem value=''>
                            <em>Не вибрано</em>
                        </MenuItem>
                        <MenuItem value={'generalConstructionWorks'}>Загальнобудівельні роботи</MenuItem>
                        <MenuItem value={'refrigerationEquipment'}>Холодильне обладнання</MenuItem>
                        <MenuItem value={'technologicalEquipment'}>Технологічне обладнання</MenuItem>
                        <MenuItem value={'ventilationAndAirConditioning'}>Вентиляції та кондиціонування
                            обладнання</MenuItem>
                        <MenuItem value={'liftingEquipmentAndElevators'}>Ліфти та підйомне обладнання</MenuItem>
                        <MenuItem value={'dieselGenerators'}>Дизельні генератори</MenuItem>
                        <MenuItem value={'electricity'}>Електрика</MenuItem>
                        <MenuItem value={'waterAndHeating'}>Вода та опалення</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <TextField
                    {...register('description')}
                    id="description"
                    label="Опис проблеми"
                    variant="outlined"
                    multiline
                    sx={{m: 1, width: 500}}
                />
                <br/>

                <Button
                    sx={{m: 1}}
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon/>}
                    disabled={fileLimit}
                >
                    Додати файли
                    <VisuallyHiddenInput
                        multiple
                        type="file"
                        accept='image/gif, image/jpeg, image/png'
                        onChange={handleFileEvent}
                    />
                </Button>

                Максимум 5 картинок

                {fileList[0] &&
                    <div>
                        Прикріплені файли:
                        {fileList.map(file => <p key={file.lastModified}> {file.name}</p>)}
                    </div>
                }

                <br/>
                <LoadingButton
                    sx={{m: 1}}
                    type="submit"
                    disabled={!isValid}
                    variant={"contained"}
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<SendIcon/>}
                    // onClick={() => setLoading(true)}
                >
                    <span>Створити заявку</span>
                </LoadingButton>


            </form>

        </Paper>
    );
};

export {CreateOrder};