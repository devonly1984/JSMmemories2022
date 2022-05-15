import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import {Link, useHistory, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';

import decode from 'jwt-decode'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        setUser(null);
        history.push('/');
        
    }   
    return (
      <>
            <AppBar position="static" color="inherit" className={classes.appBar}>
                <Link to="/" className={classes.brandContainer}>
               

    <img
        src={memories}
        alt="memories"
        height="60"
        className={classes.image}
                />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user ? (<div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName}>{user.result.name}</Typography>
                        <Button variant="contained"  className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (<Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
            </>
  )
}

export default Navbar