import { useContext, useEffect, KeyboardEvent, useState } from 'react';
import styles from './Menu.module.css';
import classnames from 'classnames';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, MenuItem, PageItem } from '../../interfaces/menu.interface';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();
  const shoudReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginTop: 10,
      marginBottom: 10,
      transition: shoudReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.05
          }
    },
    hidden: {
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      maxHeight: 48,
      opacity: 1
    },
    hidden: {
      maxHeight: 0,
      opacity: shoudReduceMotion ? 1 : 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((menuItem: MenuItem) => {
          if (menuItem._id.secondCategory === secondCategory) {
            setAnnounce(menuItem.isOpened ? 'closed' : 'opened');
            menuItem.isOpened = !menuItem.isOpened;
          }

          return menuItem;
        })
      );
  };

  const openSecondLevelKey = (evt: KeyboardEvent, secondCategory: string) => {
    if (evt.code === 'Space' || evt.code === 'Enter') {
      evt.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <ul className={styles.menuList}>
        {firstLevelMenu.map(menuItem => (
          <li key={menuItem.route} aria-expanded={menuItem.id === firstCategory}>
            <Link href={`/${menuItem.route}`}>
              <a>
                <div
                  className={classnames(styles.firstLevel, {
                    [styles.firstLevelActive]: menuItem.id === firstCategory
                  })}
                >
                  {menuItem.icon}
                  <span>{menuItem.name}</span>
                </div>
              </a>
            </Link>

            {menuItem.id === firstCategory && buildSecondLevel(menuItem)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItemCurrent: FirstLevelMenuItem): JSX.Element => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(menuItem => {
          if (menuItem.pages.map(page => page.alias).includes(router.asPath.split('/')[2])) {
            menuItem.isOpened = true;
          }

          return (
            <li key={menuItem._id.secondCategory}>
              <button
                className={styles.secondLevel}
                tabIndex={0}
                onKeyDown={(evt: KeyboardEvent) => openSecondLevelKey(evt, menuItem._id.secondCategory)}
                onClick={() => openSecondLevel(menuItem._id.secondCategory)}
                aria-expanded={menuItem.isOpened}
              >
                {menuItem._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                className={classnames(styles.secondLevelBlock)}
              >
                {buildThirdLevel(menuItem.pages, menuItemCurrent.route, menuItem.isOpened)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean = false): JSX.Element => {
    return (
      <>
        {pages.map(page => (
          <motion.li variants={variantsChildren} key={page.alias}>
            <Link href={`/${route}/${page.alias}`}>
              <a
                className={classnames(styles.thirdLevel, {
                  [styles.thirdLevelActive]: router.asPath.split('#')[0] === `/${route}/${page.alias}`
                })}
                tabIndex={isOpened ? 0 : -1}
                aria-current={router.asPath.split('#')[0] === `/${route}/${page.alias}` ? 'page' : false}
              >
                {page.category}
              </a>
            </Link>
          </motion.li>
        ))}
      </>
    );
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visuallyHidden">
          {announce === 'opened' ? 'развёрнуто' : 'свёрнуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
