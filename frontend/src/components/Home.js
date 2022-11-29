import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../services/productServices";
import Product from "./products/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Shop online With"} />
          <h1 id="products_heading">All Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((prod) => (
                  <Product key={prod._id} product={prod} />
                ))}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
