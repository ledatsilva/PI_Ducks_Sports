export default {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, vendedores) {
    state.all = { items: vendedores }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  getEsperaRequest (state) {
    state.espera = { loading: true }
  },
  getEsperaSuccess (state, vendedores) {
    state.espera = { items: vendedores }
  },
  getEsperaFailure (state, error) {
    state.espera = { error }
  },
  getAtendimentoRequest (state) {
    state.atendimento = { loading: true }
  },
  getAtendimentoSuccess (state, vendedores) {
    state.atendimento = { items: vendedores }
  },
  getAtendimentoFailure (state, error) {
    state.atendimento = { error }
  },
  getAusenciaRequest (state) {
    state.ausencia = { loading: true }
  },
  getAusenciaSuccess (state, vendedores) {
    state.ausencia = { items: vendedores }
  },
  getAusenciaFailure (state, error) {
    state.ausencia = { error }
  },
  updateEsperaAtendimentoRequest (state) {
    state.status = { updating: true }
  },
  updateEsperaAtendimentoSuccess (state, vendedor) {
    state.status = { vendedor }
  },
  updateEsperaAtendimentoFailure (state, error) {
    state.status = { error }
  },
  updateEsperaAusenciaRequest (state) {
    state.status = { updating: true }
  },
  updateEsperaAusenciaSuccess (state, vendedor) {
    state.status = { vendedor }
  },
  updateEsperaAusenciaFailure (state, error) {
    state.status = { error }
  },
  deleteRequest (state, idVendedor) {
    state.all.items = state.all.items.map(vendedor =>
      vendedor.idVendedor === idVendedor
        ? { ...vendedor, deleting: true }
        : vendedor
    )
  },
  deleteSuccess (state, vendedor) {
    state.status = { vendedor }
  },
  deleteFailure (state, error) {
    state.status = { error }
  }
}
