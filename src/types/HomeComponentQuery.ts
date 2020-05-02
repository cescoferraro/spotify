/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeComponentQuery
// ====================================================

export interface HomeComponentQuery_categoriesPaginated_categories_icons {
  __typename: "Image";
  url: string | null;
}

export interface HomeComponentQuery_categoriesPaginated_categories {
  __typename: "Category";
  id: string | null;
  name: string | null;
  icons: (HomeComponentQuery_categoriesPaginated_categories_icons | null)[] | null;
}

export interface HomeComponentQuery_categoriesPaginated {
  __typename: "CategoriesPaginated";
  total: number | null;
  categories: (HomeComponentQuery_categoriesPaginated_categories | null)[] | null;
}

export interface HomeComponentQuery {
  categoriesPaginated: HomeComponentQuery_categoriesPaginated | null;
}
