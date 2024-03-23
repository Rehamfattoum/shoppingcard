import React from "react";
import { Stack, Button } from "react-bootstrap";
import { useShoppingcard } from "../context/shoppingcardcontext";
import storeItems from "../data/storeItems.json";
import FormatCurrency from "./formatcurrency";
const CardItem = ({ id, quantity }) => {
  const { removeFromcard } = useShoppingcard();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt="card-img"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {FormatCurrency(item.price)}
        </div>
      </div>
      <div>{FormatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromcard(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CardItem;