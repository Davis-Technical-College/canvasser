import React, { useState } from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    Switch,
    IconButton,
    Menu,
    ListItem,
    MenuItem,
    Snackbar,

} from '@material-ui/core';

import {
    Brightness4Rounded,
    Brightness7Rounded,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import User from '../components/user.js'

import useUser from "../data/use-user";

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        bar: {
            marginBottom: theme.spacing(3),
        }
    }));

export default function Nav(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const open = Boolean(anchorEl);

    const { user, errored, mutate } = useUser(props.canvasUrl && props.apiKey ? `${props.canvasUrl}/api/v1/users/self?access_token=${props.apiKey}` : null);

    const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        };
    
    const handleMenuClose = () => {
            setAnchorEl(null);
        };

    const handleUrl = () => {
        setSnackbarText(props.canvasUrl)
        setSnackbarOpen(true)
    }

    const handleKey = () => {
        setSnackbarText(props.apiKey)
        setSnackbarOpen(true)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleRevoke = () => {
        setAnchorEl(null);
        props.setCanvasUrl()
        props.setApiKey()
        props.setAuthorized(false)
        localStorage.clear()
    }

    /*/
     * TODO: add name, canvasUrl, and apiKey to menu
     * TODO: add dialog to change canvasUrl and apiKey when click in menu
    /*/
    return(
        <AppBar className={classes.bar} position='static'>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Canvasser - Old Version
                </Typography>
                <IconButton 
                    onClick={() => props.setDarkMode(!props.darkMode)}
                >
                    {props.darkMode ? <Brightness7Rounded /> : <Brightness4Rounded style={{ color: 'white' }}/>}
                </IconButton>
                <IconButton 
                    edge={'end'}
                    size={'small'}
                    onClick={handleMenu}
                >
                    <User 
                        canvasUrl={props.canvasUrl}
                        apiKey={props.apiKey}
                    />
                </IconButton>
                <Menu 
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleMenuClose}
                >
                    { user ? <ListItem dense divider><Typography>{user.name}</Typography></ListItem> : null }
                    { props.canvasUrl ? <MenuItem onClick={handleUrl}>Canvas URL</MenuItem> : null }
                    { props.apiKey ? <MenuItem onClick={handleKey}>API Key</MenuItem> : null }
                    <MenuItem onClick={handleRevoke}>Revoke Authorization</MenuItem>
                    <MenuItem>Version: 0.2.1</MenuItem>
                </Menu>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    message={snackbarText}
                />
            </Toolbar>
        </AppBar>
    )
}