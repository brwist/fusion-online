import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { parse as parseQs } from "qs";
import { asSortParams } from "@saleor/utils/sort";
import { getArrayQueryParam } from "@saleor/utils/urls";

import {
  ProductListUrlQueryParams,
  ProductListUrlSortField
} from "../products/urls";
import ProductListComponent from "../products/views/ProductList";
import { pricingListPath } from "./urls";

const ProductList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ProductListUrlQueryParams = asSortParams(
    {
      ...qs,
      categories: getArrayQueryParam(qs.categories),
      collections: getArrayQueryParam(qs.collections),
      ids: getArrayQueryParam(qs.ids),
      productTypes: getArrayQueryParam(qs.productTypes)
    },
    ProductListUrlSortField
  );

  return <ProductListComponent params={params} />;
};

const Component = () => (
  <Route exact path={pricingListPath} component={ProductList} />
);

export default Component;
