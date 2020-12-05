import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
      .required('Required'),
  lastname: Yup.string()
      .required('Required'),
  email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  password: Yup.string()
      .min(5, 'Too short password!')
      .required('Required'),
  repeatPassword: Yup.string()
      .min(5, 'Too short password!')
      .required('Required'),
});

export default function SignUp({cb}) {
  return (
      <div className={'sign-up-box'}>
        <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={cb}
        >
          {({errors, touched}) => (
              <Form className={'form h-100'}>
                <h2>Sign Up</h2>
                <div className="form-group">
                  <Field
                      className={'form-control'}
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder='First Name'
                  />
                  {errors.firstname && touched.firstname ? (
                      <small
                          className="form-text text-muted">{errors.firstname}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <Field
                      className={'form-control'}
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder='Last Name'
                  />
                  {errors.lastname && touched.lastname ? (
                      <small
                          className="form-text text-muted">{errors.lastname}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <Field
                      className={'form-control'}
                      type="email"
                      name="email"
                      id="email"
                      placeholder='Email'
                  />
                  {errors.email && touched.email ? (
                      <small id="emailHelp"
                             className="form-text text-muted">{errors.email}</small>
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
                      <small id="emailHelp"
                             className="form-text text-muted">{errors.password}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <Field
                      className={'form-control'}
                      type="password"
                      name="repeatPassword"
                      id="repeatPassword"
                      placeholder='Repeat Password'
                  />
                  {errors.repeatPassword && touched.repeatPassword ? (
                      <small
                          className="form-text text-muted">{errors.repeatPassword}</small>
                  ) : null}
                </div>
                <button type={'submit'} className={'btn btn-primary'}>Create
                </button>
              </Form>
          )}
        </Formik>
      </div>
  )
}