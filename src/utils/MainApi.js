export const BASE_URL = 'https://api.diploma.parakhina.nomoredomains.rocks';

export const register = ({ name, password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      password: password,
      email: email
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
};

export const updateUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject((res.status));
    })
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject((res.status));
    })
}

export const postMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(movie)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject((res.status));
    })
}

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject((res.status));
    })
}
