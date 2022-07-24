import axios from 'axios';
const baseUrl = process.env.REACT_APP_SERVER_API_URL;
const baseHost = process.env.REACT_APP_SERVER_IP_URL;
const accessToken = 'accessToken';
const token = localStorage.getItem(accessToken);
export const ACCESS_TOKEN = 'accessToken';

const apiUtil = axios.create({
  baseURL: baseUrl,
  changeOrigin: true,
  //timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

const apiAuthUtil = axios.create({
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

const utils = { baseUrl, baseHost, accessToken, apiUtil, apiAuthUtil, formUtil };
export default utils;
