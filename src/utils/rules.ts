import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
type Rules = { [key in 'email' | 'password' | 'confirm_password' | 'username' | 'fullName']?: RegisterOptions }
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
  username: {
    required: {
      value: true,
      message: 'username required'
    },
    maxLength: {
      value: 20,
      message: 'number of characters: 0-160'
    }
  },
  fullName: {
    required: {
      value: true,
      message: 'fullname required'
    },
    maxLength: {
      value: 30,
      message: 'number of characters: 0-160'
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
        ? (value) => value === getValues('password') || 'password do not match'
        : undefined
  }
})
