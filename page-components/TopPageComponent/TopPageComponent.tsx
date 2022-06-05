import styles from './TopPageComponent.module.css';
import classnames from 'classnames';
import { TopPageComponentProps } from './TopPage.props';
import { Tag, Htag, HhData, P, Product } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import CheckIcon from './check.svg';
import { Advantages } from '../../components';
import { Sort } from '../../components';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, firstCategory, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    sort: SortEnum.Rating,
    products
  });
  const shoudReduceMotion = useReducedMotion();

  useEffect(() => {
    dispatchSort({ type: 'update', payload: products });
  }, [products]);

  const setSort = (sortType: SortEnum): void => {
    dispatchSort({ type: sortType });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page?.title}</Htag>
        {products && (
          <Tag color="gray" size="m" aria-label={`${products.length} элементов`}>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map(product => (
            <Product role="listitem" layout={!shoudReduceMotion} key={product._id} product={product} />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <Advantages advantages={page.advantages} seoText={page.seoText} />
      )}
      <div className={styles.skills}>
        <Htag tag="h2">Получаемые навыки</Htag>
        <div className={styles.tags}>
          {page.tags.map(tag => (
            <Tag key={tag} color="primary" size="m">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
