import debounce from 'lodash.debounce';
import React from 'react';
//
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
//
// import close from '../../../src/assets/img/clear.svg';
import styles from './Search.module.scss';
//
//
//
const Search: React.FC = () => {
  const dispatch = useDispatch();

  // state input for server
  const [localValueInput, setLocalValueInput] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // clear
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setLocalValueInput('');
    // inputRef.current.focus();
    // 1
    // якщо він є (позитивне значення), то фокус
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    // 2
    // якщо є параметр current, то focus() (опціональна послідуваність)
    inputRef.current?.focus();
  };

  //   запис значення
  const onChangeValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValueInput(e.target.value);
    delaySendValue(e.target.value);
  };

  //   затримкка запросу на сервер
  const delaySendValue = React.useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 1000),
    [],
  );

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inputRef}
        value={localValueInput}
        onChange={(e) => onChangeValueInput(e)}
        className={styles.input}
        placeholder="Пошук піцци"
      />
      {localValueInput && (
        <>
          <span className={styles.clean} onClick={() => onClickClear()}>
            ×
          </span>
          <span />
        </>
      )}
    </div>
  );
};

export default Search;
