import { vendedorService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    vendedorService.getAll()
      .then(
        vendedores => commit('getAllSuccess', vendedores),
        error => commit('getAllFailure', error)
      )
  },
  getEspera ({ commit }) {
    commit('getEsperaRequest')
    vendedorService.getEspera()
      .then(
        vendedores => commit('getEsperaSuccess', vendedores),
        error => commit('getEsperaFailure', error)
      )
  },
  getAtendimento ({ commit }) {
    commit('getAtendimentoRequest')
    vendedorService.getAtendimento()
      .then(
        vendedores => commit('getAtendimentoSuccess', vendedores),
        error => commit('getAtendimentoFailure', error)
      )
  },
  getAusencia ({ commit }) {
    commit('getAusenciaRequest')
    vendedorService.getAusencia()
      .then(
        vendedores => commit('getAusenciaSuccess', vendedores),
        error => commit('getAusenciaFailure', error)
      )
  },
  register ({ dispatch, commit }, vendedor) {
    commit('registerRequest', vendedor)
    vendedorService.register(vendedor)
      .then(
        vendedor => {
          commit('registerSuccess', vendedor)
          router.push('/vendedores')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            vendedorService.getAll()
              .then(
                vendedores => commit('getAllSuccess', vendedores),
                error => commit('getAllFailure', error)
              )
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  updateEsperaAtendimento ({ dispatch, commit }, vendedor) {
    commit('updateEsperaAtendimentoRequest', vendedor)
    vendedorService.update(vendedor)
      .then(
        vendedor => {
          commit('updateEsperaAtendimentoSuccess', vendedor)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getEsperaRequest')
            vendedorService.getEspera()
              .then(
                vendedors => commit('getEsperaSuccess', vendedors),
                error => commit('getEsperaFailure', error)
              )
            commit('getAtendimentoRequest')
            vendedorService.getAtendimento()
              .then(
                vendedors => commit('getAtendimentoSuccess', vendedors),
                error => commit('getAtendimentoFailure', error)
              )
          })
        },
        error => {
          commit('updateEsperaAtendimentoFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  updateEsperaAusencia ({ dispatch, commit }, vendedor) {
    commit('updateEsperaAusenciaRequest', vendedor)
    vendedorService.update(vendedor)
      .then(
        vendedor => {
          commit('updateEsperaAusenciaSuccess', vendedor)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getEsperaRequest')
            vendedorService.getEspera()
              .then(
                vendedors => commit('getEsperaSuccess', vendedors),
                error => commit('getEsperaFailure', error)
              )
            commit('getAusenciaRequest')
            vendedorService.getAusencia()
              .then(
                vendedors => commit('getAusenciaSuccess', vendedors),
                error => commit('getAusenciaFailure', error)
              )
          })
        },
        error => {
          commit('updateEsperaAusenciaFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  delete ({ dispatch, commit }, id) {
    commit('deleteRequest', id)
    vendedorService.delete(id)
      .then(
        vendedor => {
          commit('deleteSuccess', vendedor)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            commit('getAllRequest')
            vendedorService.getAll()
              .then(
                vendedores => commit('getAllSuccess', vendedores),
                error => commit('getAllFailure', error)
              )
          })
        },
        error => {
          commit('deleteFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  }
}
