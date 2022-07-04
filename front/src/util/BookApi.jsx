import utils from './ApiUtil';
const { apiUtil } = utils;

const getBookList = async (param, setBookList) => {
  try {
    const result = await apiUtil.get(`/api/book/list?pageNum=${param.pageNum}&order=${param.order}&status=${param.status}&townId=${param.townId}`);
    console.log(result.data);
    result.data.contents.map(data => {
      return setBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { getBookList };

export default bookApi;
