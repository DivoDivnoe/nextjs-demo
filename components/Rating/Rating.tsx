import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './Rating.module.css';
import Star from './star.svg';
import { RatingProps } from './Rating.props';
import { ST } from 'next/dist/shared/lib/utils';

const STARS_AMOUNT = 5;

export const Rating = forwardRef(
  (
    { rating, isEditable = false, setRating, className, error, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(Array.from({ length: STARS_AMOUNT }, () => <></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, isEditable]);

    const computeFocus = (rating: number, index: number): number => {
      if (!isEditable) return -1;

      if (!rating && index === 0) return 0;

      if (rating === index + 1) {
        return 0;
      }

      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((_star: JSX.Element, index: number) => {
        return (
          <span
            ref={r => ratingArrayRef.current?.push(r)}
            className={classnames(styles.star, {
              [styles.editable]: isEditable,
              [styles.filled]: index < currentRating
            })}
            onMouseEnter={() => changeDisplay(index + 1)}
            onClick={() => onClick(index + 1)}
            tabIndex={computeFocus(rating, index)}
            onKeyDown={handleKey}
            role={isEditable ? 'slider' : ''}
            aria-valuemin={1}
            aria-valuemax={STARS_AMOUNT}
            aria-valuenow={rating}
            aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
            aria-invalid={!!error}
          >
            <Star />
          </span>
        );
      });

      setRatingArray(updatedArray);
    };

    const changeDisplay = (currentRating: number) => {
      if (!isEditable) return;

      constructRating(currentRating);
    };

    const onClick = (newRating: number) => {
      if (!isEditable || !setRating) return;

      setRating(newRating);
    };

    const handleKey = (evt: React.KeyboardEvent) => {
      if (!isEditable || !setRating) return;

      if (evt.code === 'ArrowRight' || evt.code === 'ArrowUp') {
        rating = rating || 0;

        evt.preventDefault();
        setRating(rating < STARS_AMOUNT ? rating + 1 : STARS_AMOUNT);
        ratingArrayRef.current[rating]?.focus();
      } else if (evt.code === 'ArrowLeft' || evt.code === 'ArrowDown') {
        evt.preventDefault();
        setRating(rating > 1 ? rating - 1 : rating);
        ratingArrayRef.current && ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        ref={ref}
        className={classnames(className, styles.rating)}
        {...props}
        onMouseLeave={() => changeDisplay(rating)}
      >
        <div className={classnames({ [styles.error]: !!error })}>
          {ratingArray.map((StarSvg: JSX.Element, index: number) => (
            <span key={index}>{StarSvg}</span>
          ))}
        </div>
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
