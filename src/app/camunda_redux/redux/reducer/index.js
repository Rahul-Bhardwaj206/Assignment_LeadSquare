import {combineReducers} from 'redux'
import LoginReducer from "../../../redux/reducers/LoginReducer";
import UserReducer from "../../../redux/reducers/UserReducer";
import LayoutReducer from "../../../redux/reducers/LayoutReducer";
import ScrumBoardReducer from "../../../redux/reducers/ScrumBoardReducer";
import NotificationReducer from "../../../redux/reducers/NotificationReducer";
import snackbarReducer from "../ducks/snackbar";

const rootReducer = combineReducers({
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    scrumboard: ScrumBoardReducer,
    notification: NotificationReducer,
    snackbar: snackbarReducer
});

export default rootReducer
