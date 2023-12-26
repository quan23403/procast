import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
type Rules = {
  [key in 'email' | 'password' | 'confirm_password' | 'username' | 'fullName' | 'digitCode']?: RegisterOptions
}
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng điền email!'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không hợp lệ!'
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
  digitCode: {
    required: {
      value: true,
      message: 'Vui lòng nhập mã!'
    },
    maxLength: {
      value: 10,
      message: 'number of characters: 1-10'
    },
    minLength: {
      value: 1,
      message: 'number of characters: 1-10'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng điền mật khẩu!'
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
      message: 'Vui lòng điền username!'
    },
    maxLength: {
      value: 20,
      message: 'number of characters: 0-160'
    }
  },
  fullName: {
    required: {
      value: true,
      message: 'Vui lòng điền họ và tên!'
    },
    maxLength: {
      value: 30,
      message: 'number of characters: 0-160'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng nhập mật khẩu xác nhận!'
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
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'Mật khẩu không khớp' : undefined
  }
})
