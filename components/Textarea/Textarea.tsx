import styles from './Textarea.module.css';
import classnames from 'classnames';
import { TextareaProps } from './Textarea.props';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className={classnames(className, styles.textareaWrapper)}>
        <textarea
          ref={ref}
          className={classnames(styles.textarea, {
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
  }
);
