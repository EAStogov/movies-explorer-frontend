export const baseUrl = 'https://api.esto.movie.nomoredomains.xyz';

function _makeRequest(promise) {
  return promise
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              return Promise.reject(res);
            }
          })
}

export const register = (name, email, password) => {
  return _makeRequest(fetch(`${baseUrl}/signup`, {
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
  }))
}

export const login = (email, password) => {
  return _makeRequest(fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }))
}

export const signout = () => {
  return _makeRequest(fetch(`${baseUrl}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  }))
}

export const authorizate = () => {
  return _makeRequest(fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include'
  }))
}