/* eslint-disable */
// @ts-nocheck

// export function BasicCall(cb: Function, ...cbArgs: any[]) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     cb(...cbArgs);
//   };
// }

export function Call(cb: Function, ...cbArgs: any[]) {
  // let counter = 0;

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const m = descriptor.value;

    descriptor.value = function (...args: any[]) {
      cb(...cbArgs);

      // console.log(counter);
      // counter++;

      return m.apply(this, args);
    };

    return descriptor;
  };
}
