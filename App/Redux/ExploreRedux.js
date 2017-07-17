import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPoints: ['x1', 'x2', 'y1', 'y2'],
  getPointsSuccess: ['response'],
  getPointsFailure: ['response'],
})

export const ExploreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  points: [],
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

export const getPoints = (state, { username }) =>
  state.merge({ fetching: true, username, avatar: null })

export const getPointsSuccess = (state, {response}) => {
  const { points } = response.data
  return state.merge({ fetching: false, error: null, points })
}

export const getPointsFailure = (state) =>
  state.merge({ fetching: false, error: true, points: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POINTS]: getPoints,
  [Types.GET_POINTS_SUCCESS]: getPointsSuccess,
  [Types.GET_POINTS_FAILURE]: getPointsFailure
})
