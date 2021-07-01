type HandlerFunction = (error: Error, context: any) => void;

export const Catch = (errorType: any, handler?: HandlerFunction): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const decoratedMethod = originalMethod.apply(this, args);

        if (decoratedMethod && decoratedMethod instanceof Promise) {
          return decoratedMethod.catch((error: any) => {
            _handleError(this, errorType, error, handler);
          });
        }

        return decoratedMethod;
      } catch (error) {
        _handleError(this, errorType, error, handler);
      }
    };

    return descriptor;
  };
};

export const CatchError = (handler?: HandlerFunction): any => Catch(Error, handler);

function _handleError(context: any, errorType: any, error: Error, handler?: HandlerFunction) {
  if (typeof handler === 'function' && error instanceof errorType) {
    handler.call(null, error, context);
  } else {
    throw error;
  }
}
