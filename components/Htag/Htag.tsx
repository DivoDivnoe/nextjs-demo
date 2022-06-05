import { HtagProps } from './Htag.props';
import styles from './Htag.module.css';

type ChildrenProps = HtagProps['children'];

const HtagCreator = {
  h1: (children: ChildrenProps) => {
    return <h1 className={styles.h1}>{children}</h1>;
  },
  h2: (children: ChildrenProps) => {
    return <h2 className={styles.h2}>{children}</h2>;
  },
  h3: (children: ChildrenProps) => {
    return <h3 className={styles.h3}>{children}</h3>;
  }
};

export const Htag = ({ tag, children }: HtagProps): JSX.Element => {
  return HtagCreator[tag](children);
};
