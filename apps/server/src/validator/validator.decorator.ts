import { BadRequestException, SetMetadata } from '@nestjs/common';
import { z } from 'zod';

//export const Validator = (...args: string[]) => SetMetadata('validator', args);

// export function MaxLength(maxLength: number): any {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return function (target: Object, propertyKey: string) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     let value = target[propertyKey];
//     const setter = (newVal: string) => {
//       const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//       validator.parse(newVal);
//       value = newVal;
//     };

//     return Object.defineProperty(target, propertyKey, {
//       set: setter,
//     });
//   };
// }

// export function MaxLength(maxLength: number) {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return function (target: any, propertyKey: string) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const value = target[propertyKey];
//     const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//     validator.parse(value);
//     const setter = (newVal: string) => {
//       try {
//         const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//         //validator.parse(newVal);
//         validator.safeParse(newVal);

//       } catch (error) {
//         throw new BadRequestException();
//       }
//       const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//       validator.parse(newVal);
//       value = newVal;
//     };
//   };
// }

// export function MaxLength(maxLength: number) {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return function (target: any, context: any) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const value = target[propertyKey];
//     const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//     validator.parse(value);
//     const setter = (newVal: string) => {
//       try {
//         const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//         //validator.parse(newVal);
//         validator.safeParse(newVal);

//       } catch (error) {
//         throw new BadRequestException();
//       }
//       const validator = z.coerce.string().max(maxLength); // How to know what type of error throw zod. And why ts doesn't forward exception on the top (only print in console)
//       validator.parse(newVal);
//       value = newVal;
//     };
//   };
// }

// function deprecated(target, context) {
//   const kind = context.kind
//   const msg = `${context.name} is deprecated and will be removed in a future version.`
//   if (kind === "method" || kind === "getter" || kind === "setter") {
//     return function (...args: any[]) {
//       console.log(msg)
//       return target.apply(this, args)
//     }
//   } else if (kind === "field") {
//     return function (initialValue: any) {
//       console.log(msg)
//       return initialValue
//     }
//   }
// }


// export function MyDecorator(
//   target: Object,
//   propertyKey: string | symbol,
// ): TypedPropertyDescriptor<any> {

//   return null;
// }

export const uuidValidator = z.coerce.string().uuid();
