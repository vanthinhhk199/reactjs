import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

const initFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  comfirmPassword: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};
const isEmptyValid = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

function Register(props) {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.firstName)) {
      error["firstName"] = "Firt Name is  required";
    }
    if (isEmptyValue(formValue.lastName)) {
      error["lastName"] = "Last Name is  required";
    }
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email is  required";
    } else {
      if (!isEmptyValid(formValue.email)) {
        error["email"] = "Email is  invalid";
      }
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is  required";
    }
    if (isEmptyValue(formValue.comfirmPassword)) {
      error["comfirmPassword"] = "Comfirm Password is  required";
    } else if (formValue.comfirmPassword !== formValue.password) {
      error["comfirmPassword"] = "Comfirm Password not match";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("form value", formValue);
    } else {
      console.log("form value", formError);
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">REGISTER</h1>

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
            {formError.firstName && (
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
            {formError.lastName && (
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
            {formError.firstName && (
              <div className="error-feedback">{formError.firstName}</div>
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
            {formError.password && (
              <div className="error-feedback">{formError.password}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="comfirm-password" className="form-lable">
              Comfirm Password
            </label>
            <input
              id="comfirm-password"
              className="form-control"
              type="password"
              name="comfirmPassword"
              value={formValue.comfirmPassword}
              onChange={handleChange}
            />
            {formError.comfirmPassword && (
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
