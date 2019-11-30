import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const vendedorService = {
  getAll,
  getEspera,
  getAtendimento,
  getAusencia,
  register,
  update,
  delete: _delete
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Vendedor/ObterTodosVendedores`, requestOptions).then(handleResponse)
}

function getEspera () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Vendedor/ObterVendedorEmEspera`, requestOptions).then(handleResponse)
}

function getAtendimento () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Vendedor/ObterVendedorEmAtendimento`, requestOptions).then(handleResponse)
}

function getAusencia () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Vendedor/ObterVendedorEmAusencia`, requestOptions).then(handleResponse)
}

function register (vendedor) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(vendedor)
  }
  return fetch(`${config.apiUrl}/Vendedor/AdicionarNovoVendedor`, requestOptions).then(handleResponse)
}

function update (vendedor) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(vendedor)
  }
  return fetch(`${config.apiUrl}/Vendedor/AtualizarVendedor/${vendedor.idVendedor}`, requestOptions).then(handleResponse)
}

function _delete (idVendedor) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Vendedor/ExcluirVendedor/${idVendedor}`, requestOptions).then(handleResponse)
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
