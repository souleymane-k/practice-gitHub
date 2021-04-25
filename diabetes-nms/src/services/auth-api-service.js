import config from '../config';
import { TokenService } from './token-service';

export const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then( res => {
      return (!res.ok) 
        ? res.json().then( e => Promise.reject(e))
        : res.json().then(res => {
            TokenService.saveAuthToken(res.authToken)
            TokenService.saveVisitedObj();
          });
    })
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then( res => {
      return (!res.ok)
        ? res.json().then( e => Promise.reject(e))
        : res.json();
    })
  },
  getResults() {
    return fetch(`${config.API_ENDPOINT}/results`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then( res => {
      return (!res.ok)
        ? res.json().then( e => Promise.reject(e))
        : res.json();
    })
  },
  
  addResults(result) {
    return fetch(`${config.API_ENDPOINT}/results`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(result)
    })
    .then( res => {
      return (!res.ok)
        ? res.json().then( e => Promise.reject(e))
        : res.json();
    })
  },
  editResults(resultId, updatedResultData) {
    return fetch(`${config.API_ENDPOINT}/results/${resultId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updatedResultData)
    })
    .catch(error => Promise.reject(error));
  },
  deleteResults(resultId) {
    return fetch(`${config.API_ENDPOINT}/results/${resultId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .catch(error => Promise.reject(error));
  }
}