import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const tamanhoService = {
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
  return fetch(`${config.apiUrl}/Tamanho/ObterTodosTamanhos`, requestOptions).then(handleResponse)
}

function register (tamanho) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(tamanho)
  }
  return fetch(`${config.apiUrl}/Tamanho/AdicionarNovoTamanho`, requestOptions).then(handleResponse)
}

function update (tamanho) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(tamanho)
  }
  return fetch(`${config.apiUrl}/Tamanho/AtualizarTamanho/${tamanho.idTamanho}`, requestOptions).then(handleResponse)
}

function _delete (idTamanho) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Tamanho/ExcluirTamanho/${idTamanho}`, requestOptions).then(handleResponse)
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
