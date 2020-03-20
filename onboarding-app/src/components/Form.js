import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';


const UserForm = ({ errors, touched, values, status }) => {

   const [users, setUsers] = useState([]);

   useEffect(() => {
      status && setUsers(users => [...users, status]);
   }, [status]);

   return (
      <div className='form-container'>
         <h1>Sign Up Form</h1>
         <Form>
            <Field type='text' name='name' placeholder='Enter full name' maxlength='30'/>
            {touched.name && errors.name && (
               <p className='error'>{errors.name}</p>
            )}
            <Field type='text' name='email' placeholder='Enter email' maxlength='30'/>
            {touched.email && errors.email && (
               <p className='error'>{errors.email}</p>
            )}
            <Field type='password' name='password' placeholder='Enter password' maxlength='30'/>
            {touched.password && errors.password && (
               <p className='error'>{errors.password}</p>
            )}
            <label className='termsCheckbox' >
               Agree to the terms of service:
               <Field type='checkbox' name='terms' checked={values.terms}/>
               <span className='check' />
            </label>
            <button type='submit'>Submit</button>
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


}) (UserForm);

export default FormikUserForm;