import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";

const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
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
    const query = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };

    dispatch(productActions.getProductList(query));
  }, [dispatch, searchParams]);

  const handlePageClick = ({ selected }) => {
    /**
     * The method to call when a page is changed. Exposes the current page object as an argument.
     * page.selected
     */

    setSearchParams({ ...searchParams, page: selected + 1 });
  };

  return (
    <Container>
      <Row>
        <Col md={3} sm={12}>
          <ProductCard productList={productList} />
        </Col>
      </Row>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={totalPageNum}
        pageRangeDisplayed={5}
        previousLabel="< 이전"
        nextLabel="다음 >"
        breakLabel="..."
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="display-center list-style-none"
      />
    </Container>
  );
};

export default ProductAll;
