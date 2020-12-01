import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { storeData } from './redux-store/action';
import { useHistory } from 'react-router-dom';
import './App.css';
import TopNav from './components/topnav';
import Page from './components/page';
import { StyledButton } from './helpers/allstyles';
import cookie from './helpers/cookie';

//list all users
function ListUser() {
    const [isLoaded, setLoaded] = useState(false);
    const [,setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [,postPerPage] = useState(4);
    const users = useSelector(state => state.users);
    const [emailFilter, SetEmailFilter] = useState("");
    const [activeFilter, SetActiveFilter] = useState("");
    const [tempUser, setTempUser] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function listUser(){
            try{
                const response = await fetch('/api/v2/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookie.get('authorization')
                    }
                });
                const data = await response.json();
                if(data){
                    setLoaded(true);
                    dispatch(storeData(data.users));
                    let paginateData = data.users.slice(startIndex, postPerPage);
                    setTempUser(paginateData);
                }
            }catch(e){
                console.log(e);
            }
        }

        listUser();

    }, [dispatch,postPerPage,startIndex]);

    //filter table function for active and email columns
    const filterTable = (filter) => {
        if (filter.target.name === "email_filter") {

            SetEmailFilter(filter.target.value);
            if (filter.target.value.replace(/\s+/g, '') === "" && activeFilter.replace(/\s+/g, '') === "") {
                setTempUser(users.slice(0,postPerPage));
                setStartIndex(postPerPage);
            }
            if (filter.target.value.replace(/\s+/g, '') !== "" && activeFilter.replace(/\s+/g, '') === "") {
                setTempUser(users.filter(user => user.email.indexOf(filter.target.value) > -1));
            }
            if (filter.target.value.replace(/\s+/g, '') === "" && activeFilter.replace(/\s+/g, '') !== "") {
                setTempUser(users.filter(user => user.email.indexOf(filter.target.value) > -1));
            }
            if (filter.target.value.replace(/\s+/g, '') !== "" && activeFilter.replace(/\s+/g, '') !== "") {
                let user1 = users.filter(user => user.email.indexOf(filter.target.value) > -1);
                let user2 = users.filter(user => user.active.toString().indexOf(activeFilter) > -1);
                setTempUser(user1.filter(data1 => user2.some(data2 => data1.id === data2.id)));
            }
        }
        if (filter.target.name === "active_filter") {

            SetActiveFilter(filter.target.value);
            if (filter.target.value.replace(/\s+/g, '') === "" && emailFilter.replace(/\s+/g, '') === "") {
                setTempUser(users.slice(0,postPerPage));
                setStartIndex(postPerPage);
            }
            if (filter.target.value.replace(/\s+/g, '') !== "" && emailFilter.replace(/\s+/g, '') === "") {
                setTempUser(users.filter(user => user.active.toString().indexOf(filter.target.value) > -1));
            }
            if (filter.target.value.replace(/\s+/g, '') === "" && emailFilter.replace(/\s+/g, '') !== "") {
                setTempUser(users.filter(user => user.active.toString().indexOf(filter.target.value) > -1));
            }
            if (filter.target.value.replace(/\s+/g, '') !== "" && emailFilter.replace(/\s+/g, '') !== "") {
                let user1 = users.filter(user => user.email.indexOf(emailFilter) > -1);
                let user2 = users.filter(user => user.active.toString().indexOf(filter.target.value) > -1);
                setTempUser(user1.filter(data1 => user2.some(data2 => data1.id === data2.id)));
            }
        }
    }

    //delete user
    const deleteUser = async(id) => {
        try{
            const response = await fetch('/api/v2/users/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookie.get('authorization')
                }
            });

            const data = await response.json()
            if(data){
                const filteredItems = tempUser.filter(item=>item.id!==id);
                dispatch(setTempUser(filteredItems));
            }
        }catch(e){
            console.log(e);
        }
    }

    //get Current posts
    if (isLoaded) {
    }

    // Switch Pagination page
    const paginate = (pageNumber) => {
        if(users.length>0){
            let startNumber = (pageNumber - 1) * postPerPage;
            let endNumber = Math.min(startNumber + postPerPage - 1, users.length - 1);
            let paginateUserData = users.slice(startNumber,endNumber+1);
            setTempUser(paginateUserData);
            setCurrentPage(pageNumber)
        }
        
    };

    return (
        <div>
            <TopNav />
            <Container className="mt-5">
                <h4>Users Index</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email
                            <div><input type="text" name="email_filter" placeholder="Email Filter" onChange={(e) => filterTable(e)} /></div></th>
                            <th>Jobs Count</th>
                            <th>Active
                            <div><input type="text" name="active_filter" placeholder="Active Filter" onChange={(e) => filterTable(e)} /></div>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (isLoaded) ?
                                tempUser.map((item, index) => {
                                    return <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.jobs_count}</td>
                                        <td>{item.active ? "True" : "False"}</td>
                                        <td><StyledButton bg="#fcfcfc" border="#757575" onClick={() => history.push('/user/' + item.id)}>Edit</StyledButton><StyledButton bg="#fcfcfc" border="#d43c3c" onClick={() => deleteUser(item.id)}>Delete</StyledButton></td>
                                    </tr>
                                }) : null
                        }
                    </tbody>
                </Table>
                {(isLoaded) ?
                    <Page postPerPage={postPerPage} paginate={paginate} totalPosts={users.length} /> : null}
            </Container>
        </div>
    );
}


export default ListUser;
