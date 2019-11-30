import { router } from '../../../_helpers'

export default {
  getVendedor (state, vendedor) {
    state.vendedorEdit = vendedor
    router.push('/editarVendedor')
  },
  updateRequest (state, vendedor) {
    state.status = { registering: true }
  },
  updateSuccess (state, vendedor) {
    state.status = {}
  },
  updateFailure (state, vendedor) {
    state.status = {}
  }
}
