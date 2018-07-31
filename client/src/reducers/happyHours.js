export const happyHours = (state = [], action) => {
  switch (action.type) {
    case 'STORE_HAPPY_HOURS':
      return [...state, ...action.happyHour];
    default:
      return state;
  }
};  