import validator from 'validator';

// PATTERNS USED:
// SPECIFICATION
// COMPOSITE

class Status {
  constructor(public satisfied: boolean, public messages: string[]) {}
}

interface SpecificationInterface<T> {
  isSatisfied(item: T): Status;
}

class MinLengthSpecification implements SpecificationInterface<string> {
  constructor(private _minLength: number) {}

  public isSatisfied(item: string): Status {
    const satisfied = item.length >= this._minLength;
    const messages = satisfied ? [] : ['Specification not satisfied: MinLengthSpecification'];
    return new Status(satisfied, messages);
  }
}

class MinNumbersSpecification implements SpecificationInterface<string> {
  constructor(private _minNumbers: number) {}

  public isSatisfied(item: string): Status {
    let counter = 0;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let char of item.split('')) {
      if (numbers.includes(char)) counter++;
      if (counter === this._minNumbers) return new Status(true, []);
    }
    return new Status(false, ['Specification not satisfied: MinNumbersSpecification']);
  }
}

class MinLowerCaseSpecification implements SpecificationInterface<string> {
  constructor(private _minLowerCaseChars: number) {}

  public isSatisfied(item: string): Status {
    const asciiLowerCaseCharCodes = { first: 97, last: 122 };
    let counter = 0;
    for (let char of item.split('')) {
      const charAsciiCode = char.charCodeAt(0);
      if (charAsciiCode >= asciiLowerCaseCharCodes.first && charAsciiCode <= asciiLowerCaseCharCodes.last) counter++;
      if (counter === this._minLowerCaseChars) return new Status(true, []);
    }
    return new Status(false, ['Specification not satisfied: MinLowerCaseSpecification']);
  }
}

class MinUpperCaseSpecification implements SpecificationInterface<string> {
  constructor(private _minUpperCaseChars: number) {}

  public isSatisfied(item: string): Status {
    const asciiUpperCaseCharCodes = { first: 65, last: 90 };
    let counter = 0;
    for (let char of item.split('')) {
      const charAsciiCode = char.charCodeAt(0);
      if (charAsciiCode >= asciiUpperCaseCharCodes.first && charAsciiCode <= asciiUpperCaseCharCodes.last) counter++;
      if (counter === this._minUpperCaseChars) return new Status(true, []);
    }
    return new Status(false, ['Specification not satisfied: MinUpperCaseSpecification']);
  }
}

class MinSymbolsSpecification implements SpecificationInterface<string> {
  constructor(private _minSymbolsChars: number) {}

  public isSatisfied(item: string): Status {
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
      if (counter === this._minSymbolsChars) return new Status(true, []);
    }
    return new Status(false, ['Specification not satisfied: MinSymbolsSpecification']);
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

  isSatisfied(item: string): Status {
    const status = new Status(true, []);
    for (let specification of this._specifications) {
      const s = specification.isSatisfied(item);
      if (!s.satisfied) {
        status.satisfied = false;
        status.messages = status.messages.concat(s.messages);
      }
    }
    return status;
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

    // Recursive composite testing:
    // const compositeSpecification2 = new CompositeSpecification();
    // compositeSpecification2.compose(new MinUpperCaseSpecification(1)).compose(new MinSymbolsSpecification(1));
    // compositeSpecification.compose(compositeSpecification2);

    const status = compositeSpecification.isSatisfied(password);
    if (!status.satisfied) throw new Error(status.messages.join('. '));

    this.email = email;
    this.password = password;
  }
}

export type CreateUserProperties = {
  email: string;
  password: string;
};

// HOMEWORK
// next session: validator.isEmail()
