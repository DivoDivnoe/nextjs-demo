import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import ArrowIcon from './arrow.svg';
import classNames from 'classnames';
import { motion, useMotionValue } from 'framer-motion';

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      style={{ scale }}
      className={classNames(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost'
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={classNames(styles.arrow, {
            [styles.down]: arrow === 'down'
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
