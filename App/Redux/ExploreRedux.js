import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import _ from "lodash";
import AppConfig from "../Config/AppConfig";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPoints: ['region'],
  getPointsSuccess: ['response'],
  getPointsFailure: ['response'],
  setRegion: ['region'],
  resetPoints: null
})

export const ExploreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  points: [],
  region: AppConfig.initialRegion,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

export const getPoints = (state) =>
  state.merge({fetching: true})

export const getPointsSuccess = (state, {response}) => {
  const {points} = response.data
  return state.merge({fetching: false, error: null, points})
}

export const getPointsFailure = (state) =>
  state.merge({fetching: false, error: true, points: []})

export const setRegion = (state, {region}) => state.merge({region})

export const resetPoints = (state) => state.merge({points:[]})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POINTS]: getPoints,
  [Types.GET_POINTS_SUCCESS]: getPointsSuccess,
  [Types.GET_POINTS_FAILURE]: getPointsFailure,
  [Types.SET_REGION]: setRegion,
  [Types.RESET_POINTS]: resetPoints
})
