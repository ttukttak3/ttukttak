import utils from './ApiUtil';
const { apiUtil } = utils;

const getBookList = async (param, setBookList) => {
  try {
    const result = await apiUtil.get(`/api/book/list?pageNum=${param.pageNum}&order=${param.order}&status=${param.status}&townId=${param.townId}&categoryId=${param.categoryId}`);
    result.data.contents.map(data => {
      return setBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const getBookCategory = async () => {
  try {
    const result = await apiUtil.get(`/api/book/category`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { getBookList, getBookCategory };

export default bookApi;
