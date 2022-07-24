import utils from './ApiUtil';
const { apiUtil } = utils;

const getNearTown = async townId => {
  try {
    const result = await apiUtil.get(`api/v1/address/towns/${townId}/neartown`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getInfoByAddress = async () => {
  try {
    const result = await apiUtil.get(`api/v1/address/towns`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getInfoByTownId = async () => {
  try {
    const result = await apiUtil.get(`api/v1/address/towns/${townId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const locationApi = { getNearTown, getInfoByAddress, getInfoByTownId };
export default locationApi;
