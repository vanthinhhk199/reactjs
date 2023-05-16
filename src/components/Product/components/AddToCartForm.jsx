import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Button, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../form-controls/InputField";
import QuantityField from "../../form-controls/QuantityField";

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function AddToCartForm({ onSubmit = null }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .typeError("Số lượng phải là một số")
      .integer("Số lượng phải là số nguyên")
      .min(1, "Số lượng nhỏ nhất là 1")
      .required("Vui lòng chọn số lượng"),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button
        type="submit"
        className={classes.submit}
        variant="contained"
        color="primary"
        style={{ width: "200px" }}
        size="large"
      >
        Add To Cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
