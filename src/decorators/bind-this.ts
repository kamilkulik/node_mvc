// METHOD DECORATOR
// The expression for the method decorator will be called as a function at runtime, with the following three arguments:

// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// The name of the member.
// The Property Descriptor for the member.

function bindThis() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const decoratedMethod = originalMethod.apply(target, args);

      return decoratedMethod;
    };
  };
}
