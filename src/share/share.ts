export const moneyComma = (money: number) => {
  if (money) {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
};
