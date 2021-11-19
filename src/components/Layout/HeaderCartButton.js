import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnBump, setBtnBump] = useState(false);

  const {items} =  cartCtx;

  const numberOfCardItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const onClickHandler = () => {
    props.onClick(true);
  };

  const btnStyles = `${styles.button} ${btnBump ? styles.bump : ''}`;

  const itemsListLength = cartCtx.items.length;

  useEffect(() => {
      if (itemsListLength === 0) {
          return;
      }
    setBtnBump(true);
    const timer = setTimeout(()=>{
        setBtnBump(false)
    }, 300);

    return () => {
        clearTimeout(timer);
    };
  }, [itemsListLength]);

  return (
    <button className={btnStyles} onClick={onClickHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCardItems}</span>
    </button>
  );
};

export default HeaderCartButton;
