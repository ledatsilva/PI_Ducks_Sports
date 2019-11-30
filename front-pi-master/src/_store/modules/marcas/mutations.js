export default {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, marcas) {
    state.all = { items: marcas }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, marca) {
    state.status = { registering: true }
  },
  registerSuccess (state, marca) {
    state.status = { marca }
  },
  registerFailure (state, error) {
    state.status = { error }
  },
  deleteRequest (state, idMarca) {
    state.all.items = state.all.items.map(marca =>
      marca.idMarca === idMarca
        ? { ...marca, deleting: true }
        : marca
    )
  },
  deleteSuccess (state, marca) {
    state.status = { marca }
  },
  deleteFailure (state, error) {
    state.status = { error }
  }
}
