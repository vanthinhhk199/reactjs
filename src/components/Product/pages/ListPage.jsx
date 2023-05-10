import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import productApi from "./../../../api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "./../components/ProductList";
import { Pagination } from "@material-ui/lab";
import ProductSort from "../components/ProductSort";

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0", //chiếm hết độ rộng thằng cha
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",

    marginTop: "20px",
    paddingBottom: "10px",
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 10,
  });
  const [loading, setloading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: "salePrice:ASC",
  });

  useEffect(() => {
    (async () => {
      //gọi api nên đặt vào try/catch
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch product lít", error);
      }
      setloading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={filters._sort}
                onChange={handleSortChange}
              />
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList}></ProductList>
              )}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
