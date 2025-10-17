import type { FormItemRule } from 'element-plus'

const passwordPattern =
  /^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-zÑñ\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

export const signInPageFormRules = (
  form: { email: string; password: string; confirmPassword?: string },
  mode: 'login' | 'register',
) => {
  const baseRules = {
    email: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Please input a valid email', trigger: 'blur' },
    ],
    password: [
      { required: true, message: 'Password is required', trigger: 'blur' },
      { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
      {
        pattern: passwordPattern,
        message: 'Minimum of 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character',
        trigger: 'blur',
      },
    ],
  }

  if (mode === 'register') {
    return {
      ...baseRules,
      confirmPassword: [
        {
          required: true,
          message: 'Please confirm your password',
          trigger: 'blur',
        },
        {
          validator: (
            rule: FormItemRule,
            value: string,
            callback: (error?: string | Error) => void,
          ) => {
            if (!value) {
              callback(new Error('Please confirm your password'))
            } else if (value !== form.password) {
              callback(new Error('Passwords do not match'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change'],
        },
      ],
    }
  }

  return baseRules
}
