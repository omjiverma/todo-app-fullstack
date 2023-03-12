const addUserToLocalStorage = ({ userId, user, email }) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', user);
    localStorage.setItem('email', email);
};

export default addUserToLocalStorage;