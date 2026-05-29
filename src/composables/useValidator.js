import { reactive } from 'vue'

const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

const messages = {
  fullNameRequired:        'សូមបំពេញឈ្មោះរបស់អ្នក',
  fullNameMin:             'ឈ្មោះត្រូវតែមានយ៉ាងហោចណាស់ 2 តួអក្សរ',
  emailRequired:           'សូមបំពេញអ៊ីមែលរបស់អ្នក',
  emailInvalid:            'អ៊ីមែលមិនត្រឹមត្រូវទម្រង់ សូមបញ្ចូលឡើងវិញ',
  passwordRequired:        'សូមបំពេញពាក្យសម្ងាត់របស់អ្នក',
  passwordMin:             'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ',
  passwordStrong:          'ពាក្យសម្ងាត់ត្រូវតែមានអក្សរធំ លេខ និងតួអក្សរពិសេសមួយ',
  passwordConfirmRequired: 'សូមបំពេញពាក្យសម្ងាត់បញ្ជាក់របស់អ្នក',
  passwordMismatch:        'ពាក្យសម្ងាត់បញ្ជាក់មិនត្រឹមត្រូវ',
  termsRequired:           'សូមយល់ព្រមលើលក្ខខណ្ឌប្រើប្រាស់',
}

export function useValidator(fields = []) {
  const errors = reactive(
    fields.reduce((acc, field) => {
      acc[field] = ''
      return acc
    }, {}),
  )

  const clearFieldError = (field) => {
    if (field in errors) errors[field] = ''
  }

  const clearErrors = () => {
    Object.keys(errors).forEach((f) => (errors[f] = ''))
  }

  const hasErrors = () => Object.values(errors).some(Boolean)

  const validateLogin = (form) => {
    clearErrors()

    if (!form.email.trim()) {
      errors.email = messages.emailRequired
    } else if (!emailPattern.test(form.email.trim())) {
      errors.email = messages.emailInvalid
    }

    if (!form.password) {
      errors.password = messages.passwordRequired
    } else if (form.password.length < 8) {
      errors.password = messages.passwordMin
    }

    return !hasErrors()
  }

  const validateRegister = (form) => {
    clearErrors()

    if (!form.fullName.trim()) {
      errors.fullName = messages.fullNameRequired
    } else if (form.fullName.trim().length < 2) {
      errors.fullName = messages.fullNameMin
    }

    if (!form.email.trim()) {
      errors.email = messages.emailRequired
    } else if (!emailPattern.test(form.email.trim())) {
      errors.email = messages.emailInvalid
    }

    if (!form.password) {
      errors.password = messages.passwordRequired
    } else if (form.password.length < 8) {
      errors.password = messages.passwordMin
    }

    if (!form.passwordConfirmation) {
      errors.passwordConfirmation = messages.passwordConfirmRequired
    } else if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = messages.passwordMismatch
    }

    if (!form.acceptedTerms) {
      errors.acceptedTerms = messages.termsRequired
    }

    return !hasErrors()
  }

  const validateForgetPassword = (form) => {
    clearErrors()

    if (!form.email.trim()) {
      errors.email = messages.emailRequired
    } else if (!emailPattern.test(form.email.trim())) {
      errors.email = messages.emailInvalid
    }

    return !hasErrors()
  }

  const validateResetPassword = (form) => {
    clearErrors()

    if (!form.password) {
      errors.password = messages.passwordRequired
    } else if (form.password.length < 8) {
      errors.password = messages.passwordMin
    }

    if (!form.passwordConfirmation) {
      errors.passwordConfirmation = messages.passwordConfirmRequired
    } else if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = messages.passwordMismatch
    }

    return !hasErrors()
  }

  return {
    errors,
    hasErrors,
    clearFieldError,
    clearErrors,
    validateLogin,
    validateRegister,
    validateForgetPassword,
    validateResetPassword,
  }
}