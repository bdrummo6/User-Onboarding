import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

import { Button } from 'reactstrap';

const UserForm = ({ errors, touched, values, status }) => {
   const h1Style = {
      marginTop: '50px',
      fontSize: '2.1rem',
      color: '#191970'
   };

   const formStyle = {
      width: '60%',
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 20% 10px 20%'
   };

   const fieldStyle = {
      width: '40%',
      margin: '10px 30% 5px 30%',
      fontSize: '1.1rem'
   };

   const btnStyle = {
      width: '30%',
      margin: '5px 35% 10px 35%',
      color: 'silver',
      background: '#191970',
      fontWeight: 'bold'
   };

   const checkStyle = {
      marginLeft: '7px'
   };

   const [users, setUsers] = useState([]);
   useEffect(() => {
      status && setUsers(users => [...users, status]);
   }, [status]);

   return (
      <div className='form-container'>
         <h1 style={h1Style}>Sign Up Form</h1>
         <Form style={formStyle}>
            <Field type='text' name='name' placeholder='Full name' maxlength='30' style={fieldStyle} />
            {touched.name && errors.name && (
               <p className='error'>{errors.name}</p>
            )}
            <Field type='text' name='email' placeholder='Email' maxlength='30' style={fieldStyle} />
            {touched.email && errors.email && (
               <p className='error'>{errors.email}</p>
            )}
            <Field type='password' name='password' placeholder='Password' maxlength='30' style={fieldStyle} />
            {touched.password && errors.password && (
               <p className='error'>{errors.password}</p>
            )}
            <label className='termsCheckbox' style={fieldStyle} >
               Agree to the terms of service:
               <Field type='checkbox' name='terms' checked={values.terms}style={checkStyle} />
               <span className='check' />
            </label>
            <Button type='submit' style={btnStyle}>Submit</Button>
         </Form>
         {users.map(user => (
            <div key={user.id}>
               <p>Name: {user.name}</p>
               <p>Email: {user.email}</p>
               <p>Password: {user.password}</p>
            </div>
         ))}
      </div>
   )
};


const FormikUserForm = withFormik ({
   mapPropsToValues({name, email, password, terms}) {
      return {
         name: name || '',
         email: email || '',
         password: password || '',
         terms: terms || false

      };
   },

   validationSchema: Yup.object().shape({
      name: Yup.string().required('Full Name Required!'),
      email: Yup.string().required('Email Required!'),
      password: Yup.string().required('Password Required!')
   }),

   handleSubmit(values, { setStatus }) {
      axios
         .post('https://reqres.in/api/users', values)
         .then(response => {
            setStatus(response.data);
            console.log(response);
         })
         .catch(err => console.log(err.response));
   }

}) (UserForm);

export default FormikUserForm;