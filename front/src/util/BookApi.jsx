import utils from './ApiUtil';
const { apiUtil, formUtil } = utils;
const baseUrl = process.env.REACT_APP_API_URL;

const getBookList = async (param, setBookList) => {
  try {
    const result = await apiUtil.get(`api/v1/book/list?pageNum=${param.pageNum}&order=${param.order}&status=${param.status}&townId=${param.townId}&categoryId=${param.categoryId}`);
    console.log(result.data);
    result.data.contents.map(data => {
      return setBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadBook = async bookInfo => {
  try {
    // const { description, image, isbn, name, price, publishedDate, publisher, author, subject, bookCategoryId, content, deposit, grade, thumbnail, imageFiles } = bookInfo;
    const result = await formUtil.post(`api/v1/book`, bookInfo);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const interparkSearch = async (pageNum, query) => {
  try {
    const result = await apiUtil.get(`api/v1/book/interpark/search/?pageNum=${pageNum}&query=${query}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryList = async setCategoryList => {
  try {
    const { data } = await apiUtil.get(`api/v1/book/category`);
    setCategoryList([...data]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { uploadBook, getBookList, interparkSearch, getCategoryList };

export default bookApi;
