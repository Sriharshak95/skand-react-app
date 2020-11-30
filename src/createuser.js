import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import './App.css';
import { UserSchema } from './validationSchema';
import SkandForm from './skandform';
import TopNav from './topnav';
import Close from './x-mark.png';
import {CloseButton} from './allstyles';
import { useHistory } from 'react-router-dom';

function CreateUser() {
    const history = useHistory();
    const createUserDetail = (body) => {
        fetch('/api/v2/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '123abc456def789ghi'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const goBack =() =>{
        history.push('/home');
    }
    return (
        <div>
            <TopNav />
            <Container className="mt-5">
                <Row>
                    <Col sm={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <div>
                                    <div className="d-flex align-items-center mb-2">
                                        <Card.Title className="mr-auto mb-0">Create User</Card.Title>
                                        <CloseButton onClick={goBack}><img style={{width:20}} src={Close}/></CloseButton>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            "email": "",
                                            "first_name": "",
                                            "last_name": "",
                                            "jobs_count": "",
                                            "active": false,
                                            "slack_username": ""
                                        }}
                                        validationSchema={UserSchema}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                (values.active === "true") ? values.active = true : values.active = false;
                                                values.jobs_count = parseInt(values.jobs_count);
                                                createUserDetail(values);
                                                values.email = values.email.toLowerCase();
                                                values.slack_username = values.slack_username.toUpperCase();
                                                alert(JSON.stringify(values, null, 2));
                                                setSubmitting(false);
                                            }, 400);
                                        }}
                                    >
                                        {({ isSubmitting, errors, touched }) => (
                                            <SkandForm isSubmitting={isSubmitting} touched={touched} errors={errors} />
                                        )}
                                    </Formik>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateUser;
