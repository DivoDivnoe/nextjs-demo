import styles from './P.module.css';
import classnames from 'classnames';
import { PProps } from './P.props';

export const P = ({ size = 'm', children, className, ...props }: PProps) => {
  return (
    <p
      className={classnames(styles.p, className, {
        [styles.small]: size === 's',
        [styles.medium]: size === 'm',
        [styles.large]: size === 'l'
      })}
      {...props}
    >
      {children}
    </p>
  );
};
