import { router } from '../../../_helpers'

export default {
  getMovimento (state, movimento) {
    state.movimentoEdit = movimento
    router.push('/editarMovimento')
  },
  getMovimentoView (state, movimento) {
    console.log('aqui')
    state.movimentoEdit = movimento
    router.push('/detalharMovimentoTipoVenda')
  },
  updateRequest (state, movimento) {
    state.status = { registering: true }
  },
  updateSuccess (state, movimento) {
    state.status = {}
  },
  updateFailure (state, movimento) {
    state.status = {}
  }
}
