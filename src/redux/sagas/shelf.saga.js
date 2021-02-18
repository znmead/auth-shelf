import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'RESET_ADD_ITEM' });
        yield put({ type: 'FETCH_ITEMS' });
    } catch (error) {
        console.log('Error in adding item to shelf', error);
    };
};

function* deleteItemSaga(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({ type: 'FETCH_ITEMS' });
    } catch (error) {
        console.log('Error in deleting item from shelf', error);
    };
};

function* shelfSaga() {
    yield takeEvery('ADD_ITEM', addItemSaga);
    yield takeEvery('DELETE_ITEM', deleteItemSaga);
};

export default shelfSaga;