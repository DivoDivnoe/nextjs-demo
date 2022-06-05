import styles from './Divider.module.css';
import classnames from 'classnames';
import { DividerProps } from './Divider.props';

export const Divider = ({ className, ...props }: DividerProps) => {
  return <hr className={classnames(styles.hr, className)} {...props} />;
};
