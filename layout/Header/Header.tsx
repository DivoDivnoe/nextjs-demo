import styles from './Header.module.css';
import classnames from 'classnames';
import { HeaderProps } from './Header.props';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const shoudReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: shoudReduceMotion
        ? {}
        : {
            stiffness: 20
          }
    },
    closed: {
      opacity: shoudReduceMotion ? 1 : 0,
      x: '100%'
    }
  };

  return (
    <header className={classnames(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpened(true)} />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        animate={isOpened ? 'opened' : 'closed'}
        initial={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon className={styles.menuClose} appearance="white" icon="close" onClick={() => setIsOpened(false)} />
      </motion.div>
    </header>
  );
};
