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
    const result = await apiAuthUtil.get(`api/v1/user/me`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
};

const nickNameCheck = async nickName => {
  try {
    const result = await apiAuthUtil.get(`api/v1/user/chknickname?nickname=${nickName}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const locationValue = async position => {
  try {
    const result = await apiUtil.get(`api/v1/address/location?latitude=${position.coords.latitude.toString()}&longitude=${position.coords.longitude.toString()}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const signUp = async formData => {
  try {
    const result = await formUtil.post(`api/v1/user/signup`, formData);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const profileApi = { naverUrl, kakaoUrl, getCurrentUser, nickNameCheck, locationValue, signUp };

export default profileApi;
