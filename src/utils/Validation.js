// src/utils/validation.js

export const validateSignup = (formData) => {
  const errors = {}
  const { name, email, password, confirmPassword } = formData

  // Name validation
  if (!name || name.trim() === '') {
    errors.name = 'Full name is required'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required'
  } else {
    const passwordChecks = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      minLength: password.length >= 8
    }

    const failedChecks = Object.entries(passwordChecks)
      .filter(([_, passed]) => !passed)
      .map(([check]) => check)

    if (failedChecks.length > 0) {
      errors.password = 'Password must meet all requirements'
    }
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export const validateLogin = (formData) => {
  const errors = {}
  const { email, password } = formData

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}

export const validateResume = (resumeData) => {
  const errors = {}
  const { title, personalInfo, experience, education } = resumeData

  // Title validation
  if (!title || title.trim() === '') {
    errors.title = 'Resume title is required'
  }

  // Personal info validation
  if (personalInfo) {
    if (!personalInfo.fullName || personalInfo.fullName.trim() === '') {
      errors.fullName = 'Full name is required'
    }
    if (!personalInfo.email || personalInfo.email.trim() === '') {
      errors.personalEmail = 'Email is required'
    }
  }

  // Experience validation
  if (experience && experience.length > 0) {
    experience.forEach((exp, index) => {
      if (!exp.company || exp.company.trim() === '') {
        errors[`experience_${index}_company`] = 'Company name is required'
      }
      if (!exp.position || exp.position.trim() === '') {
        errors[`experience_${index}_position`] = 'Position is required'
      }
    })
  }

  return errors
}