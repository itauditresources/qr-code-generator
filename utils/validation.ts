export const validateEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
};

export const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string
): boolean => {
    return password === passwordConfirm;
};

export const validateName = (name: string): boolean => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
};

export const validatePhone = (phone: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
};

export const validateLandline = (landline: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(landline);
};
