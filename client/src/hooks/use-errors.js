import { useContext } from 'react';
import { AppContext } from '../context/auth-context';
import * as actions from '../context/actions';

function useGlobalError() {
  const context = useContext(AppContext);

  function setGlobalError(error) {
    context.dispatch(actions.setError(error));
  }

  return setGlobalError;
}

export default useGlobalError;