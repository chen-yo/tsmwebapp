import './App.css';
import React, { useContext } from 'react';
import Layout from './components/containers/Layout';
import Filters from './components/Filters/Filters';
import Login from './components/Login/Login';
import { AppContext } from './context/auth-context';
import { Switch, Route, Redirect } from 'react-router-dom';
import Reports from './components/Reports/Reports';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import Settings from './components/Settings/Settings';
import Dashboard from './components/Dashboard/Dashboard';
import { Button, Modal } from 'react-bootstrap';
import * as actions from './context/actions';

function App() {
  const context = useContext(AppContext);

  const { isAuth, error } = context.state;

  let content = (
    <Switch>
      <Route path="/filters" component={Filters}></Route>
      <Route path="/reports" component={UnderConstruction}></Route>
      <Route path="/settings" component={Settings}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/" component={Filters}></Route>
    </Switch>
  );

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <Layout>{content}</Layout>
      {error && <GlobalError error={error} />}
    </>
  );

  function GlobalError({ error }) {
    const { message, statusCode } = error;
    const handleClose = () => {
      context.dispatch(actions.setError(null));
    };
    return (
      <>
        <Modal show={true} onHide={handleClose} animation={true}>
          <Modal.Header closeButton className="text-danger">
            <Modal.Title>Oops, an error occured</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text">
            <p className="text-uppercase">Status code: {statusCode}</p>
            <p className="text-muted fw-light">{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;
