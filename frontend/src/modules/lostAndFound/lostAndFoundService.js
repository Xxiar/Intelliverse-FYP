// src/modules/lostAndFound/lostAndFoundService.js
let mockData = [];
let counter = 1;

export const getItems = async () => {
  return mockData;
};

export const addItem = async (item) => {
  item.id = counter++;
  mockData.push(item);
};

export const claimItem = async (itemId, userId) => {
  const item = mockData.find((i) => i.id === itemId);
  if (item && item.status === "active") {
    item.claimedBy = userId;
    item.claimedAt = new Date().toISOString();
    item.status = "claimed";
  }
};
