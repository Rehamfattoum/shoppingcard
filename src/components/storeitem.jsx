import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingcard } from "../context/shoppingcardcontext";
import FormatCurrency from "./formatcurrency";
const StoreItem = ({ id, name, price, imgUrl }) => {
  const {
    getItemQuantity,
    increasecardQuantity,
    decreasecardQuantity,
    removeFromcard,
  } = useShoppingcard();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{FormatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increasecardQuantity(id)}>
              Add To card
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => decreasecardQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity} in card</span>
                </div>
                <Button onClick={() => increasecardQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromcard(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;