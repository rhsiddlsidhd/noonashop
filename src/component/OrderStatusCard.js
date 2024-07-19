import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ orderList }) => {
  return (
    <div>
      {orderList.length > 0 ? (
        orderList.map((item) => (
          <Row className="status-card">
            <Col xs={2}>
              <img src={item.items[0].productId.image} alt="" height={96} />
            </Col>
            <Col xs={8} className="order-info">
              <div>
                <strong>주문번호: {item.orderNum}</strong>
              </div>

              <div className="text-12">{item.createdAt.split("T")[0]}</div>

              <div>{item.items[0].productId.name}</div>
              <div>₩ {item.totalPrice}</div>
            </Col>
            <Col md={2} className="vertical-middle">
              <div className="text-align-center text-12">주문상태</div>
              <Badge bg="warning">{item.status}</Badge>
            </Col>
          </Row>
        ))
      ) : (
        <Row className="status-card">
          <h2>주문한 상품이 없습니다</h2>
        </Row>
      )}
    </div>
  );
};

export default OrderStatusCard;
