// import config from 'config'
import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const movimentoService = {
  getAll,
  getAllGrafico,
  getPorVendedor,
  getAllTipoVenda,
  getAllTipoAusencia,
  getGraficoPorId,
  register,
  end,
  update,
  delete: _delete
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Movimento/ObterTodosMovimentos`, requestOptions).then(handleResponse)
}

function getAllGrafico () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Movimento/ObterGrafico`, requestOptions).then(handleResponse)
}

function getPorVendedor (idVendedor) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  }
  return fetch(`${config.apiUrl}/Movimento/ObterMovimentoPorVendedor/${idVendedor}`, requestOptions).then(handleResponse)
}

function getAllTipoVenda () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Movimento/ObterMovimentosTipoVenda`, requestOptions).then(handleResponse)
}

function getAllTipoAusencia () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Movimento/ObterMovimentosTipoAusencia`, requestOptions).then(handleResponse)
}

function register (movimento) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(movimento)
  }
  return fetch(`${config.apiUrl}/Movimento/AdicionarNovoMovimento`, requestOptions).then(handleResponse)
}

function end (movimento) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(movimento)
  }
  return fetch(`${config.apiUrl}/Movimento/FinalizarMovimento`, requestOptions).then(handleResponse)
}

function update (movimento) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(movimento)
  }
  return fetch(`${config.apiUrl}/Movimento/AtualizarMovimento/${movimento.idMovimento}`, requestOptions).then(handleResponse)
}

function _delete (idMovimento) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Movimento/ExcluirMovimento/${idMovimento}`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout()
        location.reload(true)
      } else {
        return data
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}

function getGraficoPorId (idVendedor) {
  console.log('service', idVendedor)
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  }
  return fetch(`${config.apiUrl}/Movimento/ObterGraficoInd/${idVendedor}`, requestOptions).then(handleResponse)
}
