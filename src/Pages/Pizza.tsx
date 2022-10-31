import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  if (!pizza) {
    return <>'Loading...'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="image pizza" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} грн</p>
    </div>
  );
};

export default Pizza;
