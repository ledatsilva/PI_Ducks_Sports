import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const corService = {
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
  return fetch(`${config.apiUrl}/Cor/ObterTodasCores`, requestOptions).then(handleResponse)
}

function register (cor) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(cor)
  }
  return fetch(`${config.apiUrl}/Cor/AdicionarNovaCor`, requestOptions).then(handleResponse)
}

function update (cor) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(cor)
  }
  return fetch(`${config.apiUrl}/Cor/AtualizarCor/${cor.idCor}`, requestOptions).then(handleResponse)
}

function _delete (idCor) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Cor/ExcluirCor/${idCor}`, requestOptions).then(handleResponse)
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
