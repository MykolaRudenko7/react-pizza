import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
//
import styles from './Pizza.module.scss';
//
//
//
//
//
const Pizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{ imageUrl: string; title: string; price: number }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://633d7e23f2b0e623dc751a6a.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Помилка при отриманні піци, повертаюсь на головну');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  return (
    <div className={styles.fullPizza}>
      <img src={pizza?.imageUrl} alt="image pizza" />
      <h2>{pizza?.title}</h2>
      <br />
      <p>{pizza?.price} грн</p>
      <br />
      <Link to="/">
        <button className={styles.go_back_btn}>
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default Pizza;
