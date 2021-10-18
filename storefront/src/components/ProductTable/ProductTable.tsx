import React from 'react';
import { Card, Table } from 'react-bootstrap';
import {ProductTableRow} from './ProductTableRow';
import {Product} from '../../generated/graphql'
import { ScrollToTopOnMount } from '../../utils/ScrollToTopOnMount'
import './producttable.scss';

type ProductData = {
  otherData: {
    saved: boolean,
    status: string
  },
  product: Product
}

export interface ProductTableProps {
  loading: boolean,
  productData: Array<{node: Product}>,
  addItem?: any,
  updateSelectedProduct: (productName: string) => void,
  updateSelectedQuantity: (quantity: number) => void,
  showItemAddedAlert: () => void
}

export const ProductTable: React.FC<ProductTableProps> = ({
  loading,
  productData,
  addItem,
  updateSelectedProduct,
  updateSelectedQuantity,
  showItemAddedAlert
}) => {

  if (loading) {
    return (
      <>
        <ScrollToTopOnMount />
        <h5>Loading...</h5>
      </>
    )
  }

  if (productData?.length === 0) {
    return (
      <>
        <ScrollToTopOnMount />
        <h5>No Products</h5>
      </>
    )
  }
  console.log(productData)
  return (
    <Card className="search-results">
      <ScrollToTopOnMount />
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
          {productData?.map(({node}) => {
            return (
              <ProductTableRow
                key={node.id}
                product={node}
                addItem={addItem}
                showItemAddedAlert={showItemAddedAlert}
                updateSelectedProduct={updateSelectedProduct}
                updateSelectedQuantity={updateSelectedQuantity}
              />
            )
          })}
        </tbody>
      </Table>
    </Card>
  );
};
