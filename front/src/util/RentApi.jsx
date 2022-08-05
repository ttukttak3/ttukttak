import utils from './ApiUtil';
const { apiUtil, apiAuthUtil } = utils;

const getRentList = async (param, setRentList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.userId}/rent?pageNum=${param.pageNum}`);

    setRentList(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const getBorrowList = async (param, setBorrowList) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.userId}/rent/borrow?pageNum=${param.pageNum}`);
    setBorrowList(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getRentDetail = async rentId => {
  try {
    const result = await apiAuthUtil.get(`api/v1/rent/${rentId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const postRent = async (bookId, lenderId, roomId) => {
  try {
    const result = await apiAuthUtil.post(`api/v1/rent`, { bookId: bookId, lenderId: lenderId, roomId: roomId });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const extendRent = async (extendDate, extendDays, rentId) => {
  try {
    const result = await apiAuthUtil.post(`api/v1/rent/${rentId}/extend`, { extendDate: extendDate, extendDays: extendDays, id: id });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const returnRent = async rentId => {
  try {
    const result = await apiAuthUtil.patch(`api/v1/rent/${rentId}/return`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const RentApi = { getRentList, getBorrowList, getRentDetail, postRent, extendRent, returnRent };
export default RentApi;
