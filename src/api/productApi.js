import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    // Transform _page to _start
    const newParams = { ...params };
    newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);   // Tạo một bản sao của đối tượng params để thay đổi giá trị bên trong mà không ảnh hưởng đến đối tượng gốc

    delete newParams._page; // Xóa key không cần thiết

    // Fetch product list + count
    const productList = await axiosClient.get('/products', { params: newParams }); // Gửi yêu cầu GET đến '/products' với các tham số mới được xác định
    const count = await axiosClient.get('/products/count', { params: newParams }); // Gửi yêu cầu GET đến '/products/count' với các tham số mới được xác định

  // Trả về một đối tượng chứa dữ liệu sản phẩm và thông tin phân tran
    return {
      data: productList, // Dữ liệu sản phẩm từ yêu cầu GET '/products'
      pagination: {
        page: params._page, // Trang hiện tại
        limit: params._limit, // Số sản phẩm trên mỗi trang
        total: count, // Tổng số sản phẩm dựa trên yêu cầu GET '/products/count'
      },
    };
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
