import ContentLoader from 'react-content-loader';
import styles from "./PizzaBlock.module.scss";



//
export const Skeleton = (props) => (
  <ContentLoader
    className={styles.pizza_block}
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#e6e6e6"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="137" r="130" />
    <rect x="3" y="425" rx="30" ry="30" width="85" height="44" />
    <rect x="159" y="425" rx="30" ry="30" width="120" height="44" />
    <rect x="0" y="280" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="321" rx="10" ry="10" width="280" height="88" />
  </ContentLoader>
);