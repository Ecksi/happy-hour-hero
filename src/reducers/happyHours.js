export const happyHours = (state = [], action) => {
  switch (action.type) {
    case 'STORE_HAPPY_HOURS':
      return [...action.happyHour];
    default:
      return state;
  }
};  