export class HandledError extends Error {
   readonly handled: boolean = true;

   constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, Error);
   }
}
