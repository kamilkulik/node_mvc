export class CreateUserDTO {
  public readonly email: string;
  public readonly password: string;

  constructor(d: { email: string; password: string }) {
    this.email = d.email;
    this.password = d.password;
  }
}
