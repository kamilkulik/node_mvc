import validator from 'validator';

export class CreateUserDTO {
  public readonly email: string;
  public readonly password: string;

  constructor({ email, password }: CreateUserProperties) {
    if (!validator.isEmail(email)) throw new Error('field: "email": must be an email!');
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
    ) {
      throw new Error(
        'field: "password": must be at least 8 characters long, have at least 1 lowercase, 1 uppercase letter, 1 number and include at least 1 symbol'
      );
    }

    this.email = email;
    this.password = password;
  }
}

export type CreateUserProperties = {
  email: string;
  password: string;
};
