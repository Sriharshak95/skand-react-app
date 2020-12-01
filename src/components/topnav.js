import React from 'react';
import { Navbar,Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authUser } from '../redux-store/action';
import { Link} from 'react-router-dom';
import '../App.css';
import {LogOut} from '../helpers/allstyles';
import cookie from '../helpers/cookie';

function TopNav() {
    const dispatch = useDispatch();
    const removeAuth = () =>{
        cookie.remove('authorization');
        dispatch(authUser(false));
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link className="navbar-brand" to="/home">User Portal</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Link className="btn btn-outline-success" to="/createuser">Create User</Link>
                    <LogOut onClick={removeAuth}>Log Out</LogOut>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNav;
