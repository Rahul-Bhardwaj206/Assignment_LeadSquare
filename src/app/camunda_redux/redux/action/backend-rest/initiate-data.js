import * as AT from '../../constants/ActionTypes'
import {BACK_API} from '../../../../middleware/backend';

export const getContactData = () => ({
    [BACK_API]: {
        types: [ AT.CONTACT_DETAILS_REQUEST, AT.CONTACT_DETAILS_SUCCESS, AT.CONTACT_DETAILS_FAILURE ],
        endpoint: `/employees`,
        settings: {
            method: 'GET',
            headers: {}
        }
    }
})

export const getTickets = () => ({
    [BACK_API]: {
        types: [ AT.TICKETS_REQUEST, AT.TICKETS_SUCCESS, AT.TICKETS_FAILURE ],
        endpoint: `/tickets`,
        settings: {
            method: 'GET',
            headers: {}
        }
    }
})

export const getProperties = () => ({
    [BACK_API]: {
        types: [ AT.PROPERTIES_REQUEST, AT.PROPERTIES_SUCCESS, AT.PROPERTIES_FAILURE ],
        endpoint: `/properties`,
        settings: {
            method: 'GET',
            headers: {}
        }
    }
})
