import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ filterData }) => {
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
      {filterData.length > 0 ? (
        filterData.map((it, index) => (
          <div className="card" key={index} onClick={() => showProduct(it._id)}>
            <img src={it.image} alt="" />
            <div>{it.name}</div>
            <div>{it.price}</div>
          </div>
        ))
      ) : (
        <div>No Data...</div>
      )}
    </>
  );
};

export default ProductCard;
/**
 * 운동갔다와서 할일
 *
 * card에서 부를게 아니라
 *
 * detail 페이지로 이동해서 데이터를 직접받는거 api호출 수정
 */
