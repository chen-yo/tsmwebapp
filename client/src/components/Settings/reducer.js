import { types } from './actions';

export const initState = {
  itemToEdit: null,
  data: [],
  isLoading: false
};

export function reducer(state, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        itemToEdit: null,
        isLoading: false
      };
    }

    case types.FETCH_DATA_START: {
      return {
        ...state,
        data: [],
        isLoading: true
      };
    }

    case types.FETCH_DATA_FAILED: {
      return {
        ...state,
        data: [],
        isLoading: false
      };
    }
    case types.SET_ITEM_TO_EDIT: {
        console.log('ItemToEdit changed: ', state.itemToEdit)
      return {
        ...state,
        itemToEdit: action.payload
      };
    }

    case types.UPDATE_USER: {
      let updatedUser = action.payload;

      const index = state.data.findIndex(u => u.id === updatedUser.id);
      const newData = [...state.data];
      newData[index] = updatedUser;

      return {
        ...state,
        itemToEdit: null,
        data: newData
      };
    }

    case types.DELETE_USER: {
      let deletedUser = action.payload;
      return {
        ...state,
        data: state.data.filter(user=>user.id !== deletedUser.id)
      };
    }

    case types.ADD_USER: {
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    }

    default:
      return state;
  }
}
