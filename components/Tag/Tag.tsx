import styles from './Tag.module.css';
import classnames from 'classnames';
import { TagProps } from './Tag.props';

export const Tag = ({ size = 's', color = 'ghost', href, children, className, ...props }: TagProps) => {
  return (
    <div
      className={classnames(styles.tag, className, {
        [styles.small]: size === 's',
        [styles.medium]: size === 'm',
        [styles.red]: color === 'red',
        [styles.green]: color === 'green',
        [styles.gray]: color === 'gray',
        [styles.ghost]: color === 'ghost',
        [styles.primary]: color === 'primary'
      })}
      {...props}
    >
      {href ? (
        <a href={href} target="blank">
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );
};
