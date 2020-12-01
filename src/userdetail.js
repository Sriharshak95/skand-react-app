import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { singleUser } from './redux-store/action';
import { Formik } from 'formik';
import { useParams, useHistory} from 'react-router-dom';
import './App.css';
import { UserSchema } from './helpers/validationSchema';
import SkandForm from './components/skandform';
import TopNav from './components/topnav';
import Close from './x-mark.png';
import UserAlert from './components/useralert';
import {CloseButton} from './helpers/allstyles';
import cookie from './helpers/cookie';

function UserDetail() {
    const history = useHistory();
    const [alertFlag, setFlag] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        //list all the users
        async function listUserDetail(){
            try{
                const response = await fetch('/api/v2/users/' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookie.get('authorization')
                    }
                });
                const data = await response.json();
                if(data){
                    setLoaded(true);
                    for (var key in data.users) {
                        if (data.users[key] === null) {
                            data.users[key] = ""
                        }
                    }
                    if(data.users.active){
                        dispatch(singleUser({...data.users,active:'true'}));
                    }
                    else{
                        dispatch(singleUser({...data.users,active:'false'}));
                    }
                }
            }catch(e){
                console.log(e);
            }
    
        }

        listUserDetail();
    }, [dispatch,id]);


    const goBack =() =>{
        history.push('/home');
    }

    //empty values for form initialisation
    const empty = (object) => {
        Object.keys(object).forEach(function (k) {
            if (object[k] && typeof object[k] === 'object') {
                return empty(object[k]);
            }
            object[k] = '';
        });
    }

    // update user details
    const editUserDetail = async(patchBody) =>{
            try{
                const response = await fetch('/api/v2/users/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(patchBody),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookie.get('authorization')
                    }
                });
                const data = await response.json();
                if(data){
                    console.log(data);
                    dispatch(singleUser(data.users));
                }
            }catch(e){
                console.log(e);
            }
    }

    //custom display message on update user
    const customMessage = <div style={{paddingLeft:5}}> <b>User</b> details has been updated!</div>;

    return (
        <div>
            <TopNav />
            <div
                style={{
                    position: 'absolute',
                    top: 70,
                    right: 30
                }}
            >
            <UserAlert flag={alertFlag} setFlag={setFlag} message={customMessage}/>
            </div>
            <Container className="mt-4">
                <Row>
                    <Col className="mx-auto" sm={6}>
                        <Card>
                            <Card.Body>{(isLoaded && Object.keys(user).length !== 0) ?
                                <div>
                                <div className="d-flex align-items-center mb-2">
                                    <Card.Title className="mr-auto mb-0">Edit User Details</Card.Title>
                                    <CloseButton onClick={goBack}><img style={{width:20}} alt="close" src={Close}/></CloseButton>
                                </div>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={user || empty(user)}
                                        validationSchema={UserSchema}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                (values.active === "true") ? values.active = true : values.active = false;
                                                editUserDetail(values);
                                                values.email = values.email.toLowerCase();
                                                values.slack_username = values.slack_username.toUpperCase();
                                                setFlag(true);
                                                setSubmitting(false);
                                            }, 400);
                                        }}
                                    >
                                        {({ isSubmitting, touched, errors }) => (
                                            <SkandForm isSubmitting={isSubmitting} touched={touched} errors={errors} />
                                        )}
                                    </Formik>
                                </div> : null}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserDetail;
