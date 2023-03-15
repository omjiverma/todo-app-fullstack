// This function adds user data to the browser's local storage
const addUserToLocalStorage = ({ userId, user, email }) => {
    // Set the user data in local storage using the keys 'userId', 'user', and 'email'
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', user);
    localStorage.setItem('email', email);
  };

export default addUserToLocalStorage;