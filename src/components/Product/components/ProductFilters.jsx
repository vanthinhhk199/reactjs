import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByService from "./Filters/FilterByService";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return; // onchange không isRequired ở trên và ko truyền vào nên nó bị undefined nên kiểm tra ko có thì ko làm gì có thì thực hiện tiếp dòng dưới

    const newFilters = {
      "category.id": newCategoryId,
    };

    onChange(newFilters);
  };

  const handeChange = (values) => {
    if (onChange) onChange(values);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handeChange} />
      <FilterByService filters={filters} onChange={handeChange} />
    </Box>
  );
}

export default ProductFilters;
