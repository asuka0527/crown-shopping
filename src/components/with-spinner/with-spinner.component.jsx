import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// create a HOC higher order component - a component that takes in another component

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerContainer>
        <SpinnerOverlay />
      </SpinnerContainer>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;

// BIG QUESTION - where do we put this HOC spinner? the best place would be the where the data will come in which is ShopPage component
