import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import productApi from "./../../../api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "./../components/ProductList";
import { Pagination } from "@material-ui/lab";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "./../components/FilterViewer";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";

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

    margin: "25px 0px",
    paddingBottom: "10px",
  },
  framedescrip: {
    padding: "40px 0",
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    page: 1,
    total: 10,
  });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      //gọi api nên đặt vào try/catch
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch product lít", error);
      }
      setloading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container className={classes.framedescrip} spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

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
