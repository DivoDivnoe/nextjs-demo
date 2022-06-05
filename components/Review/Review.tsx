import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ReviewProps } from './Review.props';
import styles from './Review.module.css';
import classnames from 'classnames';
import UserIcon from './user.svg';
import { Rating } from '../Rating/Rating';

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;

  return (
    <div className={classnames(className, styles.review)} {...props}>
      <UserIcon className={styles.userIcon} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>
        <span>{title}</span>
      </div>
      <div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>
      <Rating className={styles.rating} rating={rating} />
      <div className={styles.description}>{description}</div>
    </div>
  );
};
