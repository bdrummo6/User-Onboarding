import React from 'react';
import { Form, Field } from "formik";

const UserForm = () => {

   return (
      <div className='form-container'>
         <h1>Sign Up Form</h1>
         <Form>
            <Field type='text' name='name' placeholder='Full name' maxlength='30'  />
            <Field type='text' name='email' placeholder='Email' maxlength='30'  />
            <Field type='password' name='password' placeholder='Password' maxlength='30'  />
            <label className='termsCheckbox'>
               Agree to the terms of service:
               <Field type='checkbox' name='terms'/>
            </label>
            <button type='submit'>Submit</button>
         </Form>
      </div>
   )
};


export default UserForm;