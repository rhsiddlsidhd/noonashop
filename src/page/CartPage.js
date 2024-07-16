import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice, cartItemCount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    //카트리스트 불러오기
    /**
     *1)items.productId 상품 아이디를 가져와서
     *get product 에 product Id를 전달해서 데이터를 받아서 price image name 보여주기  (ref)
     *2)items.size qty 보여주기
     *
     */
    dispatch(cartActions.getCartList());
  }, [dispatch, cartItemCount, totalPrice]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <div className="text-align-center empty-bag" key={item._id}>
                <CartProductCard item={item} />
              </div>
            ))
          ) : (
            <div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
