const removeUserFromLocalStorage = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
};

export default removeUserFromLocalStorage;