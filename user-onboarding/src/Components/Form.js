import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const OnBoardingForm = ({values, errors, touched, status}) => {
const [users, setUsers] = useState([]);

useEffect( () => {
    status && setUsers(users => [...users, status]);
}, [status] );



    return (
        <div className="formDiv">
        <Form>
        
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}
        
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="errors">{errors.email}</p>}

        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p className="errors">{errors.password}</p>}


        <button type="button">Submit</button>

        </Form>
        {users.map(user => (
            <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
            </ul>
        ))}
        </div>
    )
}

const FormikOnBoardingForm = withFormik({
    mapPropsToValues({ name, email, password }) {

        return {
            name: name || "",
            email: email || "",
            password: password || ""
        };
    },

    validationSchema: Yup.object().shape(
        {
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        }
    ),
    handleSubmit(values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(response => {
            setStatus(response.data);
        })
        .catch(error => console.log(error.response));
    }
})

export default FormikOnBoardingForm(OnBoardingForm);