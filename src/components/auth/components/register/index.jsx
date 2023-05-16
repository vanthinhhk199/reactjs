import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "../../userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch(); // Sử dụng useDispatch từ react-redux để lấy dispatch function
  const { enqueueSnackbar } = useSnackbar(); // Sử dụng useSnackbar từ react-toastify để hiển thị thông báo

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;

      // Tạo action register và gửi dispatch để gọi API đăng ký
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar("Register successfully!!! 💯 ", {
        variant: "success",
      });
    } catch (error) {
      console.log("Failed to register:", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
