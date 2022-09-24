const getrandomNumber = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
};

const gettheTurn = () => {
    return getrandomNumber(1, 6);
  }

export { getrandomNumber, gettheTurn };