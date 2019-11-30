export default {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, vendasNaoSucedidas) {
    state.all = { items: vendasNaoSucedidas }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, vendaNaoSucedida) {
    state.status = { registering: true }
  },
  registerSuccess (state, vendaNaoSucedida) {
    state.status = { vendaNaoSucedida }
  },
  registerFailure (state, error) {
    state.status = { error }
  },
  deleteRequest (state, idVendaNaoSucedida) {
    state.all.items = state.all.items.map(vendaNaoSucedida =>
      vendaNaoSucedida.idVendaNaoSucedida === idVendaNaoSucedida
        ? { ...vendaNaoSucedida, deleting: true }
        : vendaNaoSucedida
    )
  },
  deleteSuccess (state, vendaNaoSucedida) {
    state.status = { vendaNaoSucedida }
  },
  deleteFailure (state, error) {
    state.status = { error }
  }
}
