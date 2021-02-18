import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchItems() {
  try {
    /*const config = {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    }*/
    const itemsResponse = yield axios.get('/api/shelf');
    yield put({ type: 'SET_SHELF', payload: itemsResponse.data });
  } catch (error) {
    console.log(`Error getting items`)
  }
}
function* getItemSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
}


export default getItemSaga;