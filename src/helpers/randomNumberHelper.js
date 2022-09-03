const getrandomNumber = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
};

export { getrandomNumber };