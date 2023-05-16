import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import DOMPurify from "dompurify";

ProductDescriptional.propTypes = { product: PropTypes.object };

function ProductDescriptional({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description); // khi render chuỗi html lên frontend từ api chưa chưa chắt an toàn nên ta dùng thư viện dompurify để verify nó trước khi render
  return (
    <Paper elevation={0} style={{ padding: "15px", marginBottom: "60px" }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </Paper>
  );
}

export default ProductDescriptional;
