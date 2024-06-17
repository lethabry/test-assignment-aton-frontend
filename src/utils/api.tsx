import { BASE_PATH } from './constants';

type TypeResponse = {
  ok: boolean;
  status: number;
  message?: string;
  json: () => Promise<TypeClients[]>;
};

type TypeUser = {
  login: string;
  password: string;
};

type TypeClients = {
  _id: string;
  accountNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  inn: string;
  responcibleWorker: string;
  status: string;
};

const checkResponse = (res: TypeResponse) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}-${res.message}`);

export const login = (data: TypeUser) => {
  const { login, password } = data;
  return fetch(`${BASE_PATH}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ login, password }),
  }).then(checkResponse);
};

export const signout = () => {
  return fetch(`${BASE_PATH}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(checkResponse);
};

export const getClients = () => {
  return fetch(`${BASE_PATH}/clients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(checkResponse);
};

export const setClientStatus = (id: string, status: string) => {
  return fetch(`${BASE_PATH}/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ status }),
  }).then(checkResponse);
};
