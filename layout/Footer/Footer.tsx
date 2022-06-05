import { format } from 'date-fns';
import styles from './Footer.module.css';
import classnames from 'classnames';
import { FooterProps } from './Footer.props';

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={classnames(className, styles.footer)} {...props}>
      <span className={styles.copyright}>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</span>
      <a href="#" target="_blank" className={styles.agreement}>
        Пользовательское соглашение
      </a>
      <a href="#" target="_blank" className={styles.policy}>
        Политика конфиденциальности
      </a>
    </footer>
  );
};
