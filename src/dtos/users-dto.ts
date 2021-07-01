import validator from 'validator';

export class CreateUserDTO {
  public readonly email: string;
  public readonly password: string;

  constructor({ email, password }: CreateUserProperties) {
    if (!validator.isEmail(email)) throw new Error('field: "email": must be an email!');

    this.email = email;
    this.password = password;
  }
}

export type CreateUserProperties = {
  email: string;
  password: string;
};
