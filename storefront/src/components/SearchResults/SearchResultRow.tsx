import React from 'react';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';

import { Product } from '../../generated/graphql'

import './searchresults.scss';

export interface SearchResultRowProps {
  otherData: {
    saved: boolean,
    status?: string | undefined,
  },
  productData: Product,
}
export const SearchResultRow: React.FC<SearchResultRowProps> = ({ otherData: {
  saved,
  status},
  productData: {
    name,
    variants,
    attributes,
    pricing
  }
}) => {
  function getAttributeValue (slugName: string): any {
    const matchingAttribute = attributes.filter(
      ({attribute: {slug}}) => slug === slugName)
    return matchingAttribute[0] && matchingAttribute[0].values[0]?.name
  }

  return (<tr>
    <td className="pr-0">
      {saved ? <FontAwesomeIcon icon={fasFaBookmark} className="text-primary" />
        : <FontAwesomeIcon icon={farFaBookmark} />}
    </td>
    <td>
      <div className="small">
        <strong className="text-uppercase">{getAttributeValue("manufacturer")}</strong> {variants && variants[0]?.sku}
      </div>
      <a href="#">{name}</a>
      <div className="small mt-1">
        Spec Code: {getAttributeValue("spec-code")} | Ordering Code: {getAttributeValue("ordering-code")}
      </div>
    </td>
    <td className="text-center">{status}</td>
    <td className="text-center">{variants && variants[0]?.quantityAvailable}</td>
    <td className="text-center">${pricing?.priceRangeUndiscounted?.start?.gross.amount}</td>
    <td className="text-center">
      <Button>
        Select Quantity
      </Button>
    </td>
  </tr>)
}
