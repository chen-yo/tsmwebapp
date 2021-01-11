import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { addUser } from './actions';
import useGlobalError from '../../hooks/use-errors';

export default function AddNewUser({ dispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  const reportError = useGlobalError();

  const editRecord = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  });

  async function onSubmit(values, actions) {
    const newUser = {
      ...values
    };

    setIsLoading(true);
    dispatch(addUser(newUser))
      .then(() => {
        actions.resetForm({
          values: {
            email: ''
          }
        });
      })
      .catch(err => {
        if (err.response.data.errors) {
          actions.setErrors(err.response.data.errors);
        } else {
          // unexpected - probably server error such as 500 
          reportError(err.response.data)
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={editRecord}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, isSubmitting }) => {
        return (
          <div className="add-user">
            <Form noValidate inline className="mb-4">
              <Form.Label htmlFor="email" className="mr-2">
                Email
              </Form.Label>
              <Field
                as={Form.Control}
                className={classnames('form-control', {
                  'is-invalid': errors.email && touched.email
                })}
                id="email"
                name="email"
                placeholder="name@tsm.com"
                type="email"
              />
              <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                {isLoading && (
                  <span
                    class="spinner-border spinner-border-sm mr-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Add
              </Button>
              <ErrorMessage name="email">
                {message => <span className="invalid-feedback">{message}</span>}
              </ErrorMessage>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
