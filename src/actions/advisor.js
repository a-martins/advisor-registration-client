import api from './api';

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
};

const formateData = data => ({
    ...data,
    registryNumber: parseInt(data.registryNumber ? data.registryNumber : 0)
});

export const fetchAll = () => dispatch => {
    api.advisor()
        .fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPE.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err));
};

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data);
    api.advisor()
        .create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPE.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err));
};

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data);
    api.advisor()
        .update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPE.UPDATE,
                payload: {
                    id,
                    ...data
                }
            });
            onSuccess();
        })
        .catch(err => console.log(err));
};

export const Delete = (id, onSuccess) => dispatch => {
    api.advisor()
        .delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPE.DELETE,
                payload: id
            });
            onSuccess();
        })
        .catch(err => console.log(err));
};