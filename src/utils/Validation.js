export const validateSignup = (data) => {
  const errors = {}
  
  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
  }
  
  if (!/[A-Z]/.test(data.password)) {
    errors.password = errors.password 
      ? errors.password + ', include uppercase letter' 
      : 'Password must include at least one uppercase letter'
  }
  
  if (!/[a-z]/.test(data.password)) {
    errors.password = errors.password 
      ? errors.password + ', lowercase letter' 
      : 'Password must include at least one lowercase letter'
  }
  
  if (!/[0-9]/.test(data.password)) {
    errors.password = errors.password 
      ? errors.password + ', number' 
      : 'Password must include at least one number'
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
    errors.password = errors.password 
      ? errors.password + ', special character' 
      : 'Password must include at least one special character'
  }
  
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  return errors
}