import _ from 'lodash'
import { StoreActionPayload } from '../../_types/storeAction'

export default (
  state: { [key: string]: {} },
  payload: StoreActionPayload
) => {
  const newState = Object.assign({}, state)

  if (Array.isArray(payload)) {
    const arrayToReturn = payload.filter(e => e)

    arrayToReturn.forEach(element => {
      delete newState[element._id]
    })
  } else if (_.isObject(payload)) {
    delete newState[payload._id]
  }

  return newState
}
