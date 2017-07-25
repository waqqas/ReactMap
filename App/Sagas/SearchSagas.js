import {call, put} from "redux-saga/effects";
import SearchActions from "../Redux/SearchRedux";

export function* searchPoints(api, {searchTerm}) {

  const response = yield call(api.searchPoints, searchTerm)

  console.log('response: ', response)

  if (response.ok) {
    yield put(SearchActions.searchPointsSuccess(response))
  } else {
    yield put(SearchActions.searchPointsFailure(response))
  }
}
