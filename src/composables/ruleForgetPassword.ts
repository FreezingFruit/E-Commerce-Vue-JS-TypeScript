import type { FormRules } from 'element-plus'

const emailPattern = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
const passwordPattern =
  /^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-zÑñ\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

const validateEmail = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!emailPattern.test(value.trim())) {
      return callback(new Error(`Please enter a valid ${fieldName}`))
    }
    callback()
  }
}

const validatePassword = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    console.log(value)

    if (!passwordPattern.test(value.trim())) {
      return callback(new Error('Minimum of 8 characters, 1 uppercase, 1 special character '))
    }
    callback()
  }
}

export const forgetFormRules: FormRules = {
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    {
      validator: validateEmail('email'),
      trigger: 'blur',
    },
  ],

  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    {
      validator: validatePassword('password'),
      trigger: 'blur',
    },
  ],
}
