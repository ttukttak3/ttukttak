import axios from 'axios';
export const API_BASE_URL = 'http://101.101.219.43:8080';
export const ACCESS_TOKEN = 'accessToken';
export const OAUTH2_REDIRECT_URI = 'http://101.101.219.43/oauth2/redirect';
export const NAVER_AUTH_URL = API_BASE_URL + '/oauth2/authorize/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorize/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;
//더 공부해서 모듈화 해보겠음.
const request = options => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    }),
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  return request({
    url: API_BASE_URL + 'api/user/me',
    method: 'GET',
  });
}

export function getLoginCheck() {
  return request({
    url: API_BASE_URL + 'api/user/me',
    method: 'GET',
  })
    .then(response => {
      console.log('아직 로그인 중이다!');
    })
    .catch(error => {
      alert('로그인 해주세요!');
      localStorage.clear();
      window.location.replace('/login');
    });
}

const BASE_URL = '';

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: API_BASE_URL + url, ...options });
  return instance;
};

const axiosAuthApi = (url, options) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const instance = axios.create({
    baseURL: API_BASE_URL + url,
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', charset: 'UTF-8' },
    ...options,
  });
  return instance;
};

const axiosFormApi = (url, options) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const instance = axios.create({
    baseURL: API_BASE_URL + url,
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'multipart/form-data', charset: 'UTF-8' },
    ...options,
  });
  return instance;
};
export const defaultApi = axiosApi(BASE_URL);
export const authApi = axiosAuthApi(BASE_URL);
export const authFormApi = axiosFormApi(BASE_URL);
