import * as InitiateActions from './backend-rest/initiate-data';

export const loadContactDetails = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getContactData())
};
export const loadTickets = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getTickets())
};
export const loadPropertiesData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getProperties())
};
