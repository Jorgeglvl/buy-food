import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [mealsList, setMealsList] = useState();

  useEffect(() => {
    const formatMeals = (data) => {
      const mealArray = [];
      for (const meal in data) {
        mealArray.push({...data[meal], key: meal});
      }
      setMealsList(mealArray.map((meal) => (
        <li>
          <MealItem
            key={meal.key}
            id={meal.key}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        </li>
      )));
    };
    sendRequest(
      "https://react-http-e7870-default-rtdb.firebaseio.com/meals.json",
      formatMeals
    );
  }, [sendRequest]);

  const displayContent = isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    mealsList
  );
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{displayContent}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
