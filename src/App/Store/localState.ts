/**
 * Gets the saved local state of some resource from `localStorage`.
 */
export const get = <State extends { id: string } | null>(statePath: string, idKey: string): State => {
  const id = window.localStorage.getItem(idKey)
  let localState = id && window.localStorage.getItem(`${statePath}/${id}`)

  if (localState) {
    try {
      localState = JSON.parse(localState)
    } catch (error) {
    }
  }

  return localState as State
}

/**
 * Saves the state of some resource to `localStorage`.
 */
export const set = <State extends { id: string } | null>(statePath: string, idKey: string, state: State): void => {
  try {
    if (state?.id) {
      window.localStorage.setItem(idKey, state.id)
      window.localStorage.setItem(`${statePath}/${state.id}`, JSON.stringify(state))
    } else {
      window.localStorage.removeItem(idKey)
    }
  } catch (error) {
  }
}
