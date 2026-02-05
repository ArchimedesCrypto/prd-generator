// Payment configuration - modify these values for your application
export const PAYMENT_CONFIG = {
  // One-time credit purchase
  creditPack: {
    price_id: "price_1SVR4dDHrc5S2eBwTmwqGYhC",
    product_id: "prod_TSLmojRUaBsAry",
    amount: 999, // in cents ($9.99)
    credits: 10,
    name: "Credit Pack",
    description: "10 credits for document generation",
  },
  
  // Monthly subscription
  subscription: {
    price_id: "price_1SVR4uDHrc5S2eBw4w1UXim6",
    product_id: "prod_TSLmKP2A2alEfY",
    amount: 1599, // in cents ($15.99)
    credits: 30,
    name: "Credit Subscription",
    description: "30 credits per month",
    interval: "month",
  },
} as const;

// Helper function to format price
export const formatPrice = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};
