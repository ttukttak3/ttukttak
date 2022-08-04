import utils from './ApiUtil';
const { apiUtil } = utils;

const getRentList = async (param, setRentList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.userId}/rent?pageNum=${param.pageNum}`);
    return setRentList(result.data);
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const getBorrowList = async (param, setBorrowList) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.userId}/rent/borrow?pageNum=${param.pageNum}`);
    return setBorrowList(result.data);
  } catch (error) {
    console.log(error);
  }
};

const RentApi = { getRentList, getBorrowList };

export default RentApi;
