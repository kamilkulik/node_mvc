import validator from 'validator';

// PATTERNS USED:
// SPECIFICATION
// COMPOSITE

interface SpecificationInterface<T> {
  isSatisfied(item: T): Error | boolean;
}

class MinLengthSpecification implements SpecificationInterface<string> {
  constructor(private _minLength: number) {}

  public isSatisfied(item: string): boolean {
    return item.length >= this._minLength;
  }
}

class MinNumbersSpecification implements SpecificationInterface<string> {
  constructor(private _minNumbers: number) {}

  public isSatisfied(item: string): Error | boolean {
    let counter = 0;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let char of item.split('')) {
      if (numbers.includes(char)) counter++;
      if (counter === this._minNumbers) return true;
    }
    throw new Error(`Password needs to have at least ${this._minNumbers} numbers`);
  }
}

class MinLowerCaseSpecification implements SpecificationInterface<string> {
  constructor(private _minLowerCaseChars: number) {}

  public isSatisfied(item: string): Error | boolean {
    const asciiLowerCaseCharCodes = { first: 97, last: 122 };
    let counter = 0;
    for (let char of item.split('')) {
      const charAsciiCode = char.charCodeAt(0);
      if (charAsciiCode >= asciiLowerCaseCharCodes.first && charAsciiCode <= asciiLowerCaseCharCodes.last) counter++;
      if (counter === this._minLowerCaseChars) return true;
    }
    throw new Error(`Password needs to have at least ${this._minLowerCaseChars} characters`);
  }
}

class MinUpperCaseSpecification implements SpecificationInterface<string> {
  constructor(private _minUpperCaseChars: number) {}

  public isSatisfied(item: string): Error | boolean {
    const asciiUpperCaseCharCodes = { first: 65, last: 90 };
    let counter = 0;
    for (let char of item.split('')) {
      const charAsciiCode = char.charCodeAt(0);
      if (charAsciiCode >= asciiUpperCaseCharCodes.first && charAsciiCode <= asciiUpperCaseCharCodes.last) counter++;
      if (counter === this._minUpperCaseChars) return true;
    }
    throw new Error(`Password needs to have at least ${this._minUpperCaseChars} characters`);
  }
}

class MinSymbolsSpecification implements SpecificationInterface<string> {
  constructor(private _minSymbolsChars: number) {}

  public isSatisfied(item: string): Error | boolean {
    function* range(start: number, end: number) {
      for (let i = start; i <= end; i++) {
        yield i;
      }
    }

    const specialCharacters = [...range(33, 47), ...range(58, 64), ...range(91, 96), ...range(123, 126)];
    let counter = 0;
    for (let char of item.split('')) {
      const charAsciiCode = char.charCodeAt(0);
      if (specialCharacters.includes(charAsciiCode)) counter++;
      if (counter === this._minSymbolsChars) return true;
    }
    throw new Error(`Password needs to have at least ${this._minSymbolsChars} special characters`);
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

  isSatisfied(item: string): Error | boolean {
    for (let specification of this._specifications) {
      try {
        specification.isSatisfied(item);
      } catch (error) {
        throw new Error(error);
      }
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
    compositeSpecification
      .compose(new MinLengthSpecification(8))
      .compose(new MinNumbersSpecification(1))
      .compose(new MinLowerCaseSpecification(1))
      .compose(new MinUpperCaseSpecification(1))
      .compose(new MinSymbolsSpecification(1));

    // if (!compositeSpecification.isSatisfied(password)) throw new Error();
    try {
      compositeSpecification.isSatisfied(password);
    } catch (error) {
      // TODO, collect errors from all Specifications
      throw new Error(error.message);
    }

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
