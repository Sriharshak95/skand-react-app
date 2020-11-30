import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { singleUser } from './reduximp/action';
import { Formik } from 'formik';
import { useParams, useHistory} from 'react-router-dom';
import './App.css';
import { UserSchema } from './validationSchema';
import SkandForm from './skandform';
import TopNav from './topnav';
import Close from './x-mark.png';
import {CloseButton} from './allstyles';

function UserDetail() {
    const history = useHistory();
    const [isLoaded, setLoaded] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        fetch('/api/v2/users/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '123abc456def789ghi'
            }
        })
            .then(response => response.json())
            .then(data => {
                setLoaded(true);
                for (var key in data.users) {
                    if (data.users[key] === null) {
                        data.users[key] = ""
                    }
                }
                dispatch(singleUser(data.users));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [dispatch,id]);


    const goBack =() =>{
        history.push('/home');
    }

    const empty = (object) => {
        Object.keys(object).forEach(function (k) {
            if (object[k] && typeof object[k] === 'object') {
                return empty(object[k]);
            }
            object[k] = '';
        });
    }


    const editUserDetail = (patchBody) => {
        fetch('/api/v2/users/' + id, {
            method: 'PATCH',
            body: JSON.stringify(patchBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '123abc456def789ghi'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(singleUser(data.users));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <TopNav />
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
                                                alert(JSON.stringify(values, null, 2));
                                                values.email = values.email.toLowerCase();
                                                values.slack_username = values.slack_username.toUpperCase()
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
