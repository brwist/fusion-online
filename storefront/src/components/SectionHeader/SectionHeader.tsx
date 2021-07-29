import React from 'react';

import './sectionheader.scss'

export interface SectionHeaderProps {
  subheading: String,
  heading: String
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({subheading, heading}) => {
  return (
    <header className="mb-5 border-bottom d-flex justify-content-between align-items-center">
      <div>
        <div className="small section-header pb-3">
          <svg width="35px" height="15px" viewBox="0 0 35 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Member" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Components" transform="translate(-160.000000, -2982.000000)" fill="#DDDDDD">
                <g id="CPU---Single-Order" transform="translate(160.000000, 2894.000000)">
                  <g id="subheading-scale" transform="translate(0.000000, 88.000000)">
                    <polygon className="active" id="Rectangle1" points="8.37051392 0 15.3705139 0 7 14.2763062 1.00255103e-14 14.2763062"></polygon>
                    <polygon className="active" id="Rectangle2" points="17.3705139 0 24.3705139 0 16 14.2763062 9 14.2763062"></polygon>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          {subheading}
      </div>
      <h1>{heading}</h1>
    </div>
  </header>
  )
}