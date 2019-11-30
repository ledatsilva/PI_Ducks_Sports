export default {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, tamanhos) {
    state.all = { items: tamanhos }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, tamanho) {
    state.status = { registering: true }
  },
  registerSuccess (state, tamanho) {
    state.status = { tamanho }
  },
  registerFailure (state, error) {
    state.status = { error }
  },
  deleteRequest (state, idTamanho) {
    state.all.items = state.all.items.map(tamanho =>
      tamanho.idTamanho === idTamanho
        ? { ...tamanho, deleting: true }
        : tamanho
    )
  },
  deleteSuccess (state, tamanho) {
    state.status = { tamanho }
  },
  deleteFailure (state, error) {
    state.status = { error }
  }
}
