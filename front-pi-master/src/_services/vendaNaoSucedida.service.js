import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const vendaNaoSucedidaService = {
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
  return fetch(`${config.apiUrl}/VendaNaoSucedida/ObterTodasVendaNaoSucedida`, requestOptions).then(handleResponse)
}

function register (vendaNaoSucedida) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(vendaNaoSucedida)
  }
  return fetch(`${config.apiUrl}/VendaNaoSucedida/AdicionarNovaVendaNaoSucedida`, requestOptions).then(handleResponse)
}

function update (vendaNaoSucedida) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(vendaNaoSucedida)
  }
  return fetch(`${config.apiUrl}/VendaNaoSucedida/AtualizarVendaNaoSucedida/${vendaNaoSucedida.idVendaNaoSucedida}`, requestOptions).then(handleResponse)
}

function _delete (idVendaNaoSucedida) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/VendaNaoSucedida/ExcluirVendaNaoSucedida/${idVendaNaoSucedida}`, requestOptions).then(handleResponse)
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
