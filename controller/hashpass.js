import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
    const saltRounds = 12;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
