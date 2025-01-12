import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";


const FormStyles = styled.div`

.formStyles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30rem;
    height: 30rem;
    border: 1px solid lightgrey;

    .formLabel {
        font-size: 1.5rem;
        font-weight: 900;
        letter-spacing: 3px;
        margin: 10px;
        padding: 5px;
    }

    .formField {
        margin: 5px;
        padding: 5px;
    }

    .tos-container {
        margin: 5px;
        padding: 5px;
    }
    
}


`;



const OnBoardingForm = ({ values, errors, touched, status }) => {
const [users, setUsers] = useState([]);

useEffect( () => {
    status && setUsers(users => [...users, status]);
}, [status] );



    return (
        <FormStyles>
        <div className="formDiv">
        <Form className="formStyles">
        <label className="formLabel">Onboarding</label>
        <Field className="formField" type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}
        
        <Field className="formField" type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="errors">{errors.email}</p>}

        <Field className="formField" type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p className="errors">{errors.password}</p>}

        <label className="tos-container">
        Terms of Service
        <Field type="checkbox" name="tos" checked={values.tos} />
        </label>

        <button as="button" >Submit</button>

        </Form>
        {users.map(user => (
            <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
            </ul>
        ))}
        </div>
        </FormStyles>
    );
};

const FormikOnBoardingForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {

        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape(
        {
            name: Yup.string().required("Please enter your name!"),
            email: Yup.string().required("Please enter your email!"),
            password: Yup.string().required("Please enter your password!")
        }
    ),
    handleSubmit(values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
          console.log(res.data);
        })
        .catch(error => console.log(error.response));

      
    }
})


export default FormikOnBoardingForm(OnBoardingForm);