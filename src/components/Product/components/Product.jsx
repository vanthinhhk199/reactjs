import PropTypes from "prop-types";
import React from "react";
import { Box, Typography } from "@material-ui/core";
import { STATIC_HOST } from "./../../../constants/index";
import { THUMBNAIL_PLACEHOLDER } from "./../../../constants/common";
import { useHistory } from "react-router";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };
  return (
    <Box padding={1}>
      <Box padding={1} onClick={handleClick}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
