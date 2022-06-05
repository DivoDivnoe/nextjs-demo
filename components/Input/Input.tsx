import styles from './Input.module.css';
import classnames from 'classnames';
import { InputProps } from './Input.props';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={classnames(className, styles.inputWrapper)}>
      <input
        ref={ref}
        className={classnames(styles.input, {
          [styles.error]: !!error
        })}
        {...props}
      />
      {error && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
});
