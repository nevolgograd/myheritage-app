import React from "react";

import type { PropertyDeal } from "src/features/Property/components/types";

import styles from "./styles.module.css";

type Props = {
  deal: PropertyDeal;
};

function DealCard({ deal }: Props) {
  const price = deal.userData?.askingPrice
    ? new Intl.NumberFormat("us", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(deal.userData.askingPrice)
    : "-";

  const livingArea = deal.zillowData?.livingAreaValue
    ? new Intl.NumberFormat("en-US").format(deal.zillowData.livingAreaValue)
    : "-";

  return (
    <a
      className={styles.dealLink}
      href="https://www.opendoor.com/properties/8379-begonia-st-spring-hill-fl-34608/aid_75ed2ff4-4a44-5db4-9492-f99d2cb16879"
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.dealCard}>
        <div className="property-image-container">
          <div className="badge">
            <img
              width="8"
              alt="Opendoor"
              src="data:image/svg+xml,%3csvg width='8' height='10' viewBox='0 0 8 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.666992 3.83829C0.666992 1.08735 2.45219 0 4.03977 0C5.73592 0 7.3335 1.07725 7.3335 3.67163C7.3335 6.44328 5.5483 7.49982 3.96072 7.49982C2.26457 7.49982 0.666992 6.34934 0.666992 3.83829ZM5.46021 3.90091C5.46021 1.4535 5.06546 0.438878 3.98072 0.438878C3.02408 0.438878 2.54076 1.14997 2.54076 3.62062C2.54076 6.05793 2.91551 7.06195 4.02024 7.06195C4.99641 7.06043 5.45973 6.35944 5.45973 3.90142L5.46021 3.90091ZM7.29045 9.6019C7.31795 9.63651 7.33309 9.67913 7.3335 9.72312V9.89615C7.3335 9.95337 7.28649 9.99976 7.22851 9.99976H0.771977C0.713995 9.99976 0.666992 9.95337 0.666992 9.89615V9.7226C0.667255 9.67892 0.682005 9.63653 0.708986 9.6019L1.57458 8.46841C1.64591 8.38094 1.75427 8.33101 1.86801 8.3332H6.13143C6.24517 8.33101 6.35353 8.38094 6.42486 8.46841L7.29045 9.6019Z' fill='%231C85E8'/%3e %3c/svg%3e"
            />
            <span>Opendoor</span>
          </div>

          <img
            className="property-image"
            src="https://images.opendoor.com/source/s3/cabinet-assets/production/storage/09ebc0fb-2733-4640-bb08-3623e0ca1506.jpg?service=buyer&amp;token=452bb9d38c76f4cdd8f9e67f0110ec0184e3a1c02a6eaa8d858cb9b3b9b63f0a&amp;w=768"
            alt="8379 Begonia St view 1"
          />

          <button className="fave" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 471.701 471.701"
            >
              <path
                strokeWidth="5px"
                stroke="#000000"
                d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"
              />
            </svg>
          </button>
        </div>

        <div className="property-content">
          <h1>{price}</h1>

          <p>
            <span>{deal.zillowData?.bedrooms ?? "-"}bd</span>
            <span>{deal.zillowData?.bathrooms ?? "-"}ba</span>
            <span>{livingArea} ft²</span>
          </p>

          <p>
            <span>built in {deal.zillowData?.yearBuilt ?? "-"}</span>
            <span>{deal.zillowData?.lotSize ?? "-"} lot size</span>
          </p>

          <p>{deal.address?.formattedAddress?.split(",")?.[0] ?? "-"}</p>

          <p>
            {deal.address?.locality ?? "-"}, {deal.address?.stateCode ?? "-"}
          </p>
        </div>
      </div>
    </a>
  );
}

export { DealCard };
