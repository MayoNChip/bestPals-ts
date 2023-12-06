import bcrypt from "bcrypt";

const SaltRounds = process.env.SALT_ROUNDS!;
const saltRounds = Number(SaltRounds);

const hash = (value: string) => {
  return bcrypt.hashSync(value, saltRounds);
};

const checkHash = (value: string, hashed: string) => {
  return bcrypt.compareSync(value, hashed);
};

export { hash, checkHash };
