import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ProductThumbnail from "../components/ProductThumbnail";
import { useRouteMatch } from "react-router";
import useProductDetail from "./../hook/newProductDetail";
import ProductInfo from "./../components/ProductInfo";
import AddToCartForm from "../components/AddToCartForm";
import ProductMenu from "../components/ProductMenu";
import { Router } from "@material-ui/icons";
import ProductAdditional from "./../components/ProductAdditional";
import ProductDescriptional from "../components/ProductDescriptional";
import { Switch, Route } from "react-router";
import ProductReviews from "./../components/ProductReviews";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Cart/CartSlice";

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: "1 1 0", //chiếm hết độ rộng thằng cha
    padding: theme.spacing(1.5),
  },
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
}));

function DetailPage() {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route exact path={url}>
            <ProductDescriptional product={product} />
          </Route>
          <Router
            path={`${url}/additional`}
            component={ProductAdditional}
            exact
          ></Router>
          <Router
            path={`${url}/reviews`}
            component={ProductReviews}
            exact
          ></Router>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
