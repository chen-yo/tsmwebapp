import React, { useContext, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { AppContext } from '../../context/auth-context';
import axios from 'axios';
import * as actions from '../../context/actions';


export default function Login() {
  const context = useContext(AppContext);
  const [error, setError] = useState('');

  const onSuccess = Ow => {
    const accessToken = Ow.accessToken;
    console.log(Ow);
    const { email, name, imageUrl } = Ow.profileObj;

    axios
      .post('/api/auth/hasAccess', { email })
      .then(res => {
          context.dispatch(actions.login({ email, name, imageUrl, accessToken }));
      })
      .catch(err =>{
        setError(
          err.response.data.message
        );
      });
  };

  const onFailure = iError => {
    let msg = iError.error + ' ' + iError.details;

    // if user closed the Google Login popup
    if(iError.error === 'popup_closed_by_user') {
      msg = 'Login canceled by user';
    }

    setError(msg);
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <h2>Login</h2>
          <p className="lead mb-3">This app requires Google Login</p>

          <form>
            <div class="form-group" onSubmit={e => e.preventDefault()}>
              <GoogleLogin
                clientId="75271066330-l0l8s4aec6i2athfgals23r46n2rm0u5.apps.googleusercontent.com"
                buttonText="Login"
                scope="email"
                prompt="consent"
                isSignedIn={true}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              />
              {error && (
                <div class="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
