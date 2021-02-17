import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'RESET_ADD_ITEM' });
    } catch (error) {
        console.log('Error in adding item to shelf', error);
    };
};

function* shelfSaga() {
    yield takeEvery('ADD_ITEM', addItemSaga);
};

export default shelfSaga;