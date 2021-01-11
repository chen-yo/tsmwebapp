import React, { useContext } from 'react';
import { AppContext } from '../../context/auth-context';
import { GoogleLogout } from 'react-google-login';
import * as actions from '../../context/actions';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './UserBar.css';

export default function UserBar() {
  const context = useContext(AppContext);
  const { email, imageUrl, name } = context.state;

  return (
    <Nav className="d-flex align-items-center text-white user">
      <OverlayTrigger
        placement="bottom-start"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="button-tooltip">{email}</Tooltip>}
      >
        <div>
          <img
            className="rounded-circle mr-2"
            src={imageUrl}
            alt="user image"
          />
          <span className="mr-3">{name}</span>
        </div>
      </OverlayTrigger>
      <GoogleLogout
        clientId="75271066330-l0l8s4aec6i2athfgals23r46n2rm0u5.apps.googleusercontent.com"
        render={renderProps => {
          return <Nav.Link onClick={renderProps.onClick}>Logout</Nav.Link>;
        }}
        onLogoutSuccess={() => context.dispatch(actions.logut())}
        onFailure={() => console.error('Failed to logout from Google')}
      ></GoogleLogout>
    </Nav>
  );
}
