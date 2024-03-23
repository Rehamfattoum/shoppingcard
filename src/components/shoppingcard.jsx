import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingcard } from "../context/shoppingcardcontext";
import cardItem from "./carditem";
import FormatCurrency from "./formatcurrency";
import storeItems from "../data/storeItems.json";

const Shoppingcard = ({ isOpen }) => {
  const { closecard, cardItems } = useShoppingcard();
  return (
    <Offcanvas show={isOpen} onHide={closecard} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>card</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cardItems.map((item) => (
            <cardItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {FormatCurrency(
              cardItems.reduce((total, cardItem) => {
                const item = storeItems.find((i) => i.id === cardItem.id);
                return total + (item?.price || 0) * cardItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Shoppingcard;