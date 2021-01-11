import { useEffect, useState, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import classnames from 'classnames';
import './Settings.css';
import Spinner from '../UI/Spinner/Spinner';
import useOutsideAlerter from '../../hooks/outside-alerter';
import * as Yup from 'yup';
import { Table } from 'react-bootstrap';
import { fetchData, setItemToEdit, updateUser, deleteUser } from './actions';
import { useThunkReducer } from 'react-hook-thunk-reducer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initState, reducer } from './reducer';
import AddNewUser from './AddNewUser';

export default function Settings() {
  const [state, dispatch] = useThunkReducer(reducer, initState);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  let content = null;

  if (state.isLoading) {
    content = (
      <div className="row justify-content-center align-content-center">
        <Spinner />
      </div>
    );
  } else {
    content = (
      <Table striped bordered hover className="users-table">
        <tbody>
          {state.data.map((item, index) =>
            state.itemToEdit && item.email === state.itemToEdit.email ? (
              <EditItem state={state} dispatch={dispatch} key={item.id} />
            ) : (
              <RowItem
                state={state}
                dispatch={dispatch}
                item={item}
                key={item.id}
              />
            )
          )}
        </tbody>
      </Table>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <AddNewUser dispatch={dispatch} />
        </Col>
      </Row>
      <Row>
        <Col>{content}</Col>
      </Row>
    </Container>
  );
}

function EditItem({ dispatch, state }) {
  const tref = useRef(null);
  useOutsideAlerter(tref, () => dispatch(setItemToEdit(null)));
 
  const editRecord = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  });

  const onSubmit = async (values, actions) => {

    const updatedUser = {
      id: state.itemToEdit.id,
      ...values
    };

    dispatch(updateUser(updatedUser))
    .catch(err=>actions.setErrors(err.response.data.errors))
  }



  const userInput = (
    <Formik
      initialValues={{
        email: state.itemToEdit.email
      }}
      validationSchema={editRecord}
      onSubmit={onSubmit}
    >
      {({ submitForm, errors, touched, isSubmitting }) => {
        return (
          <>
            <td>
              <Form noValidate>
                <Field
                  className={classnames('form-control', {
                    'is-invalid': errors.email && touched.email
                  })}
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                <ErrorMessage name="email">
                  {message => (
                    <span className="invalid-feedback">{message}</span>
                  )}
                </ErrorMessage>
              </Form>
            </td>
            <td>
              <a
                name=""
                id=""
                class="btn btn-light"
                href="#"
                role="button"
                type="submit"
                onClick={() => submitForm()}
              >
                <i class="far fa-save"></i> Save{' '}
              </a>
            </td>
          </>
        );
      }}
    </Formik>
  );

  return (
    <tr ref={tref}>

        {userInput}
    
    </tr>
  );
}

function RowItem({ item, dispatch }) {
  const onDelete = () => {
    const shouldDelete = window.confirm('Are you sure?');
    if (!shouldDelete) return;
    dispatch(deleteUser(item.id));
  };

  return (
    <tr>
      <td>{item.email}</td>
      <td>
        <i
          class="far fa-trash-alt btn btn-light mr-1"
          onClick={() => onDelete()}
        ></i>
        <i
          class="far fa-edit btn btn-light"
          onClick={() => dispatch(setItemToEdit(item))}
        ></i>
      </td>
    </tr>
  );
}
