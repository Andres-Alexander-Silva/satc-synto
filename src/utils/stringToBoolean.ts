export const convertStringToBoolean = (value: string) => {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return false;
  }
};

export const converStringToNumber = (value: string) => {
  return Number(value);
};
