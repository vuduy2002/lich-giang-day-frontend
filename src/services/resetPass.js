import axios from 'axios';



export const postEmail = async (email) => {
    return await axios.post(`${process.env.REACT_APP_API}/request-reset`, { email });
};

export const postCodeVerify = async (email, verificationCode) => {
    return await axios.post(`${process.env.REACT_APP_API}/verify-code`, { email, code: verificationCode });
};

export const postUpdatePass = async (email, newPassword) => {
    return await axios.post(`${process.env.REACT_APP_API}/update-password`, { email, newPassword });
};

