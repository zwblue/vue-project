import {
  UPDATE_CONFIG,
  UPDATE_DATA_STATE,
  UPDATE_INTERFACE_PARAMS,
  UPDATE_INTERFACE_STATE,
  UPDATE_LIST_DATA,
  UPDATE_LOADED_STATE,
  UPDATE_LOADING_STATE,
  UPDATE_NATIVE_DATA,
  UPDATE_TAB_INDEX
} from '../../constants/ActionType'

const moduleName = ['fetch', 'config', 'list']

const updateLoadedState = (commit, params) => {
  return commit(`${moduleName[0]}/${UPDATE_LOADED_STATE}`, params, { root: true })
}
const updateDataState = (commit, params) => {
  return commit(`${moduleName[2]}/${UPDATE_DATA_STATE}`, params, { root: true })
}
const updateListData = (commit, params) => {
  return commit(`${moduleName[2]}/${UPDATE_LIST_DATA}`, params, { root: true })
}
const updateLoadingState = (commit, params) => {
  return commit(`${moduleName[2]}/${UPDATE_LOADING_STATE}`, params, { root: true })
}
const updateInterfaceParams = (commit, params) => {
  return commit(`${moduleName[2]}/${UPDATE_INTERFACE_PARAMS}`, params, { root: true })
}
const updateInterfaceState = (commit, params) => {
  return commit(`${moduleName[2]}/${UPDATE_INTERFACE_STATE}`, params, { root: true })
}
export default {
  updateLoadedState,
  updateDataState,
  updateListData,
  updateLoadingState,
  updateInterfaceState,
  updateInterfaceParams
}
