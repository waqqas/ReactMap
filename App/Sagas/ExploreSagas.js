import { call, put } from 'redux-saga/effects'
import ExploreActions from '../Redux/ExploreRedux'
import AppConfig from '../Config/AppConfig'

export function * getPoints (api, action) {
  const { x1, x2, y1, y2 } = action
  const data = {
    radius: AppConfig.defaultRadius,
    types: AppConfig.defaultTypes,
    x1,
    x2,
    y1,
    y2
  }
  // make the call to the api
  const response = yield call(api.getPoiByBbox, data)

  if (response.ok) {
    yield put(ExploreActions.getPointsSuccess(response))
  } else {
    yield put(ExploreActions.getPointsFailure(response))
  }
}
