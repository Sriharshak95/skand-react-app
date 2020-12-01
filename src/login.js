import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Spinner, Alert } from 'react-bootstrap';
import { LoginSchema } from './helpers/validationSchema';
import './App.css';
import { Error } from './helpers/allstyles';
import { SubmitButton } from './helpers/allstyles';
import cookie from './helpers/cookie';
import { authUser } from './redux-store/action';
import { useDispatch } from 'react-redux';

function Login() {
    const [responseData, StoreResponse] = useState("");
    const [errorMessage, SetError] = useState(false);
    const [isLoading, SetLoader] = useState(false);
    const dispatch = useDispatch();
    const loginUser = async (body) => {
        SetLoader(true);
        try {
            let response = await fetch('/api/v2/users/tokens', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                SetLoader(false);
                SetError(false);
                cookie.set('authorization', response.headers.map.authorization, { path: '/' });
                dispatch(authUser(true));
            }
            else {
                SetLoader(false);
                SetError(true);
                StoreResponse(JSON.parse(response._bodyInit).message);
            }

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <header className="App-header">
                <h3>Login</h3>
                {(errorMessage) ? <Alert variant="danger">
                    {responseData || ''}
                </Alert> : null}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            loginUser(values);
                            resetForm();
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form className="text-center">
                            <div className="mb-2">
                                <Field className="form-control" placeholder="Email" type="email" name="email" />
                                {errors.email && touched.email ? (
                                    <Error>{errors.email}</Error>
                                ) : null}
                            </div>
                            <div>
                                <Field className="form-control" placeholder="Password" type="password" name="password" />
                                {errors.password && touched.password ? (
                                    <Error>{errors.password}</Error>
                                ) : null}
                            </div>
                            {(isLoading) ? <Spinner animation="border" variant="primary"></Spinner> : <SubmitButton className="mt-2" type="submit" disabled={isSubmitting}>Submit</SubmitButton>}
                        </Form>
                    )}
                </Formik>
            </header>
        </div>
    );
}

export default Login;
