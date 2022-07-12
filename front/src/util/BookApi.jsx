import axios from 'axios';
import utils from './ApiUtil';
const { apiUtil } = utils;
const baseUrl = process.env.REACT_APP_API_URL;

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

const uploadBook = async bookInfo => {
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

const interparkSearch = async (pageNum, query, setData) => {
  try {
    const result = await axios.get(baseUrl + `api/book/interpark/search/?pageNum=${pageNum}&query=${query}`);
    const data = result.data;
    setData(data.contents); //수정 필요
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { uploadBook, getBookList, interparkSearch, getBookCategory };


export default bookApi;
