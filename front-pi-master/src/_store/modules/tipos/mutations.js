export default {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, tipos) {
    state.all = { items: tipos }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, tipo) {
    state.status = { registering: true }
  },
  registerSuccess (state, tipo) {
    state.status = { tipo }
  },
  registerFailure (state, error) {
    state.status = { error }
  },
  deleteRequest (state, idTipo) {
    state.all.items = state.all.items.map(tipo =>
      tipo.idTipo === idTipo
        ? { ...tipo, deleting: true }
        : tipo
    )
  },
  deleteSuccess (state, tipo) {
    state.status = { tipo }
  },
  deleteFailure (state, error) {
    state.status = { error }
  }
}
