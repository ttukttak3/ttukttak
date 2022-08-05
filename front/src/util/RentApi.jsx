import utils from './ApiUtil';
const { apiUtil, apiAuthUtil } = utils;

const getRentList = async (param, setRentList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.userId}/rent?pageNum=${param.pageNum}`);
    console.log(result.data);
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
    console.log(result.data);
    setBorrowList(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getRentDetail = async rentId => {
  try {
    const result = await apiAuthUtil.get(`api/v1/rent/${rentId}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const postRent = async (bookId, lenderId, roomId) => {
  try {
    const result = await apiAuthUtil.post(`api/v1/rent`, { bookId: bookId, lenderId: lenderId, roomId: roomId });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const extendRent = async (extendDate, extendDays, id) => {
  try {
    const result = await apiAuthUtil.post(`api/v1/rent/${rentId}/extend`, { extendDate: extendDate, extendDays: extendDays, id: id });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const returnRent = async () => {
  try {
    const result = await apiAuthUtil.patch(`api/v1/rent/${rentId}/return`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const RentApi = { getRentList, getBorrowList, getRentDetail, postRent, extendRent, returnRent };
export default RentApi;
