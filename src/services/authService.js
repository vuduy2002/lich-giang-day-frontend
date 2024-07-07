import axios from 'axios';

const API_URL = '/lecturers';

export const login = async (userId, password) => {
    const response = await axios.get(API_URL);
    const users = response.data;

    const user = users.find(
        (user) => user.lecturerId === userId && user.password === password,
    );
    // lưu username password vao localStorage
    if (user) {
        console.log(user);
        const userDataWithoutPass = (ob) => {
            const { _id, password, lecturerId, ...rest } = ob;
            return rest;
        };
        const userInfor = userDataWithoutPass(user);

        //mã hóa b64
        const tokenID = btoa(`${user.lecturerId}`);
        const roleUser = user.isAdmin === true ? 'admin' : 'lecturer';
        localStorage.setItem(
            'user',
            JSON.stringify({ tokenID, dataUser: userInfor, role: roleUser }),
        );
        return { tokenID, role: roleUser, dataUser: userInfor };
    }
    throw new Error('Invalid credentials');
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
};
