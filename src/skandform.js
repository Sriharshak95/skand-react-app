import React from 'react';
import {Form, Field} from 'formik';
import './App.css';
import {Error} from './allstyles';

function SkandForm({errors,touched,isSubmitting}){
    return(
        <Form>
        <div className="mb-2">
            <label style={styles.label}>Email </label>
            <Field className="form-control" type="email" name="email" />
            {errors.email && touched.email ? (
                <Error>{errors.email}</Error>
            ) : null}
        </div>
        <div className="mb-2">
            <label style={styles.label}>First Name</label>
            <Field className="form-control" type="text" name="first_name" />
            {errors.first_name && touched.first_name ? (
                <Error>{errors.first_name}</Error>
            ) : null}
        </div>
        <div className="mb-2">
            <label style={styles.label}>Last Name</label>
            <Field className="form-control" type="text" name="last_name" />
            {errors.last_name && touched.last_name ? (
                <Error>{errors.last_name}</Error>
            ) : null}
        </div>
        <div className="mb-2">
            <label style={styles.label}>Jobs Count</label>
            <Field className="form-control" type="text" name="jobs_count" />
            {errors.jobs_count && touched.jobs_count ? (
                <Error>{errors.jobs_count}</Error>
            ) : null}
        </div>
        <div className="mb-2">
            <label style={styles.label}>Active</label>
            <Field className="form-control" as="select" name="active">
                <option value="true">True</option>
                <option value="false">False</option>
            </Field>
        </div>
        <div className="mb-2">
            <label style={styles.label}>Slack Username</label>
            <Field type="text" className="form-control" name="slack_username" />
            {errors.slack_username && touched.slack_username ? (
                <Error>{errors.slack_username}</Error>
            ) : null}
        </div>
        <div className="text-center">
        <button className="mt-2 btn btn-outline-primary" type="submit" disabled={isSubmitting}>Submit</button></div>
    </Form>
    )
}

const styles ={
    label:{
        fontSize:15
    }
};

export default SkandForm;