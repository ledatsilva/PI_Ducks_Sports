import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const tipoService = {
  getAll,
  register,
  update,
  delete: _delete
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Tipo/ObterTodosTipos`, requestOptions).then(handleResponse)
}

function register (tipo) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(tipo)
  }
  return fetch(`${config.apiUrl}/Tipo/AdicionarNovoTipo`, requestOptions).then(handleResponse)
}

function update (tipo) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(tipo)
  }
  return fetch(`${config.apiUrl}/Tipo/AtualizarTipo/${tipo.idTipo}`, requestOptions).then(handleResponse)
}

function _delete (idTipo) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Tipo/ExcluirTipo/${idTipo}`, requestOptions).then(handleResponse)
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
