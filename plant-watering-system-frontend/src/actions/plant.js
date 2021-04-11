import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    UPDATE_WATERING_STATUS: 'UPDATE_WATERING_STATUS'
}

const convertDateFromJS = jSdate => {
     const newDate = jSdate.toISOString();
     console.log(newDate);
     return newDate;
}

export const fetchAll = () => dispatch => {
    api.plants()
    .fetchAll()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    })
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    // lastWateredTime will be always set on the server. Ignore below line.
    data.lastWateredTime = convertDateFromJS(data.lastWateredTime);
    api.plants().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    // lastWateredTime will be always set on the server. Ignore below line.
    data.lastWateredTime = convertDateFromJS(data.lastWateredTime);
    api.plants().update(id, data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id, ...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.plants().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const updateWateringStatus = (updates, onSuccess, onFailure) => dispatch => {
    api.plants().updateWateringStatus(updates)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE_WATERING_STATUS,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => { 
        console.log(err);
        onFailure(); 
    })
}