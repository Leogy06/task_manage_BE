import bcrypt from "bcryptjs";

export const hashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  inputPassword: string,
  password: string
) => {
  return await bcrypt.compare(inputPassword, password);
};
