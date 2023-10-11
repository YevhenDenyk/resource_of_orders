import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {
    Box, Button, FormControl, FormControlLabel,
    InputLabel, MenuItem, Pagination, Paper, Select,
    Switch, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography
} from "@mui/material";

import {orderAction} from "../../../redux";
import {Order} from "../Order/Order";
import {formFilterOrderHelper} from "../../../helpers";

const Orders = () => {

    const [filter, setFilter] = useState({});
    const [jobTypeDefaultValue, setJobTypeDefaultValue] = useState('')
    const [orderStatusDefaultValue, setOrderStatusDefaultValue] = useState('')
    const [priorityDefaultValue, setPriorityDefaultValue] = useState('')
    const [overdueSwitch, setOverdueSwitch] = useState(false)
    const [disableFilterButton, setDisableFilterButton] = useState(true)

    const dispatch = useDispatch();
    const {orders, count, limit, page, totalPage} = useSelector(state => state.orderReducer);

    useEffect(() => {
        const formFilterHelper = formFilterOrderHelper(filter);

        dispatch(orderAction.getAll(formFilterHelper))

        if (Object.keys(formFilterHelper).length !== 0) setDisableFilterButton(false)
        if (Object.keys(formFilterHelper).length === 0) setDisableFilterButton(true)

    }, [filter]);


    const handleChange = (event, value) => {
        setFilter({...filter, page: value})
    }

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 150}} size="small">
                <InputLabel id="jobType-label">Тип робіт</InputLabel>
                <Select
                    value={jobTypeDefaultValue}
                    labelId="jobType-label"
                    id="jobType"
                    label="Тип робіт"
                    onChange={(e) => {
                        setFilter({...filter, jobType: e.target.value})
                        setJobTypeDefaultValue(e.target.value)
                    }}
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

            <FormControl sx={{m: 1, minWidth: 150}} size="small">
                <InputLabel id="orderStatus-label">Статус заявок</InputLabel>
                <Select
                    value={orderStatusDefaultValue}
                    labelId="orderStatus-label"
                    id="orderStatus"
                    label="Статус заявок"
                    onChange={(e) => {
                        setFilter({...filter, orderStatus: e.target.value})
                        setOrderStatusDefaultValue(e.target.value)
                    }}
                >
                    <MenuItem value=''>
                        <em>Не вибрано</em>
                    </MenuItem>
                    <MenuItem value={'Нова'}>Нова</MenuItem>
                    <MenuItem value={'В роботі'}>В роботі</MenuItem>
                    <MenuItem value={'Виконана'}>Виконана</MenuItem>
                    <MenuItem value={'Відхилена'}>Відхилена</MenuItem>
                    <MenuItem value={'Скасована'}>Скасована</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 150}} size="small">
                <InputLabel id="priority-label">Пріорітет</InputLabel>
                <Select
                    value={priorityDefaultValue}
                    labelId="priority-label"
                    id="priority"
                    label="Статус заявок"
                    onChange={(e) => {
                        setFilter({...filter, priority: e.target.value})
                        setPriorityDefaultValue(e.target.value)
                    }}
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

            <FormControlLabel
                control={<Switch
                    checked={overdueSwitch}
                    onChange={(e, v) => {
                        setFilter({...filter, overdue: v})
                        if (overdueSwitch) setOverdueSwitch(false)
                        else setOverdueSwitch(true)
                    }}
                />}
                label={'Протерміновані заявки'}
                sx={{m: 1}}
            />

            <Button
                onClick={() => {
                    setFilter({})
                    setJobTypeDefaultValue('')
                    setPriorityDefaultValue('')
                    setOrderStatusDefaultValue('')
                    setOverdueSwitch(false)
                }}
                disabled={disableFilterButton}
                variant={"contained"}
            >Скинути фільтр</Button>


            <div>
                Всього заявок {count} <br/>
            </div>


            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Номер&nbsp;заявки</b></TableCell>
                            <TableCell><b>Виконати&nbsp;до</b></TableCell>
                            <TableCell><b>Статус</b></TableCell>
                            <TableCell align="center"><b>Пріорітет</b></TableCell>
                            <TableCell><b>Тип&nbsp;робіт</b></TableCell>
                            <TableCell><b>Дата&nbsp;подачі</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => <Order key={order._id} order={order}/>)}
                    </TableBody>
                </Table>
            </TableContainer>


            <Box sx={{display: "flex", justifyContent: 'center', m: 1}}>
                <Pagination count={totalPage} page={page} color="primary" onChange={handleChange}/>
                <Box sx={{display: "flex", ml: 3}}>
                    <Typography variant="body1" sx={{mr: 1}}>Показати: </Typography>
                    <FormControl variant="standard" size='small' sx={{minWidth: 80}}>
                        <Select
                            value={limit}
                            onChange={(e) => {
                                setFilter({...filter, limit: e.target.value})
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </div>
    );
};

export {Orders};