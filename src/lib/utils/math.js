export const getRandomNumber = (max) => {
  return Math.floor((Math.random() * max) + 0);
};

export const getNextRoundRobin = (current, total) => {
  return (current + 1) % total;
};
