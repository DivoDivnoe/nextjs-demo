import styles from './Layout.module.css';
import classnames from 'classnames';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { FC, KeyboardEvent, useRef, useState } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';

const Layout = ({ children }: LayoutProps) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const onClickSkipLink = (evt: KeyboardEvent) => {
    if (evt.code === 'Space' || evt.code === 'Enter') {
      evt.preventDefault();
      bodyRef.current?.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <a
        className={classnames(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        tabIndex={1}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onBlur={() => setIsSkipLinkDisplayed(false)}
        onKeyDown={onClickSkipLink}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main ref={bodyRef} className={styles.body} tabIndex={0} role="main">
        {children}
      </main>

      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FC<T>) => {
  return (props: T): JSX.Element => {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
