import {useEffect, useState} from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import {authService} from "../../services";


const SideMenu = () => {

    const accessLevel = authService.getAccessLevel();

    const leadEngineerList = [
        {href: '/order/create', text: 'Нова заявка', icon: <BorderColorOutlinedIcon/>},
        {href: '/orders', text: 'Заявки', icon: <AssignmentOutlinedIcon/>},
        {href: '/user/create', text: 'Новий користувач', icon: <PersonAddAltOutlinedIcon/>},
        {href: '/users', text: 'Користувачі', icon: <PeopleAltOutlinedIcon/>},
        {href: '/contractor/create', text: 'Новий підрядник', icon: <EngineeringOutlinedIcon/>},
        {href: '/contractors', text: 'Підрядники', icon: <EngineeringOutlinedIcon/>},
        {href: '/location/create', text: 'Нова Локація', icon: <AddHomeWorkOutlinedIcon/>},
        {href: '/locations', text: 'Локації', icon: <MapsHomeWorkOutlinedIcon/>},
    ]
    const engineerList = [
        {href: '/order/create', text: 'Нова заявка', icon: <BorderColorOutlinedIcon/>},
        {href: '/orders', text: 'Заявки', icon: <AssignmentOutlinedIcon/>},
        {href: '/users', text: 'Користувачі', icon: <PeopleAltOutlinedIcon/>},
        {href: '/contractors', text: 'Підрядники', icon: <EngineeringOutlinedIcon/>},
        {href: '/contractor/create', text: 'Новий підрядник', icon: <EngineeringOutlinedIcon/>},
        {href: '/locations', text: 'Локації', icon: <MapsHomeWorkOutlinedIcon/>},
    ]
    const staffList = [
        {href: '/order/create', text: 'Нова заявка', icon: <BorderColorOutlinedIcon/>},
        {href: '/orders', text: 'Заявки', icon: <AssignmentOutlinedIcon/>},
        {href: '/users', text: 'Користувачі', icon: <PeopleAltOutlinedIcon/>},
    ]
    const contractorList = [
        {href: '/orders', text: 'Заявки', icon: <AssignmentOutlinedIcon/>},
    ]

    const [buttonListArr, setButtonListArr] = useState(null)

    useEffect(() => {
        if (accessLevel>=10 && accessLevel<=20) return setButtonListArr(contractorList)
        if (accessLevel>=21 && accessLevel<=40) return setButtonListArr(staffList)
        if (accessLevel>=41 && accessLevel<=60) return setButtonListArr(engineerList)
        if (accessLevel>=61 && accessLevel<=100) return setButtonListArr(leadEngineerList)
    }, []);


    return (

        <List>
            {buttonListArr?.map(list =>
                <ListItem key={list.href} disablePadding>
                    <ListItemButton href={list.href}>
                        <ListItemIcon>
                            {list.icon}
                        </ListItemIcon>
                        <ListItemText primary={list.text}/>
                    </ListItemButton>
                </ListItem>
            )
            }

        </List>
    );
};

export {SideMenu};