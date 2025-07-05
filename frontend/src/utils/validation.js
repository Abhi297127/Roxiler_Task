export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\W).{8,16}$/.test(password);
  };
  