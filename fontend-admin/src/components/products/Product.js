import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { productDeleteFail, productDeleteRequest, productDeleteSuccess } from "../../redux/product/productDeleteSlice";
import { userLogout } from "../../redux/user/userLoginSlice";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.userLogin)

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      const deleteProduct = async (id) => {
        try {
          dispatch(productDeleteRequest());
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
      
          await axios.delete(`/api/products/${id}`, config);
      
          dispatch(productDeleteSuccess());
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;
          if (message === "Not authorized, token failed") {
            dispatch(userLogout());
          }
          dispatch(productDeleteFail());
        }
      }
      deleteProduct(id)
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.image} alt="Product" />
            <div className="card_stock">
              <p>Stock: {product.countInStock}</p>
              <p>Sold: {product.countInSold}</p>
            </div>
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">{product.price} VND</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
