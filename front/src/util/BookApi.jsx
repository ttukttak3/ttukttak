import utils from './ApiUtil';
const { apiUtil, formUtil } = utils;

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

const interparkSearch = async (pageNum, query, setData) => {
  try {
    const result = await apiUtil.get(`api/v1/book/interpark/search/?pageNum=${pageNum}&query=${query}`);
    const data = result.data;
    setData(data.contents); //수정 필요
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

const getDetailView = async bookId => {
  try {
    const result = await apiUtil.get(`api/v1/book/${bookId}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { uploadBook, getBookList, getDetailView, interparkSearch, getCategoryList };

export default bookApi;
