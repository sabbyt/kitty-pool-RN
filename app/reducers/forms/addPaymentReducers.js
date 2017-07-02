//@flow
const initialState = {
  date: '',
  total: 0,
  paidBy: '',
  description: '',
  splitBetween: [],
  tags: []
}

export const ACTIONS = {
  SET_PAYMENT_DATE: 'SET_PAYMENT_DATE',
  SET_PAYMENT_TOTAL: 'SET_PAYMENT_TOTAL',
  SET_PAID_BY: 'SET_PAID_BY',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_SPLIT_BETWEEN: 'SET_SPLIT_BETWEEN',
  SET_PAYMENT_TAGS: 'SET_PAYMENT_TAGS',
  SET_CLEAR: 'SET_PAYMENT_CLEAR'
}

export default (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SET_PAYMENT_DATE:
      return {
        ...state,
        date: action.date
      }
    case ACTIONS.SET_PAYMENT_TOTAL:
      return {
        ...state,
        total: action.total
      }
    case ACTIONS.SET_PAID_BY:
      return {
        ...state,
        paidBy: action.paidBy
      }
    case ACTIONS.SET_DESCRIPTION:
      return {
        ...state,
        description: action.description
      }
    case ACTIONS.SET_SPLIT_BETWEEN:
      var newSplit = [...state.splitBetween];
      newSplit.push(action.user);
      return {
        ...state,
        splitBetween: newSplit
      }
    case ACTIONS.SET_PAYMENT_TAGS:
      return {
        ...state,
        tags: [...state.tags].push(action.tag)
      }
    case ACTIONS.SET_CLEAR:
      return initialState
    default:
      return state
  }
}
