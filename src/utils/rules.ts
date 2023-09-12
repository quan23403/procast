export const rules = {
  email: {
    required: {
      value: true,
      message: 'Email required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email'
    }
  }
}
