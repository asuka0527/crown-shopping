import React from "react";
import StripeCheckout from "react-stripe-checkout";

// price should be in cents
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;

  // From stripe -> developer
  const publishableKey =
    "pk_test_51I6xQDGRp8mpff21laZPs5ndPRTp1LzbMsfr3qbaaly6zpAHzdYJvy9WywdxoVZ8UX5wuxoIGvqqpINw2IqpUsLU00qVFAZk96";

  // token is what you pass into the backend for the successful payment
  const onToken = (token) => {
    console.log(token);
    alert("Successful payment");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
