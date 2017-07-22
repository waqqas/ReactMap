import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import AppConfig from "../Config/AppConfig";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setRegion: ['region'],
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  region: AppConfig.initialRegion,
})

/* ------------- Reducers ------------- */

export const setRegion = (state, {region}) => state.merge({region})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_REGION]: setRegion,
})
