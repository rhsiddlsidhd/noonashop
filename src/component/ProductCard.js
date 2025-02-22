import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    /**
     * 상품 디테일 페이지로 가기
     *  query id 전달
     */

    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="card" onClick={() => showProduct(item._id)}>
        <img src={item?.image} alt="" />
        <div>{item?.name}</div>
        <div>{item?.price}</div>
      </div>
    </>
  );
};

export default ProductCard;
