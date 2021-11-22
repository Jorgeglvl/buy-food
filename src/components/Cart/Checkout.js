import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const validateInputs = (value) => {
  return value.trim() !== "";
};

const validatecep = (value) => {
  return value.trim().length === 8;
};

const Checkout = (props) => {
  const [inputsValidity, setInputsValidity] = useState({
    name: true,
    city: true,
    street: true,
    cep: true,
  });

  const nameRef = useRef();
  const cityRef = useRef();
  const streetRef = useRef();
  const cepRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCep = cepRef.current.value;

    const nameIsValid = validateInputs(enteredName);
    const cityIsValid = validateInputs(enteredCity);
    const streetIsValid = validateInputs(enteredStreet);
    const cepIsValid = validatecep(enteredCep);

    setInputsValidity({
      name: nameIsValid,
      city: cityIsValid,
      street: streetIsValid,
      cep: cepIsValid,
    });

    const formIsValid =
      nameIsValid && cityIsValid && streetIsValid && cepIsValid;

    if (!formIsValid) {
      return;
    }
    const formData = {enteredName, enteredCity, enteredStreet, enteredCep};
    props.onPost(formData);
  };

  const buttons = <div className={styles.actions}>
  <button type="button" onClick={props.onCancel}>
    Cancel
  </button>
  <button className={styles.submit}>Confirm</button>
</div>
  
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Name</label>
        <input className={`${!inputsValidity.name && styles.invalid}`} ref={nameRef} type="text" id="name" />
        <label htmlFor="city">City</label>
        <input className={`${!inputsValidity.city && styles.invalid}`} ref={cityRef} type="text" id="city" />
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input className={`${!inputsValidity.street && styles.invalid}`} ref={streetRef} type="text" id="street" />
        <label htmlFor="cep">CEP</label>
        <input className={`${!inputsValidity.cep && styles.invalid}`} ref={cepRef} type="text" id="cep" />
      </div>
        {!inputsValidity.name && <p>Insert a name!</p>}
        {!inputsValidity.city && <p>Insert a city!</p>}
        {!inputsValidity.street && <p>Insert a street!</p>}
        {!inputsValidity.cep && <p>Insert a valid CEP!</p>}
        {buttons}
    </form>
  );
};

export default Checkout;
