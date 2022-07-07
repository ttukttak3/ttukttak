import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

const UploadBook = () => {
  try {
    const result = await axios.post(baseUrl + `api/book`, {
      
    }, {
      headers: {
        "Content-Type": `multipart/form-data`,
      }
    })
  } catch (error) {
    console.log(error);
  }
};

const bookApi = { UploadBook };
export default bookApi;
