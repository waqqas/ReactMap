import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPoints: ['region'],
  getPointsSuccess: ['response'],
  getPointsFailure: ['response'],
  resetPoints: null,
  selectPoint: ['point'],
  toggleFavorite: ['point']
})

export const ExploreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  points: [],
  fetching: false,
  error: null,
  selectedPoint: null
})

/* ------------- Reducers ------------- */

export const getPoints = (state) =>
  state.merge({fetching: true})

export const getPointsSuccess = (state, {response}) => {
  const {points} = response.data
  return state.merge({fetching: false, error: null, points})
}

export const getPointsFailure = (state) => state.merge({fetching: false, error: true, points: []})

export const resetPoints = (state) => state.merge({points: []})

export const selectPoint = (state, {point}) => state.merge({selectedPoint: point})

export const toggleFavorite = (state, {point}) => {
  const selectedPoint = _.cloneDeep(state.selectedPoint)

  // #FIXME: point matching
  if (selectedPoint.id === point.id) {
    selectedPoint.iFavorite = !point.isFavorite
  }
  return state.merge({selectedPoint})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POINTS]: getPoints,
  [Types.GET_POINTS_SUCCESS]: getPointsSuccess,
  [Types.GET_POINTS_FAILURE]: getPointsFailure,
  [Types.RESET_POINTS]: resetPoints,
  [Types.SELECT_POINT]: selectPoint,
  [Types.TOGGLE_FAVORITE]: toggleFavorite
})
