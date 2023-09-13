import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email'
    },
    maxLength: {
      value: 160,
      message: 'number of characters: 5-160'
    },
    minLength: {
      value: 5,
      message: 'number of characters: 5-160'
    }
  },
  password: {
    required: {
      value: true,
      message: 'password required'
    },
    maxLength: {
      value: 160,
      message: 'number of characters: 6-160'
    },
    minLength: {
      value: 6,
      message: 'number of characters: 6-160'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Validate password required'
    },
    maxLength: {
      value: 160,
      message: 'number of characters: 6-160'
    },
    minLength: {
      value: 6,
      message: 'number of characters: 6-160'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'password don not match'
        : undefined
  }
})
