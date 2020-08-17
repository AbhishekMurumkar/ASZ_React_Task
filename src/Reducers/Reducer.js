import initialState from '../Store/Store';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Add_NEW_USER':
            return {
                ...state,
                usersList: [...state.usersList, action.newUser]
            }
        case 'UPDATE_USER':
            return {
                ...state,
                usersList: action.Users
            }
        case 'Add_NEW_TODO':
            return {
                ...state,
                todoList: [...state.todoList, action.newTodo]
            }
        default:
            return state;
    }
}

export default reducer;