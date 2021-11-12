import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import styles from"./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartCandler = (amount) => {
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
      })
    };

    return (
    <div className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartCandler}/>
      </div>
    </div>
  );
};

export default MealItem;
