export const baseUrl = 'https://api.esto.movie.nomoredomains.xyz';

export const register = (name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
}

export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
}

export const signout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export const authorizate = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}