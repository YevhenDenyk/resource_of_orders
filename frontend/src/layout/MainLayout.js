import {Outlet} from "react-router-dom";

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {Button, Toolbar} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";

import {SideMenu} from "../components";
import {authService} from "../services";
import {useState} from "react";


const MainLayout = () => {
    const drawerWidth = 240;

    // може кудись вивести потенційну помилку?
    const [error, setError] = useState(null);

    const logout = async () => {
        try {
            await authService.logout()
            authService.deleteToken()
            setError(null)
        } catch (e) {
            setError(e.response.data)
        }
    }

    return (
        <Box sx={{display: 'flex', flexGrow: 1}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar sx={{flexGrow: 1}}>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        Сервісна служба
                    </Typography>
                    <Button href={'/login?endSession=true'} onClick={logout} color="inherit">Вийти</Button>
                </Toolbar>
            </AppBar>
            {/**************************/}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <SideMenu/>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}

export {MainLayout}