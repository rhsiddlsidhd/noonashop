import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const error = useSelector((state) => state.product.error);

  // 처음 로딩하면 상품리스트 불러오기

  /**
   * 페이지 렌더링시에
   * 이미 호출해서 store에 저장되어 있는 data를 가져와서
   * 보여주기
   * or
   * dispatch를 통해 getProdcutList를 호출하여 렌더링
   *
   * 관리자가 등록한거랑 메인페이지에서 보여줘야할 아이템이 달라야 하는 이유가 있는가 ?
   * 없다면 전자를 선택할 예정
   *
   * 전자가 안되는 이유는 admin 페이지에서 렌더링을 했을때 데이터를 호출하여 redux store를 사용하여
   * main페이지 렌더링시에는 redux store가 비어있음
   * 그러면 후자를 선택하여 getProductList를 해야함
   */

  useEffect(() => {
    dispatch(productActions.getProductList());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col md={3} sm={12}>
          <ProductCard productList={productList} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductAll;
