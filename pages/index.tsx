import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Htag tag="h3">Текст</Htag>
      <Button appearance="primary" arrow="right">
        Primary
      </Button>
      <Button appearance="ghost" arrow="right">
        Ghost
      </Button>
      <P>
        Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft skills — навыки, которые
        позволят эффективно взаимодействовать в команде с менеджерами, разработчиками и маркетологами. Выпускники
        факультета могут успешно конкурировать с веб-дизайнерами уровня middle.
      </P>
      <Tag size="s" color="green">
        small green
      </Tag>
      <Tag size="m" color="primary">
        medium primary
      </Tag>
      <Tag size="s" color="gray">
        small gray
      </Tag>
      <Tag size="m" color="red">
        medium red
      </Tag>
      <Tag size="s" color="ghost">
        medium ghost
      </Tag>
      <Tag href="https://google.com" size="m" color="gray">
        google
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
      <ul>
        {menu.map(item => (
          <li key={item._id.secondCategory}>{item._id.secondCategory}</li>
        ))}
      </ul>
      <Input placeholder="placeholder" />
      <Textarea placeholder="Teкст отзыва" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
