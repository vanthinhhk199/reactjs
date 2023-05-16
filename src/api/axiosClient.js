import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',  // Địa chỉ cơ sở cho các yêu cầu API
  headers: {
    'Content-Type': 'application/json',  // Đặt header Content-Type là JSON
  },
});

// Interceptors
// Thêm interceptor cho yêu cầu
axiosClient.interceptors.request.use(
    function (config) {
    // Thực hiện một số thao tác trước khi gửi yêu cầu
      return config;
    },
    function (error) {
    // Xử lý lỗi khi gửi yêu cầu
      return Promise.reject(error);
    }
  );
  
// Thêm interceptor cho phản hồi
  axiosClient.interceptors.response.use(
    function (response) {
    // Hàm này được gọi khi phản hồi có mã trạng thái từ 200 đến 299
    // Xử lý dữ liệu phản hồi
      return response.data;
    },
    function (error) {
    // Hàm này được gọi khi phản hồi có mã trạng thái không nằm trong khoảng từ 200 đến 299
    // Xử lý lỗi phản hồi
      const { config, status, data } = error.response;
      const URLS = ['/auth/local/register', '/auth/local'];
      if (URLS.includes(config.url) && status === 400) {
        const errorList = data.data || [];
        const firstError = errorList.length > 0 ? errorList[0] : {};
        const messageList = firstError.messages || [];
        const firstMessage = messageList.length > 0 ? messageList[0] : {};
        throw new Error(firstMessage.message);
      }
  
      return Promise.reject(error);
    }
  );

export default axiosClient;