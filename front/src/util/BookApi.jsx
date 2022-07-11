import axios from 'axios';
import utils from './ApiUtil';
const { apiUtil } = utils;
const baseUrl = process.env.REACT_APP_API_URL;

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

const UploadBook = async bookInfo => {
  try {
    // const { description, image, isbn, name, price, publishedDate, publisher, author, subject, bookCategoryId, content, deposit, grade, thumbnail, imageFiles } = bookInfo;
    const result = await axios.post(baseUrl + `api/book`, bookInfo, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const InterparkSearch = async (pageNum, query, setData) => {
  try {
    const result = await axios.get(baseUrl + `api/book/interpark/search/?pageNum=${pageNum}&query=${query}`);
    const data = result.data;
    setData(data.contents); //수정 필요
  } catch (error) {
    console.log(error);
  }
};

const getCategoryList = async setCategoryList => {
  try {
    // const result = await axios.get(baseUrl + `/api/book/category`); 서버 api 로 바꾸기
    const { data } = await axios.get(baseUrl + `category`);
    setCategoryList([...data]);
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { UploadBook, getBookList, InterparkSearch, getCategoryList };

export default bookApi;
