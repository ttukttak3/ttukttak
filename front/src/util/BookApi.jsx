import utils from './ApiUtil';
const { apiUtil, formUtil, apiAuthUtil } = utils;

const getBookList = async (param, setBookList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/books?pageNum=${param.pageNum}&order=${param.order}&status=${param.status}&townId=${param.townId}&categoryId=${param.categoryId}`);
    result.data.contents.map(data => {
      return setBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const uploadBook = async bookInfo => {
  try {
    // const { description, image, isbn, name, price, publishedDate, publisher, author, subject, bookCategoryId, content, deposit, grade, thumbnail, imageFiles } = bookInfo;
    const result = await formUtil.post(`api/v1/books`, bookInfo);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (bookId, bookInfo) => {
  try {
    const result = await formUtil.put(`api/v1/books/${bookId}`, bookInfo);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const interparkSearch = async (pageNum, query) => {
  const encodingQuery = encodeURIComponent(query.trim());
  try {
    const result = await apiUtil.get(`api/v1/books/interpark/search?pageNum=${pageNum}&query=${encodingQuery}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryList = async setCategoryList => {
  try {
    const { data } = await apiUtil.get(`api/v1/books/category`);
    setCategoryList([...data]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailView = async bookId => {
  try {
    const result = await apiUtil.get(`api/v1/books/${bookId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBookGrade = async (bookId, grade) => {
  try {
    const result = await apiAuthUtil.patch(`api/v1/books/${bookId}/grade`, grade);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBookStatus = async (bookId, status) => {
  try {
    const result = await apiAuthUtil.patch(`api/v1/books/${bookId}/status`, status);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const bookDelete = async bookId => {
  try {
    const result = await apiAuthUtil.delete(`api/v1/books/${bookId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const bookHide = async bookId => {
  try {
    const result = await apiAuthUtil.patch(`api/v1/books/${bookId}/hide`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getMyBookList = async (param, setMyBookList) => {
  try {
    const result = await apiAuthUtil.get(`api/v1/users/${param.userId}/books?pageNum=${param.pageNum}`);
    result.data.contents.map(data => {
      return setMyBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { uploadBook, updateBook, getBookList, getDetailView, interparkSearch, getCategoryList, updateBookGrade, updateBookStatus, bookDelete, bookHide, getMyBookList };

export default bookApi;
