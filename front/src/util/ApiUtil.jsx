import axios from 'axios';

//const baseUrl = 'http://101.101.219.43:8080/';
const baseUrl = 'http://27.96.134.65:8090/';
const accessToken = 'accessToken';
const token = localStorage.getItem(accessToken);
export const ACCESS_TOKEN = 'accessToken';
const apiUtil = axios.create({
  baseURL: baseUrl,
  changeOrigin: true,
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

const formUtil = axios.create({
  baseURL: baseUrl,
  changeOrigin: true,
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'multipart/form-data',
    charset: 'UTF-8',
  },
});

//인터셉터 설정
apiUtil.interceptors.request.use(
  function (config) {
    //request 정상
    return config;
  },
  function (error) {
    //request 에러
    return Promise.reject(error);
  },
);

apiUtil.interceptors.response.use(
  function (response) {
    //response 정상
    return response;
  },
  function (error) {
    //response 에러
    return Promise.reject(error);
  },
);

const utils = { baseUrl, accessToken, apiUtil, formUtil };
export default utils;
