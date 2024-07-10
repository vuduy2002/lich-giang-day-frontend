import axios from 'axios';

const API_URL = '/lecturers';

export const login = async (userId, password) => {
    if (password.length < 6) {
        throw new Error('Password too short');
    }

    const response = await axios.get(API_URL);
    const users = response.data;

    const user = users.find(user => user.lecturerId === userId);

    if (!user) {
        throw new Error('Invalid userId');
    }

    if (user.password !== password) {
        throw new Error('Invalid password');
    }

    const userDataWithoutPass = (ob) => {
        const { _id, password, lecturerId, ...rest } = ob;
        return rest;
    };
    const userInfor = userDataWithoutPass(user);

    const tokenID = btoa(`${user.lecturerId}`);
    const roleUser = user.isAdmin === true ? 'admin' : 'lecturer';
    localStorage.setItem(
        'user',
        JSON.stringify({ tokenID, dataUser: userInfor, role: roleUser }),
    );
    return { tokenID, role: roleUser, dataUser: userInfor };
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
};
