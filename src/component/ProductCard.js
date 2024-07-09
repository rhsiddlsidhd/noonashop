import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ productList }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };

  return (
    <>
      {productList.length > 0 ? (
        productList.map((it, index) => (
          <div
            className="card"
            key={index}
            onClick={() => showProduct("hard_code")}
          >
            <img src={it.image} alt="" />
            <div>{it.name}</div>
            <div>{it.price}</div>
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default ProductCard;
