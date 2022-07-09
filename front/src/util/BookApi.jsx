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
    const { description, image } = bookInfo;
    const result = await axios.post(
      baseUrl + `api/book`,
      {
        description: 'API 도서 설명',
        image: 'API 도서 이미지',
        isbn: 'API 도서 번호',
        name: 'API 도서명',
        price: 'API 도서 정가',
        publishedDate: 'API 도서 출판일', //ex) 2022-07-03
        publisher: 'API 도서 출판사',
        author: '저자명',
        subject: '도서명 API 도서명과 같음',
        bookCategoryId: '카테고리 ID',
        content: '대여자의 말',
        deposit: '보증금',
        grade: '도서 등급',
        thumbnail: '대표 이미지명, API 조회시 API 이미지명으로!',
        imageFiles: '이미지 파일',
      },
      {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      },
    );
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
    const result = await axios.get(baseUrl + `category`);
    const data = result.data;
    setCategoryList([...data]);
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { UploadBook, getBookList, InterparkSearch, getCategoryList };

export default bookApi;
