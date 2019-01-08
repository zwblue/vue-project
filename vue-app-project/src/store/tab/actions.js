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

const updateLoadedState = (commit, params) => {
  return commit(`fetch/${UPDATE_LOADED_STATE}`, params, { root: true })
}
export default {
  updateLoadedState
}
