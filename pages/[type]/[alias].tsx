import axios from 'axios';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext } from 'next';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head';

function TopPage({ page, products, firstCategory }: TopPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription}></meta>
        <meta property="og:title" content={page.metaTitle}></meta>
        <meta property="og:description" content={page.metaDescription}></meta>
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent page={page} products={products} firstCategory={firstCategory} />
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: GetStaticPathsResult['paths'] = [];

  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: menuItem.id
    });

    paths.push(
      ...menu.flatMap(item =>
        item.pages.flatMap(page => {
          return {
            params: {
              type: menuItem.route,
              alias: page.alias
            }
          };
        })
      )
    );
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return { notFound: true };
  }

  const firstCategoryItem = firstLevelMenu.find(item => item.route === params.type);

  if (!firstCategoryItem) {
    return { notFound: true };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });

    if (!menu.length) {
      return { notFound: true };
    }

    const { data: page } = await axios.get<TopPageModel>(`${API.topPage.byAlias}${params.alias}`);

    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10
    });

    return {
      props: {
        menu,
        page,
        products,
        firstCategory: firstCategoryItem.id
      }
    };
  } catch {
    return { notFound: true };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
