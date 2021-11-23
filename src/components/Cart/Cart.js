import { Fragment, useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [displayCheckout, setDispleyCheckout] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cancelHandler = () => {
    props.onCloseCart(false);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const displayCheckoutHandler = () => {
    setDispleyCheckout(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const hasItems = cartCtx.items.length > 0;

  const modalActions = (
    <div className={styles.actions}>
      {!success && <button className={styles["button--alt"]} onClick={cancelHandler}>
        Cancel
      </button>}
      {success && <button className={styles.button} onClick={cancelHandler}>
          Confirm
        </button>}
      {hasItems && !error && !success && (
        <button className={styles.button} onClick={displayCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const formatData = () => {};
  const postHandler = (formData) => {
    sendRequest(
      "https://react-http-e7870-default-rtdb.firebaseio.com/orders.json",
      formatData,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          user: formData,
          items: cartCtx.items
        },
      }
    );
    cartCtx.reset();
    setDispleyCheckout(false);
    setSuccess(true);
  };

  const content = isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <Fragment>
      <h2>{error}</h2>
      {modalActions}
    </Fragment>
  ) : success ?   (
    <Fragment>
    <h2>Order send successfully!</h2>
    {modalActions}
  </Fragment>
  )
  :  (
    <section>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {displayCheckout && !isLoading && !error && (
        <Checkout onPost={postHandler} onCancel={cancelHandler} />
      )}
      {!displayCheckout && modalActions}
    </section>
  );

  return <Modal onBackdropClick={cancelHandler}>{content}</Modal>;
};

export default Cart;
