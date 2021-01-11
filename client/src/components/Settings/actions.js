import service from '../../services/app.service';

export const types = {
  FETCH_DATA_SUCCESS: 'FETCH_DATA',
  FETCH_DATA_START: 'FETCH_DATA_START',
  FETCH_DATA_FAILED: 'FETCH_DATA_FAILED',
  SET_ITEM_TO_EDIT: 'SET_ITEM_TO_EDIT',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  ADD_USER: 'ADD_USER_START',
};

Object.freeze(types);

export function fetchData() {
  return async dispatch => {
    dispatch(fetchDataStart());
    let data = null;

    try {
      data = await service.getUsers();
      dispatch(fetchDataSuccess(data));
    } catch (err) {
      dispatch(fetchDataFailed(err));
    }
  };
}

export function setItemToEdit(item) {
  return dispatch => {
    dispatch({ type: types.SET_ITEM_TO_EDIT, payload: item });
  };
}

export function updateUser(user) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        if (user.email === getState().itemToEdit.email) {
            dispatch(setItemToEdit(null));
            return resolve();
          } else {
            try {
              let updatedUser= null;
              updatedUser = await service.updateUser(user);
              dispatch({ type: types.UPDATE_USER, payload: updatedUser });
              resolve();
            }catch(err) {
              reject(err)
            }
          }
    });
  };
}

export function addUser(user) {
  return (dispatch, getState) => {   
       return service.addUser(user).then((newUser) => {
        dispatch({ type: types.ADD_USER, payload: newUser });
        return newUser;
      });
  };
}

export function deleteUser(id) {
    return async dispatch => {
        let deletedUser = await service.deleteUser(id);
        dispatch({type: types.DELETE_USER, payload: deletedUser});
    }
}

export function fetchDataSuccess(data) {
  return { type: types.FETCH_DATA_SUCCESS, payload: data };
}

export function fetchDataStart() {
  return { type: types.FETCH_DATA_START };
}

export function fetchDataFailed() {
  return { type: types.FETCH_DATA_FAILED };
}
