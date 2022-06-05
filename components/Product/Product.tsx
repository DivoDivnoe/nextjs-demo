import styles from './Product.module.css';
import classnames from 'classnames';
import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = () => {
      setIsReviewOpened(true);

      reviewRef.current?.focus();

      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    const variants = {
      visible: {
        height: 'auto',
        opacity: 1
      },
      hidden: {
        height: 0,
        opacity: 0
      }
    };

    return (
      <div ref={ref} className={className} {...props}>
        <Card className={styles.product}>
          <div className={styles.logo}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
              alt={product.title}
              width={70}
              height={70}
            />
          </div>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>
            <span className="visuallyHidden">Цена</span>
            {priceRu(product.price)}
            {product.oldPrice && (
              <Tag className={styles.oldPrice} color="green">
                <span className="visuallyHidden">Скидка</span>
                {priceRu(product.oldPrice - product.price)}
              </Tag>
            )}
          </div>
          <div className={styles.credit}>
            <span className="visuallyHidden">Кредит</span>
            {priceRu(product.credit)}
            <span>/мес</span>
          </div>
          <div className={styles.rating}>
            <span className="visuallyHidden">{`Рейтинг ${product.reviewAvg ?? product.initialRating} звёзд`}</span>
            <Rating rating={product.reviewAvg ?? product.initialRating} />
          </div>
          <div className={styles.tags}>
            {product.categories.map(category => (
              <Tag className={styles.category} key={category} color="ghost">
                {category}
              </Tag>
            ))}
          </div>
          <div className={styles.priceTitle} aria-hidden={true}>
            цена
          </div>
          <div className={styles.creditTitle} aria-hidden={true}>
            кредит
          </div>
          <div className={styles.rateTitle}>
            <a href="#ref" onClick={scrollToReview}>
              {product.reviewCount} отзыв{declOfNum(product.reviewCount, ['', 'а', 'ов'])}
            </a>
          </div>

          <Divider className={styles.hr} />

          <div className={styles.description}>{product.description}</div>
          <div className={styles.feature}>
            {product.characteristics.map(characteristic => (
              <div key={characteristic.name} className={styles.characteristics}>
                <span className={styles.characteristicsName}>{characteristic.name}</span>
                <span className={styles.characteristicsDots}></span>
                <span className={styles.characteristicsValue}>{characteristic.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.advBlock}>
            {product.advantages && (
              <div className={styles.advantages}>
                <div className={styles.advTitle}>Преимущества </div>
                <div>{product.advantages}</div>
              </div>
            )}
            {product.disadvantages && (
              <div className={styles.disadvantages}>
                <div className={styles.advTitle}>Недостатки </div>
                <div>{product.disadvantages}</div>
              </div>
            )}
          </div>

          <Divider className={classnames(styles.hr, styles.hr2)} />

          <div className={styles.actions}>
            <Button appearance="primary">Узнать подробнее</Button>
            <Button
              className={styles.reviewButton}
              appearance="ghost"
              arrow={isReviewOpened ? 'down' : 'right'}
              aria-expanded={isReviewOpened}
              onClick={() => setIsReviewOpened(!isReviewOpened)}
            >
              Читать отзывы
            </Button>
          </div>
        </Card>
        <motion.div
          className={classnames(styles.reviewsWrapper)}
          variants={variants}
          initial={isReviewOpened ? 'visible' : 'hidden'}
          animate={isReviewOpened ? 'visible' : 'hidden'}
        >
          <Card className={classnames(styles.reviews)} ref={reviewRef} color="blue" tabIndex={isReviewOpened ? 0 : -1}>
            {product.reviews.map(review => (
              <div key={review._id}>
                <Review review={review} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} isOpened={isReviewOpened} />
          </Card>
        </motion.div>
      </div>
    );
  })
);
