import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const marcaService = {
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
  return fetch(`${config.apiUrl}/Marca/ObterTodasMarcas`, requestOptions).then(handleResponse)
}

function register (marca) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(marca)
  }
  return fetch(`${config.apiUrl}/Marca/AdicionarNovaMarca`, requestOptions).then(handleResponse)
}

function update (marca) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(marca)
  }
  return fetch(`${config.apiUrl}/Marca/AtualizarMarca/${marca.idMarca}`, requestOptions).then(handleResponse)
}

function _delete (idMarca) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Marca/ExcluirMarca/${idMarca}`, requestOptions).then(handleResponse)
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
