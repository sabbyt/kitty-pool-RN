//@flow
import { ACTIONS } from '../../reducers/forms/addPaymentReducers';

export const setPaymentDate = (date) => {
  return {
    type: ACTIONS.SET_PAYMENT_DATE,
    date
  }
}

export const setPaymentTotal = (total) => {
  return {
    type: ACTIONS.SET_PAYMENT_TOTAL,
    total
  }
}

export const setPaidBy = (paidBy) => {
  return {
    type: ACTIONS.SET_PAID_BY,
    paidBy
  }
}

export const setPaymentDescription = (description) => {
  return {
    type: ACTIONS.SET_DESCRIPTION,
    description
  }
}

export const removeUserSplit = (splitBetween) => {
  return {
    type: ACTIONS.SET_SPLIT_BETWEEN,
    splitBetween
  }
}

export const addPaymentTag = (tag) => {
  return {
    type: ACTIONS.SET_PAYMENT_TAGS,
    tag
  }
}

export const clearPaymentForm = () => {
  return {
    type: ACTIONS.SET_CLEAR,
  }
}
