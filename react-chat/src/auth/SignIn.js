import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import './sign-in.scss';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  password: Yup.string()
      .min(5, 'Too short password!')
      .required('Required'),
});


export default function SignIn({cb}) {

  //let { from } = location.state || { from: { pathname: "/" } };

  function submitHandler(userData) {
    cb(userData);
  }

  return (
      <div className={'h-100 sign-in-box'}>
        <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={SigninSchema}
            onSubmit={submitHandler}
        >
          {({errors, touched}) => (
              <Form className={'form h-100'}>
                <h2>Log In</h2>
                <div className="form-group">
                  <Field
                      className={'form-control'}
                      type="email"
                      name="email"
                      id="email"
                      placeholder='Email'
                  />
                  {errors.email && touched.email ? (
                      <small id="emailHelp" className="form-text text-muted">{errors.email}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <Field
                      className={'form-control'}
                      type="password"
                      name="password"
                      id="password"
                      placeholder='Password'
                  />
                  {errors.password && touched.password ? (
                      <small id="emailHelp" className="form-text text-muted">{errors.password}</small>
                  ) : null}
                </div>
                <button type={'submit'} className={'btn btn-primary'}>login
                </button>
              </Form>
          )}
        </Formik>
      </div>
  )
}