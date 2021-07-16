import validator from 'validator';

// PATTERNS USED:
// SPECIFICATION
// COMPOSITE

interface SpecificationInterface<T> {
  isSatisfied(item: T): boolean;
}

class MinLengthSpecification implements SpecificationInterface<string> {
  constructor(private _minLength: number) {}

  public isSatisfied(item: string): boolean {
    return item.length >= this._minLength;
  }
}

class MinNumbersSpecification implements SpecificationInterface<string> {
  constructor(private _minNumbers: number) {}

  public isSatisfied(item: string): boolean {
    let counter = 0;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let char of item.split('')) {
      if (numbers.includes(char)) counter++;
      if (counter === this._minNumbers) return true;
    }
    return false;
  }
}

interface CompositeInterface<T> {
  compose(item: T): CompositeInterface<T>;
}

class CompositeSpecification
  implements CompositeInterface<SpecificationInterface<string>>, SpecificationInterface<string>
{
  private _specifications: SpecificationInterface<string>[] = [];

  compose(specification: SpecificationInterface<string>): CompositeInterface<SpecificationInterface<string>> {
    this._specifications.push(specification);
    return this;
  }

  isSatisfied(item: string): boolean {
    for (let specification of this._specifications) {
      if (!specification.isSatisfied(item)) return false;
    }
    return true;
  }
}

export class CreateUserDTO {
  public readonly email: string;
  public readonly password: string;

  constructor({ email, password }: CreateUserProperties) {
    // if (!validator.isEmail(email)) throw new Error('field: "email": must be an email!');
    // if (
    //   !validator.isStrongPassword(password, {
    //     minLength: 8,
    //     minLowercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //     minUppercase: 1,
    //   })
    // ) {
    //   throw new Error(
    //     'field: "password": must be at least 8 characters long, have at least 1 lowercase, 1 uppercase letter, 1 number and include at least 1 symbol'
    //   );
    // }

    const compositeSpecification = new CompositeSpecification();
    compositeSpecification.compose(new MinLengthSpecification(8)).compose(new MinNumbersSpecification(1));

    if (!compositeSpecification.isSatisfied(password)) throw new Error();

    this.email = email;
    this.password = password;
  }
}

export type CreateUserProperties = {
  email: string;
  password: string;
};

// HOMEWORK
// implement: minSymbols, minUpperCase, minLowerCase
// next session: validator.isEmail()
