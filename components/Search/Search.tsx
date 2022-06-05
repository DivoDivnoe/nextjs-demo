import styles from './Search.module.css';
import classnames from 'classnames';
import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { KeyboardEventHandler, useState } from 'react';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = evt => {
    if (evt.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={classnames(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        value={search}
        onChange={evt => setSearch(evt.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Поиск..."
      />
      <Button
        className={styles.button}
        appearance="primary"
        aria-label="Искать по сайту"
        onClick={evt => {
          evt.preventDefault();
          goToSearch();
        }}
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
