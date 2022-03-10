import * as localState from '../localState'
import * as types from '../../../API/resource/types'

it(`saves/gets the state of some resource to/from localStorage`, () => {
  const date = new Date()
  const createdAt = date.toISOString()
  const updatedAt = date.toISOString()

  const resourceId = `test-resource-id`
  const resource: types.Props = {
    id: resourceId,
    createdAt,
    updatedAt
  }

  // save the state
  localState.set<types.Props>(`resources`, `resourceId`, resource)

  // get the saved state
  const savedState = localState.get<types.Props>(`resources`, `resourceId`)

  // confirm the saved state matches the original state
  expect(savedState).toMatchObject(resource)
})
