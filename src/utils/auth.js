const baseUrl = 'https://auth.nomoreparties.co';

const checkResponse = res => (res.ok ? res.json() : Promise.reject(`Статус: ${res.status}`));

export const registrate = async userData => {
  const response = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return checkResponse(response);
};

export const authorize = async userData => {
  const response = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return checkResponse(response);
};

export const checkToken = async token => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};
