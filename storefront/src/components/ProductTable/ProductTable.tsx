import React from 'react';
import { Card, Table } from 'react-bootstrap';
import {ProductTableRow, ProductTableRowProps} from './ProductTableRow';

import './producttable.scss';

export interface ProductTableProps {
  loading: boolean,
  productData: Array<ProductTableRowProps>
}

export const ProductTable: React.FC<ProductTableProps> = ({
  loading, productData
}) => {

  if (loading) {
    return <h5>Loading...</h5>
  }

  if (productData?.length === 0) {
    return <h5>No Products</h5>
  }
  return (
    <Card className="search-results">
      <Table striped borderless responsive>
        <thead className="bg-dark text-white">
          <tr>
            <th></th>
            <th>Product</th>
            <th className="text-center">Status</th>
            <th className="text-center">Qty Available</th>
            <th className="text-center">Price Per Unit</th>
            <th className="text-center">Order/RFQ</th>
          </tr>
        </thead>
        <tbody>
          {productData?.map(({otherData, product}) => {
            return (
              <ProductTableRow
                key={product.id}
                otherData={otherData}
                product={product}
              />
            )
          })}
        </tbody>
      </Table>
    </Card>
  );
};
