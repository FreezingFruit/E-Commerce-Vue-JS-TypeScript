import type { FormRules } from 'element-plus'

const emailPattern = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
const namePattern = /^[A-Za-z\s'-]+$/
const phonePattern = /^(09|\+639)\d{9}$/
const passwordPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/

//VALIDATOR FUNCTIONS
const validateEmail = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!emailPattern.test(value.trim())) {
      return callback(new Error('Invalid Email Syntax'))
    }
    callback()
  }
}

const validatePassword = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!passwordPattern.test(value.trim())) {
      return callback(new Error('Invalid Password Syntax'))
    }
    callback()
  }
}

const validateFirstName = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!namePattern.test(value.trim())) {
      return callback(new Error('Invalid Inputs!'))
    }
    if (value.trim().length < 2 || value.trim().length > 100) {
      return callback(new Error('Invalid Length'))
    }
    callback()
  }
}

const validatePhone = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!phonePattern.test(value.trim())) {
      return callback(new Error('Invalid Inputs!'))
    }
    callback()
  }
}
export const userFormRules: FormRules = {
  email: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur',
    },
    { validator: validateEmail('email'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    {
      validator: validatePassword('password'),
      trigger: 'blur',
    },
  ],
  firstName: [
    { required: true, message: 'Please enter your name', trigger: 'blur' },
    {
      validator: validateFirstName('first name'),
      trigger: 'blur',
    },
  ],
  phone: [
    { required: true, message: 'Please enter your phone number', trigger: 'blur' },
    {
      validator: validatePhone('phone'),
      trigger: 'blur',
    },
  ],
}
