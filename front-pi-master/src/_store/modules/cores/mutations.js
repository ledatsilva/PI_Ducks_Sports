export default {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, cores) {
    state.all = { items: cores }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, cor) {
    state.status = { registering: true }
  },
  registerSuccess (state, cor) {
    state.status = { cor }
  },
  registerFailure (state, error) {
    state.status = { error }
  },
  deleteRequest (state, idCor) {
    state.all.items = state.all.items.map(cor =>
      cor.idCor === idCor
        ? { ...cor, deleting: true }
        : cor
    )
  },
  deleteSuccess (state, cor) {
    state.status = { cor }
  },
  deleteFailure (state, error) {
    state.status = { error }
  }
}
