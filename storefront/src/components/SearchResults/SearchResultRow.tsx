import React from 'react';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';

import { Product } from '../../generated/graphql'

import './searchresults.scss';

export interface SearchResultRowProps {
  otherData: {
    saved: boolean | undefined,
    brand: string,
    sku: number,
    specCode: number,
    orderingCode: number,
    status: string,
    qtyAvailable: number,
    price: number
  },
  productData: Product,
}
export const SearchResultRow: React.FC<SearchResultRowProps> = ({ otherData: {
  saved,
  brand,
  sku,
  specCode,
  orderingCode,
  status,
  qtyAvailable,
  price},
  productData

}) => {
  return (<tr>
    <td className="pr-0">
      {saved ? <FontAwesomeIcon icon={fasFaBookmark} className="text-primary" />
        : <FontAwesomeIcon icon={farFaBookmark} />}
    </td>
    <td>
      <div className="small">
        <strong>{brand}</strong> {sku}
      </div>
      <a href="#">{productData.name}</a>
      <div className="small mt-1">
        Spec Code: {specCode} | Ordering Code: {orderingCode}
      </div>
    </td>
    <td className="text-center">{status}</td>
    <td className="text-center">{qtyAvailable}</td>
    <td className="text-center">{price}</td>
    <td className="text-center">
      <Button>
        Select Quantity
      </Button>
    </td>
  </tr>)
}
