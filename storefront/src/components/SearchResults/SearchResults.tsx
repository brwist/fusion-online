import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/free-solid-svg-icons';

import './searchresults.scss';

export interface SearchResultsProps {}

export const SearchResults: React.FC<SearchResultsProps> = ({
  ...props
}) => {
  return (
    <div className="search-results">
      <Table striped borderless responsive>
        <thead>
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
          <tr>
            <td className="pr-0">
              <FontAwesomeIcon icon={farFaBookmark} />
            </td>
            <td>
              <div className="small">
                <strong>INTEL</strong> 123456789
              </div>
              <a href="#">Intel® Pentium® Gold 7505 Processor</a>
              <div className="small mt-1">
                Spec Code: 123456 | Ordering Code: 123456
              </div>
            </td>
            <td className="text-center">Incoming Stock</td>
            <td className="text-center">10,000</td>
            <td className="text-center">$000.00</td>
            <td className="text-center">
              <Button>
                Select Quantity
              </Button>
            </td>
          </tr>
          <tr>
            <td className="pr-0">
              <FontAwesomeIcon icon={fasFaBookmark} className="text-primary" />
            </td>
            <td>
              <div className="small">
                <strong>INTEL</strong> 123456789
              </div>
              <a href="#">Intel® Pentium® Gold 7505 Processor</a>
              <div className="small mt-1">
                Spec Code: 123456 | Ordering Code: 123456
              </div>
            </td>
            <td className="text-center">Incoming Stock</td>
            <td className="text-center">10,000</td>
            <td className="text-center">$000.00</td>
            <td className="text-center">
              <Button
                variant="primary"
                size="sm"
              >
                Select Quantity
              </Button>
            </td>
          </tr>
          <tr>
            <td className="pr-0">
              <FontAwesomeIcon icon={farFaBookmark} />
            </td>
            <td>
              <div className="small">
                <strong>INTEL</strong> 123456789
              </div>
              <a href="#">Intel® Pentium® Gold 7505 Processor</a>
              <div className="small mt-1">
                Spec Code: 123456 | Ordering Code: 123456
              </div>
            </td>
            <td className="text-center">Incoming Stock</td>
            <td className="text-center">10,000</td>
            <td className="text-center">$000.00</td>
            <td className="text-center">
              <Button>
                Select Quantity
              </Button>
            </td>
          </tr>
          <tr>
            <td className="pr-0">
              <FontAwesomeIcon icon={farFaBookmark} />
            </td>
            <td>
              <div className="small">
                <strong>INTEL</strong> 123456789
              </div>
              <a href="#">Intel® Pentium® Gold 7505 Processor</a>
              <div className="small mt-1">
                Spec Code: 123456 | Ordering Code: 123456
              </div>
            </td>
            <td className="text-center">Incoming Stock</td>
            <td className="text-center">10,000</td>
            <td className="text-center">$000.00</td>
            <td className="text-center">
              <Button>
                Select Quantity
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
