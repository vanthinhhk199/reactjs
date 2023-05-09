import React, { useState } from "react";
import PropTypes from "prop-types";
// import "./style.scss";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
  comfirmPassword: Yup.string()
    .required("Comfirm Password is required")
    .oneOf([Yup.ref("password"), null], "Comfirm Password not match"),
});

const initFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  comfirmPassword: "",
};

function Register(props) {
  const [formValue, setFormValue] = useState(initFormValue); // khởi tạo state lưu trữ giá trị của form
  const [formError, setFormError] = useState({}); // khởi tạo state lưu trữ các thông báo lỗi của form
  const [showError, setShowError] = useState(true); // khởi tạo state để ẩn/hiện các thông báo lỗi mặc định là true

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValue({
      // cập nhật giá trị của state formValue khi có thay đổi
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RegisterSchema.validate(formValue, { abortEarly: false }); // kiểm tra giá trị của form bằng Yup validation
      console.log("form value", formValue);
      setShowError(false); // đặt showError thành false khi không có lỗi
    } catch (err) {
      const errors = {};
      err.inner.forEach(({ path, message }) => {
        // lặp qua các thông báo lỗi và lưu chúng vào object errors
        errors[path] = message;
      });
      setFormError(errors); // cập nhật giá trị của state formError với các thông báo lỗi mới
      setShowError(true); // đặt showError thành true khi có lỗi
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Register</h1>

        <form onSubmit={handleSubmit} action="">
          <div className="mb-2">
            <label htmlFor="first-name" className="form-lable">
              First Name
            </label>
            <input
              id="first-name"
              className="form-control"
              type="text"
              name="firstName"
              value={formValue.firstName}
              onChange={handleChange}
            />
            {showError && formError.firstName && (
              <div className="error-feedback">{formError.firstName}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="last-name" className="form-lable">
              Last Name
            </label>
            <input
              id="last-name"
              className="form-control"
              type="text"
              name="lastName"
              value={formValue.lastName}
              onChange={handleChange}
            />
            {showError && formError.lastName && (
              <div className="error-feedback">{formError.lastName}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-lable">
              Email
            </label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
            {showError && formError.email && (
              <div className="error-feedback">{formError.email}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-lable">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
            {showError && formError.password && (
              <div className="error-feedback">{formError.password}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="confirm-password" className="form-lable">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              className="form-control"
              type="password"
              name="comfirmPassword"
              value={formValue.comfirmPassword}
              onChange={handleChange}
            />
            {showError && formError.comfirmPassword && (
              <div className="error-feedback">{formError.comfirmPassword}</div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

Register.propTypes = {};

export default Register;
