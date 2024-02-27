import { searchError, searchLoading, searchSuccess } from "../slice/searchSlice"
import { take, put, spawn, takeLatest, retry} from 'redux-saga/effects';

async function searchItems(search) {
  const params = new URLSearchParams({q: search});
  const response = await fetch(`http://localhost:7070/api/search?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json();
}

function* handleSearchItemsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data = yield retry(retryCount, retryDelay, searchItems, action.payload);
    yield put(searchSuccess(data));
  } catch (error) {
    yield put(searchError(error.message))
  }
}

function* watchChangeSearchSaga() {
  while(true) {
    const action = yield take('search/changeSearchField');
    yield put(searchLoading(action.payload))
  }
}

function* watchSearchLoadingSaga() {
  while(true) {
    yield take('search/searchLoading');
    yield takeLatest('search/searchLoading', handleSearchItemsSaga)
  }
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchSearchLoadingSaga)
}