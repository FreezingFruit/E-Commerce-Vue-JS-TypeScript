import type { FormRules } from 'element-plus'

const emailPattern = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
const passwordPattern =
  /^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-zÑñ\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

//VALIDATOR FUNCTIONS
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

// const validatePassword = (fieldName: string) => {
//   return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
//     if (!value || value.trim() === '') {
//       return callback(new Error(`Please input ${fieldName}`))
//     }
//     console.log(value)

//     if (!passwordPattern.test(value.trim())) {
//       return callback(new Error('Minimum of 8 characters, 1 uppercase, 1 special character '))
//     }
//     callback()
//   }
// }

// const validateConfirmPassword = (fieldName: string, getpassword: () => string) => {
//   return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
//     const originalPassword = getpassword()

//     if (!value || value.trim() === '') {
//       return callback(new Error(`Please input ${fieldName}`))
//     }
//     if (!originalPassword || originalPassword.trim() === '') {
//       return callback()
//     }

//     if (value !== originalPassword) {
//       return callback(new Error('Passwords do not match'))
//     }

//     callback()
//   }
// }

//RULES
export const userFormRules = (form: { password: string }, currentMode: string): FormRules => ({
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: ['blur', 'change'] },
    { validator: validateEmail('email'), trigger: 'blur' },
  ],
  password:
    currentMode === 'register'
      ? [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!value || !passwordPattern.test(value)) {
                callback(new Error('Minimum of 8 characters, 1 uppercase, 1 special character'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ]
      : [{ required: true, message: 'Please enter your password', trigger: 'blur' }],
  confirmPassword:
    currentMode === 'register'
      ? [
          { required: true, message: 'Please confirm your password', trigger: 'blur' },
          {
            validator: (_, value, callback) => {
              if (value !== form.password) {
                callback(new Error('Passwords do not match'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change'],
          },
        ]
      : [],
})
