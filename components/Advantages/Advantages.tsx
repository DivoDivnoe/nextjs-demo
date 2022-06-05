import styles from './Advantages.module.css';
import classnames from 'classnames';
import { AdvantagesProps } from './Advantages.props';
import { Htag, P } from '../../components';
import CheckIcon from './check.svg';

export const Advantages = ({ advantages, seoText }: AdvantagesProps) => {
  return (
    <div className={styles.advantages}>
      <Htag tag="h2">Преимущества</Htag>
      {advantages.map(({ title, description, _id }) => (
        <div key={_id} className={styles.advantage}>
          <div className={styles.icon}>
            <CheckIcon />
          </div>
          <Htag tag="h3">{title}</Htag>
          <hr className={styles.vline} />
          <P size="l">{description}</P>
        </div>
      ))}
      {seoText && <div className={styles.seoText} dangerouslySetInnerHTML={{ __html: seoText }}></div>}
    </div>
  );
};
