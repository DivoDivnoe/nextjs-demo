import styles from './Sort.module.css';
import classnames from 'classnames';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
  const keyDownHandler = (evt: React.KeyboardEvent, sort: SortEnum) => {
    if (evt.code === 'Enter' || evt.code === 'Space') {
      evt.preventDefault();
      setSort(sort);
    }
  };

  return (
    <div className={classnames(className, styles.sort)} {...props}>
      <div id="sort" className={styles.sortName}>
        Сортировка
      </div>
      <button
        id="rating"
        className={classnames({
          [styles.active]: sort === SortEnum.Rating
        })}
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby="sort rating"
        onClick={() => setSort(SortEnum.Rating)}
        onKeyDown={(evt: React.KeyboardEvent) => {
          keyDownHandler(evt, SortEnum.Rating);
        }}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id="price"
        className={classnames({
          [styles.active]: sort === SortEnum.Price
        })}
        aria-selected={sort === SortEnum.Price}
        aria-labelledby="sort price"
        onClick={() => setSort(SortEnum.Price)}
        onKeyDown={(evt: React.KeyboardEvent) => {
          keyDownHandler(evt, SortEnum.Price);
        }}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
