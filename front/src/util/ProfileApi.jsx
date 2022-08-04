import utils from './ApiUtil';
const { baseHost, accessToken, apiUtil, apiAuthUtil, formUtil } = utils;
const redirectUrl = process.env.REACT_APP_API_URL + 'oauth2/redirect';
const naverUrl = baseHost + 'oauth2/authorize/naver?redirect_uri=' + redirectUrl;
const kakaoUrl = baseHost + 'oauth2/authorize/kakao?redirect_uri=' + redirectUrl;

const getCurrentUser = async () => {
  try {
    if (!localStorage.getItem(accessToken)) {
      return Promise.reject('No access token set.');
    }
    const result = await apiAuthUtil.get(`api/v1/oauth/profile`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
};

const nickNameCheck = async nickName => {
  try {
    const result = await apiAuthUtil.get(`api/v1/oauth/check-nickname?nickname=${nickName}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const signUp = async formData => {
  try {
    const result = await formUtil.post(`api/v1/oauth/signup`, formData);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const setProfile = async formData => {
  try {
    const result = await formUtil.put(`api/v1/oauth/profile`, formData);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async userId => {
  try {
    const result = await apiAuthUtil.delete(`api/v1/oauth/${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async userId => {
  try {
    const result = await apiUtil.get(`api/v1/users/${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const profileApi = { naverUrl, kakaoUrl, getCurrentUser, nickNameCheck, signUp, setProfile, deleteUser, getUser };

export default profileApi;
