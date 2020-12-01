import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import './App.css';
import { UserSchema } from './helpers/validationSchema';
import SkandForm from './components/skandform';
import TopNav from './components/topnav';
import Close from './x-mark.png';
import { CloseButton } from './helpers/allstyles';
import UserAlert from './components/useralert';
import { useHistory } from 'react-router-dom';
import cookie from './helpers/cookie';

function CreateUser() {
    const history = useHistory();
    const [alertFlag, setFlag] = useState(false);

    //create user
    const createUserDetail = async (body) => {
        try {
            const response = await fetch('/api/v2/users', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookie.get('authorization')
                }
            });

            const data = await response.json();
            if (data) {
                setFlag(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    // return home page
    const goBack = () => {
        history.push('/home');
    }

    //use custom message for alert
    const customMessage = <div style={{ paddingLeft: 5 }}> New <b>User</b> has been created!</div>;

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
                <UserAlert flag={alertFlag} setFlag={setFlag} message={customMessage} />
            </div>
            <Container className="mt-5">
                <Row>
                    <Col sm={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <div>
                                    <div className="d-flex align-items-center mb-2">
                                        <Card.Title className="mr-auto mb-0">Create User</Card.Title>
                                        <CloseButton onClick={goBack}><img style={{ width: 20 }} alt="default" src={Close} /></CloseButton>
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
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            setTimeout(() => {
                                                (values.active === "true") ? values.active = true : values.active = false;
                                                values.jobs_count = parseInt(values.jobs_count);
                                                values.email = values.email.toLowerCase();
                                                values.slack_username = values.slack_username.toUpperCase();
                                                createUserDetail(values);
                                                setSubmitting(false);
                                                resetForm();
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
