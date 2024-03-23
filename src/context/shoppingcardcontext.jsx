import { createContext, useContext, useEffect, useState } from "react";
import Shoppingcard from "../components/shoppingcard";

const ShoppingcardContext = createContext({});
const initialcardItems = localStorage.getItem("shopping-card")
  ? JSON.parse(localStorage.getItem("shopping-card"))
  : [];

const ShoppingcardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardItems, setcardItems] = useState(initialcardItems);

  useEffect(() => {
    localStorage.setItem("shopping-card", JSON.stringify(cardItems));
  }, [cardItems]);

  const cardQuantity = cardItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const opencard = () => {
    setIsOpen(true);
  };
  const closecard = () => {
    setIsOpen(false);
  };
  const getItemQuantity = (id) => {
    return cardItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increasecardQuantity = (id) => {
    setcardItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreasecardQuantity = (id) => {
    setcardItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromcard = (id) => {
    setcardItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingcardContext.Provider
      value={{
        getItemQuantity,
        increasecardQuantity,
        decreasecardQuantity,
        removeFromcard,
        opencard,
        closecard,
        cardQuantity,
        cardItems,
      }}
    >
      {children}
      <Shoppingcard isOpen={isOpen} />
    </ShoppingcardContext.Provider>
  );
};

export default ShoppingcardProvider;
export const useShoppingcard = () => {
  return useContext(ShoppingcardContext);
};