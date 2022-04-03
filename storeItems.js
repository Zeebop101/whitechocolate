const getStoreItems = () => {
  let storeItems = [];
  storeItems.push({ priceInEuro: 25, name: "Regular Ticket" });
  storeItems.push({ priceInEuro: 35, name: "Premium Ticket" });
  storeItems.push({ priceInEuro: 45, name: "VIP Ticket" });
  return storeItems;
};

module.exports = {
  getStoreItems,
};
