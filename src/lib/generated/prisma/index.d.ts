
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Division
 * 
 */
export type Division = $Result.DefaultSelection<Prisma.$DivisionPayload>
/**
 * Model Church
 * 
 */
export type Church = $Result.DefaultSelection<Prisma.$ChurchPayload>
/**
 * Model Coordinator
 * 
 */
export type Coordinator = $Result.DefaultSelection<Prisma.$CoordinatorPayload>
/**
 * Model Pastor
 * 
 */
export type Pastor = $Result.DefaultSelection<Prisma.$PastorPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Registration
 * 
 */
export type Registration = $Result.DefaultSelection<Prisma.$RegistrationPayload>
/**
 * Model Delegate
 * 
 */
export type Delegate = $Result.DefaultSelection<Prisma.$DelegatePayload>
/**
 * Model Cook
 * 
 */
export type Cook = $Result.DefaultSelection<Prisma.$CookPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PRESIDENT: 'PRESIDENT'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const EventStatus: {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const RegistrationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RegistrationStatus = (typeof RegistrationStatus)[keyof typeof RegistrationStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type EventStatus = $Enums.EventStatus

export const EventStatus: typeof $Enums.EventStatus

export type RegistrationStatus = $Enums.RegistrationStatus

export const RegistrationStatus: typeof $Enums.RegistrationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.division`: Exposes CRUD operations for the **Division** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Divisions
    * const divisions = await prisma.division.findMany()
    * ```
    */
  get division(): Prisma.DivisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.church`: Exposes CRUD operations for the **Church** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Churches
    * const churches = await prisma.church.findMany()
    * ```
    */
  get church(): Prisma.ChurchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coordinator`: Exposes CRUD operations for the **Coordinator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Coordinators
    * const coordinators = await prisma.coordinator.findMany()
    * ```
    */
  get coordinator(): Prisma.CoordinatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pastor`: Exposes CRUD operations for the **Pastor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pastors
    * const pastors = await prisma.pastor.findMany()
    * ```
    */
  get pastor(): Prisma.PastorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registration`: Exposes CRUD operations for the **Registration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registrations
    * const registrations = await prisma.registration.findMany()
    * ```
    */
  get registration(): Prisma.RegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delegate`: Exposes CRUD operations for the **Delegate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Delegates
    * const delegates = await prisma.delegate.findMany()
    * ```
    */
  get delegate(): Prisma.DelegateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cook`: Exposes CRUD operations for the **Cook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cooks
    * const cooks = await prisma.cook.findMany()
    * ```
    */
  get cook(): Prisma.CookDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Division: 'Division',
    Church: 'Church',
    Coordinator: 'Coordinator',
    Pastor: 'Pastor',
    Event: 'Event',
    Registration: 'Registration',
    Delegate: 'Delegate',
    Cook: 'Cook'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "division" | "church" | "coordinator" | "pastor" | "event" | "registration" | "delegate" | "cook"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Division: {
        payload: Prisma.$DivisionPayload<ExtArgs>
        fields: Prisma.DivisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DivisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DivisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          findFirst: {
            args: Prisma.DivisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DivisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          findMany: {
            args: Prisma.DivisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          create: {
            args: Prisma.DivisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          createMany: {
            args: Prisma.DivisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DivisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          delete: {
            args: Prisma.DivisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          update: {
            args: Prisma.DivisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          deleteMany: {
            args: Prisma.DivisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DivisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DivisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          upsert: {
            args: Prisma.DivisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          aggregate: {
            args: Prisma.DivisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDivision>
          }
          groupBy: {
            args: Prisma.DivisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DivisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DivisionCountArgs<ExtArgs>
            result: $Utils.Optional<DivisionCountAggregateOutputType> | number
          }
        }
      }
      Church: {
        payload: Prisma.$ChurchPayload<ExtArgs>
        fields: Prisma.ChurchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChurchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChurchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          findFirst: {
            args: Prisma.ChurchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChurchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          findMany: {
            args: Prisma.ChurchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>[]
          }
          create: {
            args: Prisma.ChurchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          createMany: {
            args: Prisma.ChurchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChurchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>[]
          }
          delete: {
            args: Prisma.ChurchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          update: {
            args: Prisma.ChurchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          deleteMany: {
            args: Prisma.ChurchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChurchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChurchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>[]
          }
          upsert: {
            args: Prisma.ChurchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          aggregate: {
            args: Prisma.ChurchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChurch>
          }
          groupBy: {
            args: Prisma.ChurchGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChurchGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChurchCountArgs<ExtArgs>
            result: $Utils.Optional<ChurchCountAggregateOutputType> | number
          }
        }
      }
      Coordinator: {
        payload: Prisma.$CoordinatorPayload<ExtArgs>
        fields: Prisma.CoordinatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoordinatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoordinatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>
          }
          findFirst: {
            args: Prisma.CoordinatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoordinatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>
          }
          findMany: {
            args: Prisma.CoordinatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>[]
          }
          create: {
            args: Prisma.CoordinatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>
          }
          createMany: {
            args: Prisma.CoordinatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoordinatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>[]
          }
          delete: {
            args: Prisma.CoordinatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>
          }
          update: {
            args: Prisma.CoordinatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>
          }
          deleteMany: {
            args: Prisma.CoordinatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoordinatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CoordinatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>[]
          }
          upsert: {
            args: Prisma.CoordinatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatorPayload>
          }
          aggregate: {
            args: Prisma.CoordinatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoordinator>
          }
          groupBy: {
            args: Prisma.CoordinatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoordinatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoordinatorCountArgs<ExtArgs>
            result: $Utils.Optional<CoordinatorCountAggregateOutputType> | number
          }
        }
      }
      Pastor: {
        payload: Prisma.$PastorPayload<ExtArgs>
        fields: Prisma.PastorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PastorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PastorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>
          }
          findFirst: {
            args: Prisma.PastorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PastorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>
          }
          findMany: {
            args: Prisma.PastorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>[]
          }
          create: {
            args: Prisma.PastorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>
          }
          createMany: {
            args: Prisma.PastorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PastorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>[]
          }
          delete: {
            args: Prisma.PastorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>
          }
          update: {
            args: Prisma.PastorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>
          }
          deleteMany: {
            args: Prisma.PastorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PastorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PastorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>[]
          }
          upsert: {
            args: Prisma.PastorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastorPayload>
          }
          aggregate: {
            args: Prisma.PastorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePastor>
          }
          groupBy: {
            args: Prisma.PastorGroupByArgs<ExtArgs>
            result: $Utils.Optional<PastorGroupByOutputType>[]
          }
          count: {
            args: Prisma.PastorCountArgs<ExtArgs>
            result: $Utils.Optional<PastorCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Registration: {
        payload: Prisma.$RegistrationPayload<ExtArgs>
        fields: Prisma.RegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findFirst: {
            args: Prisma.RegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findMany: {
            args: Prisma.RegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          create: {
            args: Prisma.RegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          createMany: {
            args: Prisma.RegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          delete: {
            args: Prisma.RegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          update: {
            args: Prisma.RegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          deleteMany: {
            args: Prisma.RegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          upsert: {
            args: Prisma.RegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          aggregate: {
            args: Prisma.RegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistration>
          }
          groupBy: {
            args: Prisma.RegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationCountAggregateOutputType> | number
          }
        }
      }
      Delegate: {
        payload: Prisma.$DelegatePayload<ExtArgs>
        fields: Prisma.DelegateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DelegateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DelegateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>
          }
          findFirst: {
            args: Prisma.DelegateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DelegateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>
          }
          findMany: {
            args: Prisma.DelegateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>[]
          }
          create: {
            args: Prisma.DelegateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>
          }
          createMany: {
            args: Prisma.DelegateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DelegateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>[]
          }
          delete: {
            args: Prisma.DelegateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>
          }
          update: {
            args: Prisma.DelegateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>
          }
          deleteMany: {
            args: Prisma.DelegateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DelegateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DelegateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>[]
          }
          upsert: {
            args: Prisma.DelegateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatePayload>
          }
          aggregate: {
            args: Prisma.DelegateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelegate>
          }
          groupBy: {
            args: Prisma.DelegateGroupByArgs<ExtArgs>
            result: $Utils.Optional<DelegateGroupByOutputType>[]
          }
          count: {
            args: Prisma.DelegateCountArgs<ExtArgs>
            result: $Utils.Optional<DelegateCountAggregateOutputType> | number
          }
        }
      }
      Cook: {
        payload: Prisma.$CookPayload<ExtArgs>
        fields: Prisma.CookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>
          }
          findFirst: {
            args: Prisma.CookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>
          }
          findMany: {
            args: Prisma.CookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>[]
          }
          create: {
            args: Prisma.CookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>
          }
          createMany: {
            args: Prisma.CookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>[]
          }
          delete: {
            args: Prisma.CookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>
          }
          update: {
            args: Prisma.CookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>
          }
          deleteMany: {
            args: Prisma.CookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>[]
          }
          upsert: {
            args: Prisma.CookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CookPayload>
          }
          aggregate: {
            args: Prisma.CookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCook>
          }
          groupBy: {
            args: Prisma.CookGroupByArgs<ExtArgs>
            result: $Utils.Optional<CookGroupByOutputType>[]
          }
          count: {
            args: Prisma.CookCountArgs<ExtArgs>
            result: $Utils.Optional<CookCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    division?: DivisionOmit
    church?: ChurchOmit
    coordinator?: CoordinatorOmit
    pastor?: PastorOmit
    event?: EventOmit
    registration?: RegistrationOmit
    delegate?: DelegateOmit
    cook?: CookOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    registrations: number
    reviewedRegistrations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    registrations?: boolean | UserCountOutputTypeCountRegistrationsArgs
    reviewedRegistrations?: boolean | UserCountOutputTypeCountReviewedRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewedRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
  }


  /**
   * Count Type DivisionCountOutputType
   */

  export type DivisionCountOutputType = {
    churches: number
  }

  export type DivisionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    churches?: boolean | DivisionCountOutputTypeCountChurchesArgs
  }

  // Custom InputTypes
  /**
   * DivisionCountOutputType without action
   */
  export type DivisionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DivisionCountOutputType
     */
    select?: DivisionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DivisionCountOutputType without action
   */
  export type DivisionCountOutputTypeCountChurchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChurchWhereInput
  }


  /**
   * Count Type ChurchCountOutputType
   */

  export type ChurchCountOutputType = {
    presidents: number
    registrations: number
  }

  export type ChurchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presidents?: boolean | ChurchCountOutputTypeCountPresidentsArgs
    registrations?: boolean | ChurchCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchCountOutputType
     */
    select?: ChurchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountPresidentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    registrations: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | EventCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
  }


  /**
   * Count Type RegistrationCountOutputType
   */

  export type RegistrationCountOutputType = {
    delegates: number
    cooks: number
  }

  export type RegistrationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    delegates?: boolean | RegistrationCountOutputTypeCountDelegatesArgs
    cooks?: boolean | RegistrationCountOutputTypeCountCooksArgs
  }

  // Custom InputTypes
  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationCountOutputType
     */
    select?: RegistrationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeCountDelegatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegateWhereInput
  }

  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeCountCooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CookWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: $Enums.UserRole | null
    emailVerified: boolean | null
    image: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: $Enums.UserRole | null
    emailVerified: boolean | null
    image: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    role: number
    emailVerified: number
    image: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    emailVerified?: true
    image?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    emailVerified?: true
    image?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    emailVerified?: true
    image?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    role: $Enums.UserRole
    emailVerified: boolean
    image: string | null
    churchId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    church?: boolean | User$churchArgs<ExtArgs>
    registrations?: boolean | User$registrationsArgs<ExtArgs>
    reviewedRegistrations?: boolean | User$reviewedRegistrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | User$churchArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | User$churchArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "role" | "emailVerified" | "image" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    church?: boolean | User$churchArgs<ExtArgs>
    registrations?: boolean | User$registrationsArgs<ExtArgs>
    reviewedRegistrations?: boolean | User$reviewedRegistrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | User$churchArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | User$churchArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      church: Prisma.$ChurchPayload<ExtArgs> | null
      registrations: Prisma.$RegistrationPayload<ExtArgs>[]
      reviewedRegistrations: Prisma.$RegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      role: $Enums.UserRole
      emailVerified: boolean
      image: string | null
      churchId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    church<T extends User$churchArgs<ExtArgs> = {}>(args?: Subset<T, User$churchArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    registrations<T extends User$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewedRegistrations<T extends User$reviewedRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewedRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly churchId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.church
   */
  export type User$churchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    where?: ChurchWhereInput
  }

  /**
   * User.registrations
   */
  export type User$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    cursor?: RegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * User.reviewedRegistrations
   */
  export type User$reviewedRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    cursor?: RegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Division
   */

  export type AggregateDivision = {
    _count: DivisionCountAggregateOutputType | null
    _min: DivisionMinAggregateOutputType | null
    _max: DivisionMaxAggregateOutputType | null
  }

  export type DivisionMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DivisionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DivisionCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DivisionMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DivisionMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DivisionCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DivisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Division to aggregate.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Divisions
    **/
    _count?: true | DivisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DivisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DivisionMaxAggregateInputType
  }

  export type GetDivisionAggregateType<T extends DivisionAggregateArgs> = {
        [P in keyof T & keyof AggregateDivision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDivision[P]>
      : GetScalarType<T[P], AggregateDivision[P]>
  }




  export type DivisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DivisionWhereInput
    orderBy?: DivisionOrderByWithAggregationInput | DivisionOrderByWithAggregationInput[]
    by: DivisionScalarFieldEnum[] | DivisionScalarFieldEnum
    having?: DivisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DivisionCountAggregateInputType | true
    _min?: DivisionMinAggregateInputType
    _max?: DivisionMaxAggregateInputType
  }

  export type DivisionGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: DivisionCountAggregateOutputType | null
    _min: DivisionMinAggregateOutputType | null
    _max: DivisionMaxAggregateOutputType | null
  }

  type GetDivisionGroupByPayload<T extends DivisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DivisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DivisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DivisionGroupByOutputType[P]>
            : GetScalarType<T[P], DivisionGroupByOutputType[P]>
        }
      >
    >


  export type DivisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    churches?: boolean | Division$churchesArgs<ExtArgs>
    coordinator?: boolean | Division$coordinatorArgs<ExtArgs>
    _count?: boolean | DivisionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DivisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["division"]>
  export type DivisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    churches?: boolean | Division$churchesArgs<ExtArgs>
    coordinator?: boolean | Division$coordinatorArgs<ExtArgs>
    _count?: boolean | DivisionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DivisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DivisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DivisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Division"
    objects: {
      churches: Prisma.$ChurchPayload<ExtArgs>[]
      coordinator: Prisma.$CoordinatorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["division"]>
    composites: {}
  }

  type DivisionGetPayload<S extends boolean | null | undefined | DivisionDefaultArgs> = $Result.GetResult<Prisma.$DivisionPayload, S>

  type DivisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DivisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DivisionCountAggregateInputType | true
    }

  export interface DivisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Division'], meta: { name: 'Division' } }
    /**
     * Find zero or one Division that matches the filter.
     * @param {DivisionFindUniqueArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DivisionFindUniqueArgs>(args: SelectSubset<T, DivisionFindUniqueArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Division that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DivisionFindUniqueOrThrowArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DivisionFindUniqueOrThrowArgs>(args: SelectSubset<T, DivisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Division that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindFirstArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DivisionFindFirstArgs>(args?: SelectSubset<T, DivisionFindFirstArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Division that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindFirstOrThrowArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DivisionFindFirstOrThrowArgs>(args?: SelectSubset<T, DivisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Divisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Divisions
     * const divisions = await prisma.division.findMany()
     * 
     * // Get first 10 Divisions
     * const divisions = await prisma.division.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const divisionWithIdOnly = await prisma.division.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DivisionFindManyArgs>(args?: SelectSubset<T, DivisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Division.
     * @param {DivisionCreateArgs} args - Arguments to create a Division.
     * @example
     * // Create one Division
     * const Division = await prisma.division.create({
     *   data: {
     *     // ... data to create a Division
     *   }
     * })
     * 
     */
    create<T extends DivisionCreateArgs>(args: SelectSubset<T, DivisionCreateArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Divisions.
     * @param {DivisionCreateManyArgs} args - Arguments to create many Divisions.
     * @example
     * // Create many Divisions
     * const division = await prisma.division.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DivisionCreateManyArgs>(args?: SelectSubset<T, DivisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Divisions and returns the data saved in the database.
     * @param {DivisionCreateManyAndReturnArgs} args - Arguments to create many Divisions.
     * @example
     * // Create many Divisions
     * const division = await prisma.division.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Divisions and only return the `id`
     * const divisionWithIdOnly = await prisma.division.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DivisionCreateManyAndReturnArgs>(args?: SelectSubset<T, DivisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Division.
     * @param {DivisionDeleteArgs} args - Arguments to delete one Division.
     * @example
     * // Delete one Division
     * const Division = await prisma.division.delete({
     *   where: {
     *     // ... filter to delete one Division
     *   }
     * })
     * 
     */
    delete<T extends DivisionDeleteArgs>(args: SelectSubset<T, DivisionDeleteArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Division.
     * @param {DivisionUpdateArgs} args - Arguments to update one Division.
     * @example
     * // Update one Division
     * const division = await prisma.division.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DivisionUpdateArgs>(args: SelectSubset<T, DivisionUpdateArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Divisions.
     * @param {DivisionDeleteManyArgs} args - Arguments to filter Divisions to delete.
     * @example
     * // Delete a few Divisions
     * const { count } = await prisma.division.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DivisionDeleteManyArgs>(args?: SelectSubset<T, DivisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Divisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Divisions
     * const division = await prisma.division.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DivisionUpdateManyArgs>(args: SelectSubset<T, DivisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Divisions and returns the data updated in the database.
     * @param {DivisionUpdateManyAndReturnArgs} args - Arguments to update many Divisions.
     * @example
     * // Update many Divisions
     * const division = await prisma.division.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Divisions and only return the `id`
     * const divisionWithIdOnly = await prisma.division.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DivisionUpdateManyAndReturnArgs>(args: SelectSubset<T, DivisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Division.
     * @param {DivisionUpsertArgs} args - Arguments to update or create a Division.
     * @example
     * // Update or create a Division
     * const division = await prisma.division.upsert({
     *   create: {
     *     // ... data to create a Division
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Division we want to update
     *   }
     * })
     */
    upsert<T extends DivisionUpsertArgs>(args: SelectSubset<T, DivisionUpsertArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Divisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionCountArgs} args - Arguments to filter Divisions to count.
     * @example
     * // Count the number of Divisions
     * const count = await prisma.division.count({
     *   where: {
     *     // ... the filter for the Divisions we want to count
     *   }
     * })
    **/
    count<T extends DivisionCountArgs>(
      args?: Subset<T, DivisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DivisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Division.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DivisionAggregateArgs>(args: Subset<T, DivisionAggregateArgs>): Prisma.PrismaPromise<GetDivisionAggregateType<T>>

    /**
     * Group by Division.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DivisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DivisionGroupByArgs['orderBy'] }
        : { orderBy?: DivisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DivisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDivisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Division model
   */
  readonly fields: DivisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Division.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DivisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    churches<T extends Division$churchesArgs<ExtArgs> = {}>(args?: Subset<T, Division$churchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    coordinator<T extends Division$coordinatorArgs<ExtArgs> = {}>(args?: Subset<T, Division$coordinatorArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Division model
   */
  interface DivisionFieldRefs {
    readonly id: FieldRef<"Division", 'String'>
    readonly name: FieldRef<"Division", 'String'>
    readonly createdAt: FieldRef<"Division", 'DateTime'>
    readonly updatedAt: FieldRef<"Division", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Division findUnique
   */
  export type DivisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division findUniqueOrThrow
   */
  export type DivisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division findFirst
   */
  export type DivisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Divisions.
     */
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }

  /**
   * Division findFirstOrThrow
   */
  export type DivisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Divisions.
     */
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }

  /**
   * Division findMany
   */
  export type DivisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Divisions to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }

  /**
   * Division create
   */
  export type DivisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * The data needed to create a Division.
     */
    data: XOR<DivisionCreateInput, DivisionUncheckedCreateInput>
  }

  /**
   * Division createMany
   */
  export type DivisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Divisions.
     */
    data: DivisionCreateManyInput | DivisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Division createManyAndReturn
   */
  export type DivisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The data used to create many Divisions.
     */
    data: DivisionCreateManyInput | DivisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Division update
   */
  export type DivisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * The data needed to update a Division.
     */
    data: XOR<DivisionUpdateInput, DivisionUncheckedUpdateInput>
    /**
     * Choose, which Division to update.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division updateMany
   */
  export type DivisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Divisions.
     */
    data: XOR<DivisionUpdateManyMutationInput, DivisionUncheckedUpdateManyInput>
    /**
     * Filter which Divisions to update
     */
    where?: DivisionWhereInput
    /**
     * Limit how many Divisions to update.
     */
    limit?: number
  }

  /**
   * Division updateManyAndReturn
   */
  export type DivisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The data used to update Divisions.
     */
    data: XOR<DivisionUpdateManyMutationInput, DivisionUncheckedUpdateManyInput>
    /**
     * Filter which Divisions to update
     */
    where?: DivisionWhereInput
    /**
     * Limit how many Divisions to update.
     */
    limit?: number
  }

  /**
   * Division upsert
   */
  export type DivisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * The filter to search for the Division to update in case it exists.
     */
    where: DivisionWhereUniqueInput
    /**
     * In case the Division found by the `where` argument doesn't exist, create a new Division with this data.
     */
    create: XOR<DivisionCreateInput, DivisionUncheckedCreateInput>
    /**
     * In case the Division was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DivisionUpdateInput, DivisionUncheckedUpdateInput>
  }

  /**
   * Division delete
   */
  export type DivisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter which Division to delete.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division deleteMany
   */
  export type DivisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Divisions to delete
     */
    where?: DivisionWhereInput
    /**
     * Limit how many Divisions to delete.
     */
    limit?: number
  }

  /**
   * Division.churches
   */
  export type Division$churchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    where?: ChurchWhereInput
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    cursor?: ChurchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Division.coordinator
   */
  export type Division$coordinatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    where?: CoordinatorWhereInput
  }

  /**
   * Division without action
   */
  export type DivisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DivisionInclude<ExtArgs> | null
  }


  /**
   * Model Church
   */

  export type AggregateChurch = {
    _count: ChurchCountAggregateOutputType | null
    _min: ChurchMinAggregateOutputType | null
    _max: ChurchMaxAggregateOutputType | null
  }

  export type ChurchMinAggregateOutputType = {
    id: string | null
    name: string | null
    divisionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChurchMaxAggregateOutputType = {
    id: string | null
    name: string | null
    divisionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChurchCountAggregateOutputType = {
    id: number
    name: number
    divisionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChurchMinAggregateInputType = {
    id?: true
    name?: true
    divisionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChurchMaxAggregateInputType = {
    id?: true
    name?: true
    divisionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChurchCountAggregateInputType = {
    id?: true
    name?: true
    divisionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChurchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Church to aggregate.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Churches
    **/
    _count?: true | ChurchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChurchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChurchMaxAggregateInputType
  }

  export type GetChurchAggregateType<T extends ChurchAggregateArgs> = {
        [P in keyof T & keyof AggregateChurch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChurch[P]>
      : GetScalarType<T[P], AggregateChurch[P]>
  }




  export type ChurchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChurchWhereInput
    orderBy?: ChurchOrderByWithAggregationInput | ChurchOrderByWithAggregationInput[]
    by: ChurchScalarFieldEnum[] | ChurchScalarFieldEnum
    having?: ChurchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChurchCountAggregateInputType | true
    _min?: ChurchMinAggregateInputType
    _max?: ChurchMaxAggregateInputType
  }

  export type ChurchGroupByOutputType = {
    id: string
    name: string
    divisionId: string
    createdAt: Date
    updatedAt: Date
    _count: ChurchCountAggregateOutputType | null
    _min: ChurchMinAggregateOutputType | null
    _max: ChurchMaxAggregateOutputType | null
  }

  type GetChurchGroupByPayload<T extends ChurchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChurchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChurchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChurchGroupByOutputType[P]>
            : GetScalarType<T[P], ChurchGroupByOutputType[P]>
        }
      >
    >


  export type ChurchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    division?: boolean | DivisionDefaultArgs<ExtArgs>
    pastor?: boolean | Church$pastorArgs<ExtArgs>
    presidents?: boolean | Church$presidentsArgs<ExtArgs>
    registrations?: boolean | Church$registrationsArgs<ExtArgs>
    _count?: boolean | ChurchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["church"]>

  export type ChurchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["church"]>

  export type ChurchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["church"]>

  export type ChurchSelectScalar = {
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChurchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "divisionId" | "createdAt" | "updatedAt", ExtArgs["result"]["church"]>
  export type ChurchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    division?: boolean | DivisionDefaultArgs<ExtArgs>
    pastor?: boolean | Church$pastorArgs<ExtArgs>
    presidents?: boolean | Church$presidentsArgs<ExtArgs>
    registrations?: boolean | Church$registrationsArgs<ExtArgs>
    _count?: boolean | ChurchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChurchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }
  export type ChurchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }

  export type $ChurchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Church"
    objects: {
      division: Prisma.$DivisionPayload<ExtArgs>
      pastor: Prisma.$PastorPayload<ExtArgs> | null
      presidents: Prisma.$UserPayload<ExtArgs>[]
      registrations: Prisma.$RegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      divisionId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["church"]>
    composites: {}
  }

  type ChurchGetPayload<S extends boolean | null | undefined | ChurchDefaultArgs> = $Result.GetResult<Prisma.$ChurchPayload, S>

  type ChurchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChurchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChurchCountAggregateInputType | true
    }

  export interface ChurchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Church'], meta: { name: 'Church' } }
    /**
     * Find zero or one Church that matches the filter.
     * @param {ChurchFindUniqueArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChurchFindUniqueArgs>(args: SelectSubset<T, ChurchFindUniqueArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Church that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChurchFindUniqueOrThrowArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChurchFindUniqueOrThrowArgs>(args: SelectSubset<T, ChurchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Church that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchFindFirstArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChurchFindFirstArgs>(args?: SelectSubset<T, ChurchFindFirstArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Church that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchFindFirstOrThrowArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChurchFindFirstOrThrowArgs>(args?: SelectSubset<T, ChurchFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Churches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Churches
     * const churches = await prisma.church.findMany()
     * 
     * // Get first 10 Churches
     * const churches = await prisma.church.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const churchWithIdOnly = await prisma.church.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChurchFindManyArgs>(args?: SelectSubset<T, ChurchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Church.
     * @param {ChurchCreateArgs} args - Arguments to create a Church.
     * @example
     * // Create one Church
     * const Church = await prisma.church.create({
     *   data: {
     *     // ... data to create a Church
     *   }
     * })
     * 
     */
    create<T extends ChurchCreateArgs>(args: SelectSubset<T, ChurchCreateArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Churches.
     * @param {ChurchCreateManyArgs} args - Arguments to create many Churches.
     * @example
     * // Create many Churches
     * const church = await prisma.church.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChurchCreateManyArgs>(args?: SelectSubset<T, ChurchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Churches and returns the data saved in the database.
     * @param {ChurchCreateManyAndReturnArgs} args - Arguments to create many Churches.
     * @example
     * // Create many Churches
     * const church = await prisma.church.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Churches and only return the `id`
     * const churchWithIdOnly = await prisma.church.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChurchCreateManyAndReturnArgs>(args?: SelectSubset<T, ChurchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Church.
     * @param {ChurchDeleteArgs} args - Arguments to delete one Church.
     * @example
     * // Delete one Church
     * const Church = await prisma.church.delete({
     *   where: {
     *     // ... filter to delete one Church
     *   }
     * })
     * 
     */
    delete<T extends ChurchDeleteArgs>(args: SelectSubset<T, ChurchDeleteArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Church.
     * @param {ChurchUpdateArgs} args - Arguments to update one Church.
     * @example
     * // Update one Church
     * const church = await prisma.church.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChurchUpdateArgs>(args: SelectSubset<T, ChurchUpdateArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Churches.
     * @param {ChurchDeleteManyArgs} args - Arguments to filter Churches to delete.
     * @example
     * // Delete a few Churches
     * const { count } = await prisma.church.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChurchDeleteManyArgs>(args?: SelectSubset<T, ChurchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Churches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Churches
     * const church = await prisma.church.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChurchUpdateManyArgs>(args: SelectSubset<T, ChurchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Churches and returns the data updated in the database.
     * @param {ChurchUpdateManyAndReturnArgs} args - Arguments to update many Churches.
     * @example
     * // Update many Churches
     * const church = await prisma.church.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Churches and only return the `id`
     * const churchWithIdOnly = await prisma.church.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChurchUpdateManyAndReturnArgs>(args: SelectSubset<T, ChurchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Church.
     * @param {ChurchUpsertArgs} args - Arguments to update or create a Church.
     * @example
     * // Update or create a Church
     * const church = await prisma.church.upsert({
     *   create: {
     *     // ... data to create a Church
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Church we want to update
     *   }
     * })
     */
    upsert<T extends ChurchUpsertArgs>(args: SelectSubset<T, ChurchUpsertArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Churches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchCountArgs} args - Arguments to filter Churches to count.
     * @example
     * // Count the number of Churches
     * const count = await prisma.church.count({
     *   where: {
     *     // ... the filter for the Churches we want to count
     *   }
     * })
    **/
    count<T extends ChurchCountArgs>(
      args?: Subset<T, ChurchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChurchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Church.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChurchAggregateArgs>(args: Subset<T, ChurchAggregateArgs>): Prisma.PrismaPromise<GetChurchAggregateType<T>>

    /**
     * Group by Church.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChurchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChurchGroupByArgs['orderBy'] }
        : { orderBy?: ChurchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChurchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChurchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Church model
   */
  readonly fields: ChurchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Church.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChurchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    division<T extends DivisionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DivisionDefaultArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pastor<T extends Church$pastorArgs<ExtArgs> = {}>(args?: Subset<T, Church$pastorArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    presidents<T extends Church$presidentsArgs<ExtArgs> = {}>(args?: Subset<T, Church$presidentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrations<T extends Church$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Church$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Church model
   */
  interface ChurchFieldRefs {
    readonly id: FieldRef<"Church", 'String'>
    readonly name: FieldRef<"Church", 'String'>
    readonly divisionId: FieldRef<"Church", 'String'>
    readonly createdAt: FieldRef<"Church", 'DateTime'>
    readonly updatedAt: FieldRef<"Church", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Church findUnique
   */
  export type ChurchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church findUniqueOrThrow
   */
  export type ChurchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church findFirst
   */
  export type ChurchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Churches.
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Churches.
     */
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Church findFirstOrThrow
   */
  export type ChurchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Churches.
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Churches.
     */
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Church findMany
   */
  export type ChurchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Churches to fetch.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Churches.
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Church create
   */
  export type ChurchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * The data needed to create a Church.
     */
    data: XOR<ChurchCreateInput, ChurchUncheckedCreateInput>
  }

  /**
   * Church createMany
   */
  export type ChurchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Churches.
     */
    data: ChurchCreateManyInput | ChurchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Church createManyAndReturn
   */
  export type ChurchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * The data used to create many Churches.
     */
    data: ChurchCreateManyInput | ChurchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Church update
   */
  export type ChurchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * The data needed to update a Church.
     */
    data: XOR<ChurchUpdateInput, ChurchUncheckedUpdateInput>
    /**
     * Choose, which Church to update.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church updateMany
   */
  export type ChurchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Churches.
     */
    data: XOR<ChurchUpdateManyMutationInput, ChurchUncheckedUpdateManyInput>
    /**
     * Filter which Churches to update
     */
    where?: ChurchWhereInput
    /**
     * Limit how many Churches to update.
     */
    limit?: number
  }

  /**
   * Church updateManyAndReturn
   */
  export type ChurchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * The data used to update Churches.
     */
    data: XOR<ChurchUpdateManyMutationInput, ChurchUncheckedUpdateManyInput>
    /**
     * Filter which Churches to update
     */
    where?: ChurchWhereInput
    /**
     * Limit how many Churches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Church upsert
   */
  export type ChurchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * The filter to search for the Church to update in case it exists.
     */
    where: ChurchWhereUniqueInput
    /**
     * In case the Church found by the `where` argument doesn't exist, create a new Church with this data.
     */
    create: XOR<ChurchCreateInput, ChurchUncheckedCreateInput>
    /**
     * In case the Church was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChurchUpdateInput, ChurchUncheckedUpdateInput>
  }

  /**
   * Church delete
   */
  export type ChurchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter which Church to delete.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church deleteMany
   */
  export type ChurchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Churches to delete
     */
    where?: ChurchWhereInput
    /**
     * Limit how many Churches to delete.
     */
    limit?: number
  }

  /**
   * Church.pastor
   */
  export type Church$pastorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    where?: PastorWhereInput
  }

  /**
   * Church.presidents
   */
  export type Church$presidentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Church.registrations
   */
  export type Church$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    cursor?: RegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Church without action
   */
  export type ChurchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
  }


  /**
   * Model Coordinator
   */

  export type AggregateCoordinator = {
    _count: CoordinatorCountAggregateOutputType | null
    _min: CoordinatorMinAggregateOutputType | null
    _max: CoordinatorMaxAggregateOutputType | null
  }

  export type CoordinatorMinAggregateOutputType = {
    id: string | null
    name: string | null
    divisionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoordinatorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    divisionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoordinatorCountAggregateOutputType = {
    id: number
    name: number
    divisionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoordinatorMinAggregateInputType = {
    id?: true
    name?: true
    divisionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoordinatorMaxAggregateInputType = {
    id?: true
    name?: true
    divisionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoordinatorCountAggregateInputType = {
    id?: true
    name?: true
    divisionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoordinatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coordinator to aggregate.
     */
    where?: CoordinatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinators to fetch.
     */
    orderBy?: CoordinatorOrderByWithRelationInput | CoordinatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoordinatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Coordinators
    **/
    _count?: true | CoordinatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoordinatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoordinatorMaxAggregateInputType
  }

  export type GetCoordinatorAggregateType<T extends CoordinatorAggregateArgs> = {
        [P in keyof T & keyof AggregateCoordinator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoordinator[P]>
      : GetScalarType<T[P], AggregateCoordinator[P]>
  }




  export type CoordinatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoordinatorWhereInput
    orderBy?: CoordinatorOrderByWithAggregationInput | CoordinatorOrderByWithAggregationInput[]
    by: CoordinatorScalarFieldEnum[] | CoordinatorScalarFieldEnum
    having?: CoordinatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoordinatorCountAggregateInputType | true
    _min?: CoordinatorMinAggregateInputType
    _max?: CoordinatorMaxAggregateInputType
  }

  export type CoordinatorGroupByOutputType = {
    id: string
    name: string
    divisionId: string
    createdAt: Date
    updatedAt: Date
    _count: CoordinatorCountAggregateOutputType | null
    _min: CoordinatorMinAggregateOutputType | null
    _max: CoordinatorMaxAggregateOutputType | null
  }

  type GetCoordinatorGroupByPayload<T extends CoordinatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoordinatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoordinatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoordinatorGroupByOutputType[P]>
            : GetScalarType<T[P], CoordinatorGroupByOutputType[P]>
        }
      >
    >


  export type CoordinatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coordinator"]>

  export type CoordinatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coordinator"]>

  export type CoordinatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coordinator"]>

  export type CoordinatorSelectScalar = {
    id?: boolean
    name?: boolean
    divisionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoordinatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "divisionId" | "createdAt" | "updatedAt", ExtArgs["result"]["coordinator"]>
  export type CoordinatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }
  export type CoordinatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }
  export type CoordinatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    division?: boolean | DivisionDefaultArgs<ExtArgs>
  }

  export type $CoordinatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Coordinator"
    objects: {
      division: Prisma.$DivisionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      divisionId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coordinator"]>
    composites: {}
  }

  type CoordinatorGetPayload<S extends boolean | null | undefined | CoordinatorDefaultArgs> = $Result.GetResult<Prisma.$CoordinatorPayload, S>

  type CoordinatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoordinatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoordinatorCountAggregateInputType | true
    }

  export interface CoordinatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Coordinator'], meta: { name: 'Coordinator' } }
    /**
     * Find zero or one Coordinator that matches the filter.
     * @param {CoordinatorFindUniqueArgs} args - Arguments to find a Coordinator
     * @example
     * // Get one Coordinator
     * const coordinator = await prisma.coordinator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoordinatorFindUniqueArgs>(args: SelectSubset<T, CoordinatorFindUniqueArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Coordinator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoordinatorFindUniqueOrThrowArgs} args - Arguments to find a Coordinator
     * @example
     * // Get one Coordinator
     * const coordinator = await prisma.coordinator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoordinatorFindUniqueOrThrowArgs>(args: SelectSubset<T, CoordinatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coordinator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorFindFirstArgs} args - Arguments to find a Coordinator
     * @example
     * // Get one Coordinator
     * const coordinator = await prisma.coordinator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoordinatorFindFirstArgs>(args?: SelectSubset<T, CoordinatorFindFirstArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coordinator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorFindFirstOrThrowArgs} args - Arguments to find a Coordinator
     * @example
     * // Get one Coordinator
     * const coordinator = await prisma.coordinator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoordinatorFindFirstOrThrowArgs>(args?: SelectSubset<T, CoordinatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Coordinators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Coordinators
     * const coordinators = await prisma.coordinator.findMany()
     * 
     * // Get first 10 Coordinators
     * const coordinators = await prisma.coordinator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coordinatorWithIdOnly = await prisma.coordinator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoordinatorFindManyArgs>(args?: SelectSubset<T, CoordinatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Coordinator.
     * @param {CoordinatorCreateArgs} args - Arguments to create a Coordinator.
     * @example
     * // Create one Coordinator
     * const Coordinator = await prisma.coordinator.create({
     *   data: {
     *     // ... data to create a Coordinator
     *   }
     * })
     * 
     */
    create<T extends CoordinatorCreateArgs>(args: SelectSubset<T, CoordinatorCreateArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Coordinators.
     * @param {CoordinatorCreateManyArgs} args - Arguments to create many Coordinators.
     * @example
     * // Create many Coordinators
     * const coordinator = await prisma.coordinator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoordinatorCreateManyArgs>(args?: SelectSubset<T, CoordinatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Coordinators and returns the data saved in the database.
     * @param {CoordinatorCreateManyAndReturnArgs} args - Arguments to create many Coordinators.
     * @example
     * // Create many Coordinators
     * const coordinator = await prisma.coordinator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Coordinators and only return the `id`
     * const coordinatorWithIdOnly = await prisma.coordinator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoordinatorCreateManyAndReturnArgs>(args?: SelectSubset<T, CoordinatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Coordinator.
     * @param {CoordinatorDeleteArgs} args - Arguments to delete one Coordinator.
     * @example
     * // Delete one Coordinator
     * const Coordinator = await prisma.coordinator.delete({
     *   where: {
     *     // ... filter to delete one Coordinator
     *   }
     * })
     * 
     */
    delete<T extends CoordinatorDeleteArgs>(args: SelectSubset<T, CoordinatorDeleteArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Coordinator.
     * @param {CoordinatorUpdateArgs} args - Arguments to update one Coordinator.
     * @example
     * // Update one Coordinator
     * const coordinator = await prisma.coordinator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoordinatorUpdateArgs>(args: SelectSubset<T, CoordinatorUpdateArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Coordinators.
     * @param {CoordinatorDeleteManyArgs} args - Arguments to filter Coordinators to delete.
     * @example
     * // Delete a few Coordinators
     * const { count } = await prisma.coordinator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoordinatorDeleteManyArgs>(args?: SelectSubset<T, CoordinatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coordinators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Coordinators
     * const coordinator = await prisma.coordinator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoordinatorUpdateManyArgs>(args: SelectSubset<T, CoordinatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coordinators and returns the data updated in the database.
     * @param {CoordinatorUpdateManyAndReturnArgs} args - Arguments to update many Coordinators.
     * @example
     * // Update many Coordinators
     * const coordinator = await prisma.coordinator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Coordinators and only return the `id`
     * const coordinatorWithIdOnly = await prisma.coordinator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CoordinatorUpdateManyAndReturnArgs>(args: SelectSubset<T, CoordinatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Coordinator.
     * @param {CoordinatorUpsertArgs} args - Arguments to update or create a Coordinator.
     * @example
     * // Update or create a Coordinator
     * const coordinator = await prisma.coordinator.upsert({
     *   create: {
     *     // ... data to create a Coordinator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Coordinator we want to update
     *   }
     * })
     */
    upsert<T extends CoordinatorUpsertArgs>(args: SelectSubset<T, CoordinatorUpsertArgs<ExtArgs>>): Prisma__CoordinatorClient<$Result.GetResult<Prisma.$CoordinatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Coordinators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorCountArgs} args - Arguments to filter Coordinators to count.
     * @example
     * // Count the number of Coordinators
     * const count = await prisma.coordinator.count({
     *   where: {
     *     // ... the filter for the Coordinators we want to count
     *   }
     * })
    **/
    count<T extends CoordinatorCountArgs>(
      args?: Subset<T, CoordinatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoordinatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Coordinator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoordinatorAggregateArgs>(args: Subset<T, CoordinatorAggregateArgs>): Prisma.PrismaPromise<GetCoordinatorAggregateType<T>>

    /**
     * Group by Coordinator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoordinatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoordinatorGroupByArgs['orderBy'] }
        : { orderBy?: CoordinatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoordinatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoordinatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Coordinator model
   */
  readonly fields: CoordinatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Coordinator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoordinatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    division<T extends DivisionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DivisionDefaultArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Coordinator model
   */
  interface CoordinatorFieldRefs {
    readonly id: FieldRef<"Coordinator", 'String'>
    readonly name: FieldRef<"Coordinator", 'String'>
    readonly divisionId: FieldRef<"Coordinator", 'String'>
    readonly createdAt: FieldRef<"Coordinator", 'DateTime'>
    readonly updatedAt: FieldRef<"Coordinator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Coordinator findUnique
   */
  export type CoordinatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * Filter, which Coordinator to fetch.
     */
    where: CoordinatorWhereUniqueInput
  }

  /**
   * Coordinator findUniqueOrThrow
   */
  export type CoordinatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * Filter, which Coordinator to fetch.
     */
    where: CoordinatorWhereUniqueInput
  }

  /**
   * Coordinator findFirst
   */
  export type CoordinatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * Filter, which Coordinator to fetch.
     */
    where?: CoordinatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinators to fetch.
     */
    orderBy?: CoordinatorOrderByWithRelationInput | CoordinatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coordinators.
     */
    cursor?: CoordinatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coordinators.
     */
    distinct?: CoordinatorScalarFieldEnum | CoordinatorScalarFieldEnum[]
  }

  /**
   * Coordinator findFirstOrThrow
   */
  export type CoordinatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * Filter, which Coordinator to fetch.
     */
    where?: CoordinatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinators to fetch.
     */
    orderBy?: CoordinatorOrderByWithRelationInput | CoordinatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coordinators.
     */
    cursor?: CoordinatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coordinators.
     */
    distinct?: CoordinatorScalarFieldEnum | CoordinatorScalarFieldEnum[]
  }

  /**
   * Coordinator findMany
   */
  export type CoordinatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * Filter, which Coordinators to fetch.
     */
    where?: CoordinatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinators to fetch.
     */
    orderBy?: CoordinatorOrderByWithRelationInput | CoordinatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Coordinators.
     */
    cursor?: CoordinatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinators.
     */
    skip?: number
    distinct?: CoordinatorScalarFieldEnum | CoordinatorScalarFieldEnum[]
  }

  /**
   * Coordinator create
   */
  export type CoordinatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Coordinator.
     */
    data: XOR<CoordinatorCreateInput, CoordinatorUncheckedCreateInput>
  }

  /**
   * Coordinator createMany
   */
  export type CoordinatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Coordinators.
     */
    data: CoordinatorCreateManyInput | CoordinatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coordinator createManyAndReturn
   */
  export type CoordinatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * The data used to create many Coordinators.
     */
    data: CoordinatorCreateManyInput | CoordinatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Coordinator update
   */
  export type CoordinatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Coordinator.
     */
    data: XOR<CoordinatorUpdateInput, CoordinatorUncheckedUpdateInput>
    /**
     * Choose, which Coordinator to update.
     */
    where: CoordinatorWhereUniqueInput
  }

  /**
   * Coordinator updateMany
   */
  export type CoordinatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Coordinators.
     */
    data: XOR<CoordinatorUpdateManyMutationInput, CoordinatorUncheckedUpdateManyInput>
    /**
     * Filter which Coordinators to update
     */
    where?: CoordinatorWhereInput
    /**
     * Limit how many Coordinators to update.
     */
    limit?: number
  }

  /**
   * Coordinator updateManyAndReturn
   */
  export type CoordinatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * The data used to update Coordinators.
     */
    data: XOR<CoordinatorUpdateManyMutationInput, CoordinatorUncheckedUpdateManyInput>
    /**
     * Filter which Coordinators to update
     */
    where?: CoordinatorWhereInput
    /**
     * Limit how many Coordinators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Coordinator upsert
   */
  export type CoordinatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Coordinator to update in case it exists.
     */
    where: CoordinatorWhereUniqueInput
    /**
     * In case the Coordinator found by the `where` argument doesn't exist, create a new Coordinator with this data.
     */
    create: XOR<CoordinatorCreateInput, CoordinatorUncheckedCreateInput>
    /**
     * In case the Coordinator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoordinatorUpdateInput, CoordinatorUncheckedUpdateInput>
  }

  /**
   * Coordinator delete
   */
  export type CoordinatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
    /**
     * Filter which Coordinator to delete.
     */
    where: CoordinatorWhereUniqueInput
  }

  /**
   * Coordinator deleteMany
   */
  export type CoordinatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coordinators to delete
     */
    where?: CoordinatorWhereInput
    /**
     * Limit how many Coordinators to delete.
     */
    limit?: number
  }

  /**
   * Coordinator without action
   */
  export type CoordinatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinator
     */
    select?: CoordinatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinator
     */
    omit?: CoordinatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatorInclude<ExtArgs> | null
  }


  /**
   * Model Pastor
   */

  export type AggregatePastor = {
    _count: PastorCountAggregateOutputType | null
    _min: PastorMinAggregateOutputType | null
    _max: PastorMaxAggregateOutputType | null
  }

  export type PastorMinAggregateOutputType = {
    id: string | null
    name: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PastorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PastorCountAggregateOutputType = {
    id: number
    name: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PastorMinAggregateInputType = {
    id?: true
    name?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PastorMaxAggregateInputType = {
    id?: true
    name?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PastorCountAggregateInputType = {
    id?: true
    name?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PastorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pastor to aggregate.
     */
    where?: PastorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastors to fetch.
     */
    orderBy?: PastorOrderByWithRelationInput | PastorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PastorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pastors
    **/
    _count?: true | PastorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PastorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PastorMaxAggregateInputType
  }

  export type GetPastorAggregateType<T extends PastorAggregateArgs> = {
        [P in keyof T & keyof AggregatePastor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePastor[P]>
      : GetScalarType<T[P], AggregatePastor[P]>
  }




  export type PastorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PastorWhereInput
    orderBy?: PastorOrderByWithAggregationInput | PastorOrderByWithAggregationInput[]
    by: PastorScalarFieldEnum[] | PastorScalarFieldEnum
    having?: PastorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PastorCountAggregateInputType | true
    _min?: PastorMinAggregateInputType
    _max?: PastorMaxAggregateInputType
  }

  export type PastorGroupByOutputType = {
    id: string
    name: string
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: PastorCountAggregateOutputType | null
    _min: PastorMinAggregateOutputType | null
    _max: PastorMaxAggregateOutputType | null
  }

  type GetPastorGroupByPayload<T extends PastorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PastorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PastorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PastorGroupByOutputType[P]>
            : GetScalarType<T[P], PastorGroupByOutputType[P]>
        }
      >
    >


  export type PastorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pastor"]>

  export type PastorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pastor"]>

  export type PastorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pastor"]>

  export type PastorSelectScalar = {
    id?: boolean
    name?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PastorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["pastor"]>
  export type PastorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type PastorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type PastorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $PastorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pastor"
    objects: {
      church: Prisma.$ChurchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pastor"]>
    composites: {}
  }

  type PastorGetPayload<S extends boolean | null | undefined | PastorDefaultArgs> = $Result.GetResult<Prisma.$PastorPayload, S>

  type PastorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PastorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PastorCountAggregateInputType | true
    }

  export interface PastorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pastor'], meta: { name: 'Pastor' } }
    /**
     * Find zero or one Pastor that matches the filter.
     * @param {PastorFindUniqueArgs} args - Arguments to find a Pastor
     * @example
     * // Get one Pastor
     * const pastor = await prisma.pastor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PastorFindUniqueArgs>(args: SelectSubset<T, PastorFindUniqueArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pastor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PastorFindUniqueOrThrowArgs} args - Arguments to find a Pastor
     * @example
     * // Get one Pastor
     * const pastor = await prisma.pastor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PastorFindUniqueOrThrowArgs>(args: SelectSubset<T, PastorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pastor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorFindFirstArgs} args - Arguments to find a Pastor
     * @example
     * // Get one Pastor
     * const pastor = await prisma.pastor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PastorFindFirstArgs>(args?: SelectSubset<T, PastorFindFirstArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pastor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorFindFirstOrThrowArgs} args - Arguments to find a Pastor
     * @example
     * // Get one Pastor
     * const pastor = await prisma.pastor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PastorFindFirstOrThrowArgs>(args?: SelectSubset<T, PastorFindFirstOrThrowArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pastors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pastors
     * const pastors = await prisma.pastor.findMany()
     * 
     * // Get first 10 Pastors
     * const pastors = await prisma.pastor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pastorWithIdOnly = await prisma.pastor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PastorFindManyArgs>(args?: SelectSubset<T, PastorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pastor.
     * @param {PastorCreateArgs} args - Arguments to create a Pastor.
     * @example
     * // Create one Pastor
     * const Pastor = await prisma.pastor.create({
     *   data: {
     *     // ... data to create a Pastor
     *   }
     * })
     * 
     */
    create<T extends PastorCreateArgs>(args: SelectSubset<T, PastorCreateArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pastors.
     * @param {PastorCreateManyArgs} args - Arguments to create many Pastors.
     * @example
     * // Create many Pastors
     * const pastor = await prisma.pastor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PastorCreateManyArgs>(args?: SelectSubset<T, PastorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pastors and returns the data saved in the database.
     * @param {PastorCreateManyAndReturnArgs} args - Arguments to create many Pastors.
     * @example
     * // Create many Pastors
     * const pastor = await prisma.pastor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pastors and only return the `id`
     * const pastorWithIdOnly = await prisma.pastor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PastorCreateManyAndReturnArgs>(args?: SelectSubset<T, PastorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pastor.
     * @param {PastorDeleteArgs} args - Arguments to delete one Pastor.
     * @example
     * // Delete one Pastor
     * const Pastor = await prisma.pastor.delete({
     *   where: {
     *     // ... filter to delete one Pastor
     *   }
     * })
     * 
     */
    delete<T extends PastorDeleteArgs>(args: SelectSubset<T, PastorDeleteArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pastor.
     * @param {PastorUpdateArgs} args - Arguments to update one Pastor.
     * @example
     * // Update one Pastor
     * const pastor = await prisma.pastor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PastorUpdateArgs>(args: SelectSubset<T, PastorUpdateArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pastors.
     * @param {PastorDeleteManyArgs} args - Arguments to filter Pastors to delete.
     * @example
     * // Delete a few Pastors
     * const { count } = await prisma.pastor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PastorDeleteManyArgs>(args?: SelectSubset<T, PastorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pastors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pastors
     * const pastor = await prisma.pastor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PastorUpdateManyArgs>(args: SelectSubset<T, PastorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pastors and returns the data updated in the database.
     * @param {PastorUpdateManyAndReturnArgs} args - Arguments to update many Pastors.
     * @example
     * // Update many Pastors
     * const pastor = await prisma.pastor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pastors and only return the `id`
     * const pastorWithIdOnly = await prisma.pastor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PastorUpdateManyAndReturnArgs>(args: SelectSubset<T, PastorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pastor.
     * @param {PastorUpsertArgs} args - Arguments to update or create a Pastor.
     * @example
     * // Update or create a Pastor
     * const pastor = await prisma.pastor.upsert({
     *   create: {
     *     // ... data to create a Pastor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pastor we want to update
     *   }
     * })
     */
    upsert<T extends PastorUpsertArgs>(args: SelectSubset<T, PastorUpsertArgs<ExtArgs>>): Prisma__PastorClient<$Result.GetResult<Prisma.$PastorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pastors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorCountArgs} args - Arguments to filter Pastors to count.
     * @example
     * // Count the number of Pastors
     * const count = await prisma.pastor.count({
     *   where: {
     *     // ... the filter for the Pastors we want to count
     *   }
     * })
    **/
    count<T extends PastorCountArgs>(
      args?: Subset<T, PastorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PastorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pastor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PastorAggregateArgs>(args: Subset<T, PastorAggregateArgs>): Prisma.PrismaPromise<GetPastorAggregateType<T>>

    /**
     * Group by Pastor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PastorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PastorGroupByArgs['orderBy'] }
        : { orderBy?: PastorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PastorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPastorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pastor model
   */
  readonly fields: PastorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pastor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PastorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pastor model
   */
  interface PastorFieldRefs {
    readonly id: FieldRef<"Pastor", 'String'>
    readonly name: FieldRef<"Pastor", 'String'>
    readonly churchId: FieldRef<"Pastor", 'String'>
    readonly createdAt: FieldRef<"Pastor", 'DateTime'>
    readonly updatedAt: FieldRef<"Pastor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pastor findUnique
   */
  export type PastorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * Filter, which Pastor to fetch.
     */
    where: PastorWhereUniqueInput
  }

  /**
   * Pastor findUniqueOrThrow
   */
  export type PastorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * Filter, which Pastor to fetch.
     */
    where: PastorWhereUniqueInput
  }

  /**
   * Pastor findFirst
   */
  export type PastorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * Filter, which Pastor to fetch.
     */
    where?: PastorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastors to fetch.
     */
    orderBy?: PastorOrderByWithRelationInput | PastorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pastors.
     */
    cursor?: PastorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pastors.
     */
    distinct?: PastorScalarFieldEnum | PastorScalarFieldEnum[]
  }

  /**
   * Pastor findFirstOrThrow
   */
  export type PastorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * Filter, which Pastor to fetch.
     */
    where?: PastorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastors to fetch.
     */
    orderBy?: PastorOrderByWithRelationInput | PastorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pastors.
     */
    cursor?: PastorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pastors.
     */
    distinct?: PastorScalarFieldEnum | PastorScalarFieldEnum[]
  }

  /**
   * Pastor findMany
   */
  export type PastorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * Filter, which Pastors to fetch.
     */
    where?: PastorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastors to fetch.
     */
    orderBy?: PastorOrderByWithRelationInput | PastorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pastors.
     */
    cursor?: PastorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastors.
     */
    skip?: number
    distinct?: PastorScalarFieldEnum | PastorScalarFieldEnum[]
  }

  /**
   * Pastor create
   */
  export type PastorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * The data needed to create a Pastor.
     */
    data: XOR<PastorCreateInput, PastorUncheckedCreateInput>
  }

  /**
   * Pastor createMany
   */
  export type PastorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pastors.
     */
    data: PastorCreateManyInput | PastorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pastor createManyAndReturn
   */
  export type PastorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * The data used to create many Pastors.
     */
    data: PastorCreateManyInput | PastorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pastor update
   */
  export type PastorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * The data needed to update a Pastor.
     */
    data: XOR<PastorUpdateInput, PastorUncheckedUpdateInput>
    /**
     * Choose, which Pastor to update.
     */
    where: PastorWhereUniqueInput
  }

  /**
   * Pastor updateMany
   */
  export type PastorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pastors.
     */
    data: XOR<PastorUpdateManyMutationInput, PastorUncheckedUpdateManyInput>
    /**
     * Filter which Pastors to update
     */
    where?: PastorWhereInput
    /**
     * Limit how many Pastors to update.
     */
    limit?: number
  }

  /**
   * Pastor updateManyAndReturn
   */
  export type PastorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * The data used to update Pastors.
     */
    data: XOR<PastorUpdateManyMutationInput, PastorUncheckedUpdateManyInput>
    /**
     * Filter which Pastors to update
     */
    where?: PastorWhereInput
    /**
     * Limit how many Pastors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pastor upsert
   */
  export type PastorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * The filter to search for the Pastor to update in case it exists.
     */
    where: PastorWhereUniqueInput
    /**
     * In case the Pastor found by the `where` argument doesn't exist, create a new Pastor with this data.
     */
    create: XOR<PastorCreateInput, PastorUncheckedCreateInput>
    /**
     * In case the Pastor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PastorUpdateInput, PastorUncheckedUpdateInput>
  }

  /**
   * Pastor delete
   */
  export type PastorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
    /**
     * Filter which Pastor to delete.
     */
    where: PastorWhereUniqueInput
  }

  /**
   * Pastor deleteMany
   */
  export type PastorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pastors to delete
     */
    where?: PastorWhereInput
    /**
     * Limit how many Pastors to delete.
     */
    limit?: number
  }

  /**
   * Pastor without action
   */
  export type PastorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pastor
     */
    select?: PastorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pastor
     */
    omit?: PastorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastorInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    preRegistrationFee: number | null
    onsiteRegistrationFee: number | null
    cookRegistrationFee: number | null
  }

  export type EventSumAggregateOutputType = {
    preRegistrationFee: number | null
    onsiteRegistrationFee: number | null
    cookRegistrationFee: number | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    location: string | null
    banner: string | null
    startDate: Date | null
    endDate: Date | null
    registrationDeadline: Date | null
    preRegistrationFee: number | null
    preRegistrationStart: Date | null
    preRegistrationEnd: Date | null
    onsiteRegistrationFee: number | null
    cookRegistrationFee: number | null
    status: $Enums.EventStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    location: string | null
    banner: string | null
    startDate: Date | null
    endDate: Date | null
    registrationDeadline: Date | null
    preRegistrationFee: number | null
    preRegistrationStart: Date | null
    preRegistrationEnd: Date | null
    onsiteRegistrationFee: number | null
    cookRegistrationFee: number | null
    status: $Enums.EventStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    name: number
    description: number
    location: number
    banner: number
    startDate: number
    endDate: number
    registrationDeadline: number
    preRegistrationFee: number
    preRegistrationStart: number
    preRegistrationEnd: number
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    preRegistrationFee?: true
    onsiteRegistrationFee?: true
    cookRegistrationFee?: true
  }

  export type EventSumAggregateInputType = {
    preRegistrationFee?: true
    onsiteRegistrationFee?: true
    cookRegistrationFee?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    location?: true
    banner?: true
    startDate?: true
    endDate?: true
    registrationDeadline?: true
    preRegistrationFee?: true
    preRegistrationStart?: true
    preRegistrationEnd?: true
    onsiteRegistrationFee?: true
    cookRegistrationFee?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    location?: true
    banner?: true
    startDate?: true
    endDate?: true
    registrationDeadline?: true
    preRegistrationFee?: true
    preRegistrationStart?: true
    preRegistrationEnd?: true
    onsiteRegistrationFee?: true
    cookRegistrationFee?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    location?: true
    banner?: true
    startDate?: true
    endDate?: true
    registrationDeadline?: true
    preRegistrationFee?: true
    preRegistrationStart?: true
    preRegistrationEnd?: true
    onsiteRegistrationFee?: true
    cookRegistrationFee?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    name: string
    description: string | null
    location: string
    banner: string | null
    startDate: Date
    endDate: Date
    registrationDeadline: Date
    preRegistrationFee: number
    preRegistrationStart: Date
    preRegistrationEnd: Date
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status: $Enums.EventStatus
    createdAt: Date
    updatedAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    banner?: boolean
    startDate?: boolean
    endDate?: boolean
    registrationDeadline?: boolean
    preRegistrationFee?: boolean
    preRegistrationStart?: boolean
    preRegistrationEnd?: boolean
    onsiteRegistrationFee?: boolean
    cookRegistrationFee?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registrations?: boolean | Event$registrationsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    banner?: boolean
    startDate?: boolean
    endDate?: boolean
    registrationDeadline?: boolean
    preRegistrationFee?: boolean
    preRegistrationStart?: boolean
    preRegistrationEnd?: boolean
    onsiteRegistrationFee?: boolean
    cookRegistrationFee?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    banner?: boolean
    startDate?: boolean
    endDate?: boolean
    registrationDeadline?: boolean
    preRegistrationFee?: boolean
    preRegistrationStart?: boolean
    preRegistrationEnd?: boolean
    onsiteRegistrationFee?: boolean
    cookRegistrationFee?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    banner?: boolean
    startDate?: boolean
    endDate?: boolean
    registrationDeadline?: boolean
    preRegistrationFee?: boolean
    preRegistrationStart?: boolean
    preRegistrationEnd?: boolean
    onsiteRegistrationFee?: boolean
    cookRegistrationFee?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "location" | "banner" | "startDate" | "endDate" | "registrationDeadline" | "preRegistrationFee" | "preRegistrationStart" | "preRegistrationEnd" | "onsiteRegistrationFee" | "cookRegistrationFee" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | Event$registrationsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      registrations: Prisma.$RegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      location: string
      banner: string | null
      startDate: Date
      endDate: Date
      registrationDeadline: Date
      preRegistrationFee: number
      preRegistrationStart: Date
      preRegistrationEnd: Date
      onsiteRegistrationFee: number
      cookRegistrationFee: number
      status: $Enums.EventStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registrations<T extends Event$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Event$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly name: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly location: FieldRef<"Event", 'String'>
    readonly banner: FieldRef<"Event", 'String'>
    readonly startDate: FieldRef<"Event", 'DateTime'>
    readonly endDate: FieldRef<"Event", 'DateTime'>
    readonly registrationDeadline: FieldRef<"Event", 'DateTime'>
    readonly preRegistrationFee: FieldRef<"Event", 'Int'>
    readonly preRegistrationStart: FieldRef<"Event", 'DateTime'>
    readonly preRegistrationEnd: FieldRef<"Event", 'DateTime'>
    readonly onsiteRegistrationFee: FieldRef<"Event", 'Int'>
    readonly cookRegistrationFee: FieldRef<"Event", 'Int'>
    readonly status: FieldRef<"Event", 'EventStatus'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.registrations
   */
  export type Event$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    cursor?: RegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Registration
   */

  export type AggregateRegistration = {
    _count: RegistrationCountAggregateOutputType | null
    _avg: RegistrationAvgAggregateOutputType | null
    _sum: RegistrationSumAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  export type RegistrationAvgAggregateOutputType = {
    totalFee: number | null
    delegateFeePerPerson: number | null
    cookFeePerPerson: number | null
  }

  export type RegistrationSumAggregateOutputType = {
    totalFee: number | null
    delegateFeePerPerson: number | null
    cookFeePerPerson: number | null
  }

  export type RegistrationMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    churchId: string | null
    presidentId: string | null
    status: $Enums.RegistrationStatus | null
    remarks: string | null
    receiptImage: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    totalFee: number | null
    delegateFeePerPerson: number | null
    cookFeePerPerson: number | null
    isPreRegistration: boolean | null
  }

  export type RegistrationMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    churchId: string | null
    presidentId: string | null
    status: $Enums.RegistrationStatus | null
    remarks: string | null
    receiptImage: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    totalFee: number | null
    delegateFeePerPerson: number | null
    cookFeePerPerson: number | null
    isPreRegistration: boolean | null
  }

  export type RegistrationCountAggregateOutputType = {
    id: number
    eventId: number
    churchId: number
    presidentId: number
    status: number
    remarks: number
    receiptImage: number
    reviewedAt: number
    reviewedBy: number
    createdAt: number
    updatedAt: number
    totalFee: number
    delegateFeePerPerson: number
    cookFeePerPerson: number
    isPreRegistration: number
    _all: number
  }


  export type RegistrationAvgAggregateInputType = {
    totalFee?: true
    delegateFeePerPerson?: true
    cookFeePerPerson?: true
  }

  export type RegistrationSumAggregateInputType = {
    totalFee?: true
    delegateFeePerPerson?: true
    cookFeePerPerson?: true
  }

  export type RegistrationMinAggregateInputType = {
    id?: true
    eventId?: true
    churchId?: true
    presidentId?: true
    status?: true
    remarks?: true
    receiptImage?: true
    reviewedAt?: true
    reviewedBy?: true
    createdAt?: true
    updatedAt?: true
    totalFee?: true
    delegateFeePerPerson?: true
    cookFeePerPerson?: true
    isPreRegistration?: true
  }

  export type RegistrationMaxAggregateInputType = {
    id?: true
    eventId?: true
    churchId?: true
    presidentId?: true
    status?: true
    remarks?: true
    receiptImage?: true
    reviewedAt?: true
    reviewedBy?: true
    createdAt?: true
    updatedAt?: true
    totalFee?: true
    delegateFeePerPerson?: true
    cookFeePerPerson?: true
    isPreRegistration?: true
  }

  export type RegistrationCountAggregateInputType = {
    id?: true
    eventId?: true
    churchId?: true
    presidentId?: true
    status?: true
    remarks?: true
    receiptImage?: true
    reviewedAt?: true
    reviewedBy?: true
    createdAt?: true
    updatedAt?: true
    totalFee?: true
    delegateFeePerPerson?: true
    cookFeePerPerson?: true
    isPreRegistration?: true
    _all?: true
  }

  export type RegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registration to aggregate.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Registrations
    **/
    _count?: true | RegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationMaxAggregateInputType
  }

  export type GetRegistrationAggregateType<T extends RegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistration[P]>
      : GetScalarType<T[P], AggregateRegistration[P]>
  }




  export type RegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithAggregationInput | RegistrationOrderByWithAggregationInput[]
    by: RegistrationScalarFieldEnum[] | RegistrationScalarFieldEnum
    having?: RegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationCountAggregateInputType | true
    _avg?: RegistrationAvgAggregateInputType
    _sum?: RegistrationSumAggregateInputType
    _min?: RegistrationMinAggregateInputType
    _max?: RegistrationMaxAggregateInputType
  }

  export type RegistrationGroupByOutputType = {
    id: string
    eventId: string
    churchId: string
    presidentId: string
    status: $Enums.RegistrationStatus
    remarks: string | null
    receiptImage: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    createdAt: Date
    updatedAt: Date
    totalFee: number
    delegateFeePerPerson: number
    cookFeePerPerson: number
    isPreRegistration: boolean
    _count: RegistrationCountAggregateOutputType | null
    _avg: RegistrationAvgAggregateOutputType | null
    _sum: RegistrationSumAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  type GetRegistrationGroupByPayload<T extends RegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
        }
      >
    >


  export type RegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    churchId?: boolean
    presidentId?: boolean
    status?: boolean
    remarks?: boolean
    receiptImage?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalFee?: boolean
    delegateFeePerPerson?: boolean
    cookFeePerPerson?: boolean
    isPreRegistration?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    president?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | Registration$reviewerArgs<ExtArgs>
    delegates?: boolean | Registration$delegatesArgs<ExtArgs>
    cooks?: boolean | Registration$cooksArgs<ExtArgs>
    _count?: boolean | RegistrationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>

  export type RegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    churchId?: boolean
    presidentId?: boolean
    status?: boolean
    remarks?: boolean
    receiptImage?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalFee?: boolean
    delegateFeePerPerson?: boolean
    cookFeePerPerson?: boolean
    isPreRegistration?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    president?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | Registration$reviewerArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>

  export type RegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    churchId?: boolean
    presidentId?: boolean
    status?: boolean
    remarks?: boolean
    receiptImage?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalFee?: boolean
    delegateFeePerPerson?: boolean
    cookFeePerPerson?: boolean
    isPreRegistration?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    president?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | Registration$reviewerArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>

  export type RegistrationSelectScalar = {
    id?: boolean
    eventId?: boolean
    churchId?: boolean
    presidentId?: boolean
    status?: boolean
    remarks?: boolean
    receiptImage?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalFee?: boolean
    delegateFeePerPerson?: boolean
    cookFeePerPerson?: boolean
    isPreRegistration?: boolean
  }

  export type RegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "churchId" | "presidentId" | "status" | "remarks" | "receiptImage" | "reviewedAt" | "reviewedBy" | "createdAt" | "updatedAt" | "totalFee" | "delegateFeePerPerson" | "cookFeePerPerson" | "isPreRegistration", ExtArgs["result"]["registration"]>
  export type RegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    president?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | Registration$reviewerArgs<ExtArgs>
    delegates?: boolean | Registration$delegatesArgs<ExtArgs>
    cooks?: boolean | Registration$cooksArgs<ExtArgs>
    _count?: boolean | RegistrationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    president?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | Registration$reviewerArgs<ExtArgs>
  }
  export type RegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    president?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | Registration$reviewerArgs<ExtArgs>
  }

  export type $RegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Registration"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      church: Prisma.$ChurchPayload<ExtArgs>
      president: Prisma.$UserPayload<ExtArgs>
      reviewer: Prisma.$UserPayload<ExtArgs> | null
      delegates: Prisma.$DelegatePayload<ExtArgs>[]
      cooks: Prisma.$CookPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      churchId: string
      presidentId: string
      status: $Enums.RegistrationStatus
      remarks: string | null
      receiptImage: string | null
      reviewedAt: Date | null
      reviewedBy: string | null
      createdAt: Date
      updatedAt: Date
      totalFee: number
      delegateFeePerPerson: number
      cookFeePerPerson: number
      isPreRegistration: boolean
    }, ExtArgs["result"]["registration"]>
    composites: {}
  }

  type RegistrationGetPayload<S extends boolean | null | undefined | RegistrationDefaultArgs> = $Result.GetResult<Prisma.$RegistrationPayload, S>

  type RegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationCountAggregateInputType | true
    }

  export interface RegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Registration'], meta: { name: 'Registration' } }
    /**
     * Find zero or one Registration that matches the filter.
     * @param {RegistrationFindUniqueArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationFindUniqueArgs>(args: SelectSubset<T, RegistrationFindUniqueArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationFindUniqueOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationFindFirstArgs>(args?: SelectSubset<T, RegistrationFindFirstArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registrations
     * const registrations = await prisma.registration.findMany()
     * 
     * // Get first 10 Registrations
     * const registrations = await prisma.registration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationWithIdOnly = await prisma.registration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistrationFindManyArgs>(args?: SelectSubset<T, RegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registration.
     * @param {RegistrationCreateArgs} args - Arguments to create a Registration.
     * @example
     * // Create one Registration
     * const Registration = await prisma.registration.create({
     *   data: {
     *     // ... data to create a Registration
     *   }
     * })
     * 
     */
    create<T extends RegistrationCreateArgs>(args: SelectSubset<T, RegistrationCreateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registrations.
     * @param {RegistrationCreateManyArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registration = await prisma.registration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrationCreateManyArgs>(args?: SelectSubset<T, RegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Registrations and returns the data saved in the database.
     * @param {RegistrationCreateManyAndReturnArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registration = await prisma.registration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Registrations and only return the `id`
     * const registrationWithIdOnly = await prisma.registration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, RegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Registration.
     * @param {RegistrationDeleteArgs} args - Arguments to delete one Registration.
     * @example
     * // Delete one Registration
     * const Registration = await prisma.registration.delete({
     *   where: {
     *     // ... filter to delete one Registration
     *   }
     * })
     * 
     */
    delete<T extends RegistrationDeleteArgs>(args: SelectSubset<T, RegistrationDeleteArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registration.
     * @param {RegistrationUpdateArgs} args - Arguments to update one Registration.
     * @example
     * // Update one Registration
     * const registration = await prisma.registration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrationUpdateArgs>(args: SelectSubset<T, RegistrationUpdateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registrations.
     * @param {RegistrationDeleteManyArgs} args - Arguments to filter Registrations to delete.
     * @example
     * // Delete a few Registrations
     * const { count } = await prisma.registration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrationDeleteManyArgs>(args?: SelectSubset<T, RegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registrations
     * const registration = await prisma.registration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrationUpdateManyArgs>(args: SelectSubset<T, RegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations and returns the data updated in the database.
     * @param {RegistrationUpdateManyAndReturnArgs} args - Arguments to update many Registrations.
     * @example
     * // Update many Registrations
     * const registration = await prisma.registration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Registrations and only return the `id`
     * const registrationWithIdOnly = await prisma.registration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, RegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Registration.
     * @param {RegistrationUpsertArgs} args - Arguments to update or create a Registration.
     * @example
     * // Update or create a Registration
     * const registration = await prisma.registration.upsert({
     *   create: {
     *     // ... data to create a Registration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registration we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationUpsertArgs>(args: SelectSubset<T, RegistrationUpsertArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationCountArgs} args - Arguments to filter Registrations to count.
     * @example
     * // Count the number of Registrations
     * const count = await prisma.registration.count({
     *   where: {
     *     // ... the filter for the Registrations we want to count
     *   }
     * })
    **/
    count<T extends RegistrationCountArgs>(
      args?: Subset<T, RegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationAggregateArgs>(args: Subset<T, RegistrationAggregateArgs>): Prisma.PrismaPromise<GetRegistrationAggregateType<T>>

    /**
     * Group by Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrationGroupByArgs['orderBy'] }
        : { orderBy?: RegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Registration model
   */
  readonly fields: RegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Registration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    president<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewer<T extends Registration$reviewerArgs<ExtArgs> = {}>(args?: Subset<T, Registration$reviewerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    delegates<T extends Registration$delegatesArgs<ExtArgs> = {}>(args?: Subset<T, Registration$delegatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cooks<T extends Registration$cooksArgs<ExtArgs> = {}>(args?: Subset<T, Registration$cooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Registration model
   */
  interface RegistrationFieldRefs {
    readonly id: FieldRef<"Registration", 'String'>
    readonly eventId: FieldRef<"Registration", 'String'>
    readonly churchId: FieldRef<"Registration", 'String'>
    readonly presidentId: FieldRef<"Registration", 'String'>
    readonly status: FieldRef<"Registration", 'RegistrationStatus'>
    readonly remarks: FieldRef<"Registration", 'String'>
    readonly receiptImage: FieldRef<"Registration", 'String'>
    readonly reviewedAt: FieldRef<"Registration", 'DateTime'>
    readonly reviewedBy: FieldRef<"Registration", 'String'>
    readonly createdAt: FieldRef<"Registration", 'DateTime'>
    readonly updatedAt: FieldRef<"Registration", 'DateTime'>
    readonly totalFee: FieldRef<"Registration", 'Int'>
    readonly delegateFeePerPerson: FieldRef<"Registration", 'Int'>
    readonly cookFeePerPerson: FieldRef<"Registration", 'Int'>
    readonly isPreRegistration: FieldRef<"Registration", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Registration findUnique
   */
  export type RegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findUniqueOrThrow
   */
  export type RegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findFirst
   */
  export type RegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findFirstOrThrow
   */
  export type RegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findMany
   */
  export type RegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registrations to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration create
   */
  export type RegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a Registration.
     */
    data: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
  }

  /**
   * Registration createMany
   */
  export type RegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Registrations.
     */
    data: RegistrationCreateManyInput | RegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Registration createManyAndReturn
   */
  export type RegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many Registrations.
     */
    data: RegistrationCreateManyInput | RegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Registration update
   */
  export type RegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a Registration.
     */
    data: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
    /**
     * Choose, which Registration to update.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration updateMany
   */
  export type RegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Registrations.
     */
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyInput>
    /**
     * Filter which Registrations to update
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to update.
     */
    limit?: number
  }

  /**
   * Registration updateManyAndReturn
   */
  export type RegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * The data used to update Registrations.
     */
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyInput>
    /**
     * Filter which Registrations to update
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Registration upsert
   */
  export type RegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the Registration to update in case it exists.
     */
    where: RegistrationWhereUniqueInput
    /**
     * In case the Registration found by the `where` argument doesn't exist, create a new Registration with this data.
     */
    create: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
    /**
     * In case the Registration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
  }

  /**
   * Registration delete
   */
  export type RegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter which Registration to delete.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration deleteMany
   */
  export type RegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registrations to delete
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to delete.
     */
    limit?: number
  }

  /**
   * Registration.reviewer
   */
  export type Registration$reviewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Registration.delegates
   */
  export type Registration$delegatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    where?: DelegateWhereInput
    orderBy?: DelegateOrderByWithRelationInput | DelegateOrderByWithRelationInput[]
    cursor?: DelegateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DelegateScalarFieldEnum | DelegateScalarFieldEnum[]
  }

  /**
   * Registration.cooks
   */
  export type Registration$cooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    where?: CookWhereInput
    orderBy?: CookOrderByWithRelationInput | CookOrderByWithRelationInput[]
    cursor?: CookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CookScalarFieldEnum | CookScalarFieldEnum[]
  }

  /**
   * Registration without action
   */
  export type RegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
  }


  /**
   * Model Delegate
   */

  export type AggregateDelegate = {
    _count: DelegateCountAggregateOutputType | null
    _avg: DelegateAvgAggregateOutputType | null
    _sum: DelegateSumAggregateOutputType | null
    _min: DelegateMinAggregateOutputType | null
    _max: DelegateMaxAggregateOutputType | null
  }

  export type DelegateAvgAggregateOutputType = {
    age: number | null
  }

  export type DelegateSumAggregateOutputType = {
    age: number | null
  }

  export type DelegateMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    nickname: string | null
    age: number | null
    gender: $Enums.Gender | null
    registrationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DelegateMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    nickname: string | null
    age: number | null
    gender: $Enums.Gender | null
    registrationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DelegateCountAggregateOutputType = {
    id: number
    fullName: number
    nickname: number
    age: number
    gender: number
    registrationId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DelegateAvgAggregateInputType = {
    age?: true
  }

  export type DelegateSumAggregateInputType = {
    age?: true
  }

  export type DelegateMinAggregateInputType = {
    id?: true
    fullName?: true
    nickname?: true
    age?: true
    gender?: true
    registrationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DelegateMaxAggregateInputType = {
    id?: true
    fullName?: true
    nickname?: true
    age?: true
    gender?: true
    registrationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DelegateCountAggregateInputType = {
    id?: true
    fullName?: true
    nickname?: true
    age?: true
    gender?: true
    registrationId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DelegateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delegate to aggregate.
     */
    where?: DelegateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegates to fetch.
     */
    orderBy?: DelegateOrderByWithRelationInput | DelegateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DelegateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Delegates
    **/
    _count?: true | DelegateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DelegateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DelegateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegateMaxAggregateInputType
  }

  export type GetDelegateAggregateType<T extends DelegateAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegate[P]>
      : GetScalarType<T[P], AggregateDelegate[P]>
  }




  export type DelegateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegateWhereInput
    orderBy?: DelegateOrderByWithAggregationInput | DelegateOrderByWithAggregationInput[]
    by: DelegateScalarFieldEnum[] | DelegateScalarFieldEnum
    having?: DelegateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegateCountAggregateInputType | true
    _avg?: DelegateAvgAggregateInputType
    _sum?: DelegateSumAggregateInputType
    _min?: DelegateMinAggregateInputType
    _max?: DelegateMaxAggregateInputType
  }

  export type DelegateGroupByOutputType = {
    id: string
    fullName: string
    nickname: string | null
    age: number
    gender: $Enums.Gender
    registrationId: string
    createdAt: Date
    updatedAt: Date
    _count: DelegateCountAggregateOutputType | null
    _avg: DelegateAvgAggregateOutputType | null
    _sum: DelegateSumAggregateOutputType | null
    _min: DelegateMinAggregateOutputType | null
    _max: DelegateMaxAggregateOutputType | null
  }

  type GetDelegateGroupByPayload<T extends DelegateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DelegateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegateGroupByOutputType[P]>
            : GetScalarType<T[P], DelegateGroupByOutputType[P]>
        }
      >
    >


  export type DelegateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegate"]>

  export type DelegateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegate"]>

  export type DelegateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegate"]>

  export type DelegateSelectScalar = {
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DelegateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "nickname" | "age" | "gender" | "registrationId" | "createdAt" | "updatedAt", ExtArgs["result"]["delegate"]>
  export type DelegateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }
  export type DelegateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }
  export type DelegateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }

  export type $DelegatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Delegate"
    objects: {
      registration: Prisma.$RegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      nickname: string | null
      age: number
      gender: $Enums.Gender
      registrationId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["delegate"]>
    composites: {}
  }

  type DelegateGetPayload<S extends boolean | null | undefined | DelegateDefaultArgs> = $Result.GetResult<Prisma.$DelegatePayload, S>

  type DelegateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DelegateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DelegateCountAggregateInputType | true
    }

  export interface DelegateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delegate'], meta: { name: 'Delegate' } }
    /**
     * Find zero or one Delegate that matches the filter.
     * @param {DelegateFindUniqueArgs} args - Arguments to find a Delegate
     * @example
     * // Get one Delegate
     * const delegate = await prisma.delegate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DelegateFindUniqueArgs>(args: SelectSubset<T, DelegateFindUniqueArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Delegate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DelegateFindUniqueOrThrowArgs} args - Arguments to find a Delegate
     * @example
     * // Get one Delegate
     * const delegate = await prisma.delegate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DelegateFindUniqueOrThrowArgs>(args: SelectSubset<T, DelegateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delegate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateFindFirstArgs} args - Arguments to find a Delegate
     * @example
     * // Get one Delegate
     * const delegate = await prisma.delegate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DelegateFindFirstArgs>(args?: SelectSubset<T, DelegateFindFirstArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delegate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateFindFirstOrThrowArgs} args - Arguments to find a Delegate
     * @example
     * // Get one Delegate
     * const delegate = await prisma.delegate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DelegateFindFirstOrThrowArgs>(args?: SelectSubset<T, DelegateFindFirstOrThrowArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Delegates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Delegates
     * const delegates = await prisma.delegate.findMany()
     * 
     * // Get first 10 Delegates
     * const delegates = await prisma.delegate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const delegateWithIdOnly = await prisma.delegate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DelegateFindManyArgs>(args?: SelectSubset<T, DelegateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Delegate.
     * @param {DelegateCreateArgs} args - Arguments to create a Delegate.
     * @example
     * // Create one Delegate
     * const Delegate = await prisma.delegate.create({
     *   data: {
     *     // ... data to create a Delegate
     *   }
     * })
     * 
     */
    create<T extends DelegateCreateArgs>(args: SelectSubset<T, DelegateCreateArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Delegates.
     * @param {DelegateCreateManyArgs} args - Arguments to create many Delegates.
     * @example
     * // Create many Delegates
     * const delegate = await prisma.delegate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DelegateCreateManyArgs>(args?: SelectSubset<T, DelegateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Delegates and returns the data saved in the database.
     * @param {DelegateCreateManyAndReturnArgs} args - Arguments to create many Delegates.
     * @example
     * // Create many Delegates
     * const delegate = await prisma.delegate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Delegates and only return the `id`
     * const delegateWithIdOnly = await prisma.delegate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DelegateCreateManyAndReturnArgs>(args?: SelectSubset<T, DelegateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Delegate.
     * @param {DelegateDeleteArgs} args - Arguments to delete one Delegate.
     * @example
     * // Delete one Delegate
     * const Delegate = await prisma.delegate.delete({
     *   where: {
     *     // ... filter to delete one Delegate
     *   }
     * })
     * 
     */
    delete<T extends DelegateDeleteArgs>(args: SelectSubset<T, DelegateDeleteArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Delegate.
     * @param {DelegateUpdateArgs} args - Arguments to update one Delegate.
     * @example
     * // Update one Delegate
     * const delegate = await prisma.delegate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DelegateUpdateArgs>(args: SelectSubset<T, DelegateUpdateArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Delegates.
     * @param {DelegateDeleteManyArgs} args - Arguments to filter Delegates to delete.
     * @example
     * // Delete a few Delegates
     * const { count } = await prisma.delegate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DelegateDeleteManyArgs>(args?: SelectSubset<T, DelegateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Delegates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Delegates
     * const delegate = await prisma.delegate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DelegateUpdateManyArgs>(args: SelectSubset<T, DelegateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Delegates and returns the data updated in the database.
     * @param {DelegateUpdateManyAndReturnArgs} args - Arguments to update many Delegates.
     * @example
     * // Update many Delegates
     * const delegate = await prisma.delegate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Delegates and only return the `id`
     * const delegateWithIdOnly = await prisma.delegate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DelegateUpdateManyAndReturnArgs>(args: SelectSubset<T, DelegateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Delegate.
     * @param {DelegateUpsertArgs} args - Arguments to update or create a Delegate.
     * @example
     * // Update or create a Delegate
     * const delegate = await prisma.delegate.upsert({
     *   create: {
     *     // ... data to create a Delegate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delegate we want to update
     *   }
     * })
     */
    upsert<T extends DelegateUpsertArgs>(args: SelectSubset<T, DelegateUpsertArgs<ExtArgs>>): Prisma__DelegateClient<$Result.GetResult<Prisma.$DelegatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Delegates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateCountArgs} args - Arguments to filter Delegates to count.
     * @example
     * // Count the number of Delegates
     * const count = await prisma.delegate.count({
     *   where: {
     *     // ... the filter for the Delegates we want to count
     *   }
     * })
    **/
    count<T extends DelegateCountArgs>(
      args?: Subset<T, DelegateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delegate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DelegateAggregateArgs>(args: Subset<T, DelegateAggregateArgs>): Prisma.PrismaPromise<GetDelegateAggregateType<T>>

    /**
     * Group by Delegate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DelegateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegateGroupByArgs['orderBy'] }
        : { orderBy?: DelegateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DelegateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Delegate model
   */
  readonly fields: DelegateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Delegate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DelegateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registration<T extends RegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegistrationDefaultArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Delegate model
   */
  interface DelegateFieldRefs {
    readonly id: FieldRef<"Delegate", 'String'>
    readonly fullName: FieldRef<"Delegate", 'String'>
    readonly nickname: FieldRef<"Delegate", 'String'>
    readonly age: FieldRef<"Delegate", 'Int'>
    readonly gender: FieldRef<"Delegate", 'Gender'>
    readonly registrationId: FieldRef<"Delegate", 'String'>
    readonly createdAt: FieldRef<"Delegate", 'DateTime'>
    readonly updatedAt: FieldRef<"Delegate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Delegate findUnique
   */
  export type DelegateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * Filter, which Delegate to fetch.
     */
    where: DelegateWhereUniqueInput
  }

  /**
   * Delegate findUniqueOrThrow
   */
  export type DelegateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * Filter, which Delegate to fetch.
     */
    where: DelegateWhereUniqueInput
  }

  /**
   * Delegate findFirst
   */
  export type DelegateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * Filter, which Delegate to fetch.
     */
    where?: DelegateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegates to fetch.
     */
    orderBy?: DelegateOrderByWithRelationInput | DelegateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Delegates.
     */
    cursor?: DelegateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Delegates.
     */
    distinct?: DelegateScalarFieldEnum | DelegateScalarFieldEnum[]
  }

  /**
   * Delegate findFirstOrThrow
   */
  export type DelegateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * Filter, which Delegate to fetch.
     */
    where?: DelegateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegates to fetch.
     */
    orderBy?: DelegateOrderByWithRelationInput | DelegateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Delegates.
     */
    cursor?: DelegateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Delegates.
     */
    distinct?: DelegateScalarFieldEnum | DelegateScalarFieldEnum[]
  }

  /**
   * Delegate findMany
   */
  export type DelegateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * Filter, which Delegates to fetch.
     */
    where?: DelegateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegates to fetch.
     */
    orderBy?: DelegateOrderByWithRelationInput | DelegateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Delegates.
     */
    cursor?: DelegateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegates.
     */
    skip?: number
    distinct?: DelegateScalarFieldEnum | DelegateScalarFieldEnum[]
  }

  /**
   * Delegate create
   */
  export type DelegateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * The data needed to create a Delegate.
     */
    data: XOR<DelegateCreateInput, DelegateUncheckedCreateInput>
  }

  /**
   * Delegate createMany
   */
  export type DelegateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Delegates.
     */
    data: DelegateCreateManyInput | DelegateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delegate createManyAndReturn
   */
  export type DelegateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * The data used to create many Delegates.
     */
    data: DelegateCreateManyInput | DelegateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delegate update
   */
  export type DelegateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * The data needed to update a Delegate.
     */
    data: XOR<DelegateUpdateInput, DelegateUncheckedUpdateInput>
    /**
     * Choose, which Delegate to update.
     */
    where: DelegateWhereUniqueInput
  }

  /**
   * Delegate updateMany
   */
  export type DelegateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Delegates.
     */
    data: XOR<DelegateUpdateManyMutationInput, DelegateUncheckedUpdateManyInput>
    /**
     * Filter which Delegates to update
     */
    where?: DelegateWhereInput
    /**
     * Limit how many Delegates to update.
     */
    limit?: number
  }

  /**
   * Delegate updateManyAndReturn
   */
  export type DelegateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * The data used to update Delegates.
     */
    data: XOR<DelegateUpdateManyMutationInput, DelegateUncheckedUpdateManyInput>
    /**
     * Filter which Delegates to update
     */
    where?: DelegateWhereInput
    /**
     * Limit how many Delegates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delegate upsert
   */
  export type DelegateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * The filter to search for the Delegate to update in case it exists.
     */
    where: DelegateWhereUniqueInput
    /**
     * In case the Delegate found by the `where` argument doesn't exist, create a new Delegate with this data.
     */
    create: XOR<DelegateCreateInput, DelegateUncheckedCreateInput>
    /**
     * In case the Delegate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DelegateUpdateInput, DelegateUncheckedUpdateInput>
  }

  /**
   * Delegate delete
   */
  export type DelegateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
    /**
     * Filter which Delegate to delete.
     */
    where: DelegateWhereUniqueInput
  }

  /**
   * Delegate deleteMany
   */
  export type DelegateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delegates to delete
     */
    where?: DelegateWhereInput
    /**
     * Limit how many Delegates to delete.
     */
    limit?: number
  }

  /**
   * Delegate without action
   */
  export type DelegateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegate
     */
    select?: DelegateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegate
     */
    omit?: DelegateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegateInclude<ExtArgs> | null
  }


  /**
   * Model Cook
   */

  export type AggregateCook = {
    _count: CookCountAggregateOutputType | null
    _avg: CookAvgAggregateOutputType | null
    _sum: CookSumAggregateOutputType | null
    _min: CookMinAggregateOutputType | null
    _max: CookMaxAggregateOutputType | null
  }

  export type CookAvgAggregateOutputType = {
    age: number | null
  }

  export type CookSumAggregateOutputType = {
    age: number | null
  }

  export type CookMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    nickname: string | null
    age: number | null
    gender: $Enums.Gender | null
    registrationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CookMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    nickname: string | null
    age: number | null
    gender: $Enums.Gender | null
    registrationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CookCountAggregateOutputType = {
    id: number
    fullName: number
    nickname: number
    age: number
    gender: number
    registrationId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CookAvgAggregateInputType = {
    age?: true
  }

  export type CookSumAggregateInputType = {
    age?: true
  }

  export type CookMinAggregateInputType = {
    id?: true
    fullName?: true
    nickname?: true
    age?: true
    gender?: true
    registrationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CookMaxAggregateInputType = {
    id?: true
    fullName?: true
    nickname?: true
    age?: true
    gender?: true
    registrationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CookCountAggregateInputType = {
    id?: true
    fullName?: true
    nickname?: true
    age?: true
    gender?: true
    registrationId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cook to aggregate.
     */
    where?: CookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cooks to fetch.
     */
    orderBy?: CookOrderByWithRelationInput | CookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cooks
    **/
    _count?: true | CookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CookMaxAggregateInputType
  }

  export type GetCookAggregateType<T extends CookAggregateArgs> = {
        [P in keyof T & keyof AggregateCook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCook[P]>
      : GetScalarType<T[P], AggregateCook[P]>
  }




  export type CookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CookWhereInput
    orderBy?: CookOrderByWithAggregationInput | CookOrderByWithAggregationInput[]
    by: CookScalarFieldEnum[] | CookScalarFieldEnum
    having?: CookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CookCountAggregateInputType | true
    _avg?: CookAvgAggregateInputType
    _sum?: CookSumAggregateInputType
    _min?: CookMinAggregateInputType
    _max?: CookMaxAggregateInputType
  }

  export type CookGroupByOutputType = {
    id: string
    fullName: string
    nickname: string | null
    age: number
    gender: $Enums.Gender
    registrationId: string
    createdAt: Date
    updatedAt: Date
    _count: CookCountAggregateOutputType | null
    _avg: CookAvgAggregateOutputType | null
    _sum: CookSumAggregateOutputType | null
    _min: CookMinAggregateOutputType | null
    _max: CookMaxAggregateOutputType | null
  }

  type GetCookGroupByPayload<T extends CookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CookGroupByOutputType[P]>
            : GetScalarType<T[P], CookGroupByOutputType[P]>
        }
      >
    >


  export type CookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cook"]>

  export type CookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cook"]>

  export type CookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cook"]>

  export type CookSelectScalar = {
    id?: boolean
    fullName?: boolean
    nickname?: boolean
    age?: boolean
    gender?: boolean
    registrationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "nickname" | "age" | "gender" | "registrationId" | "createdAt" | "updatedAt", ExtArgs["result"]["cook"]>
  export type CookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }
  export type CookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }
  export type CookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }

  export type $CookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cook"
    objects: {
      registration: Prisma.$RegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      nickname: string | null
      age: number
      gender: $Enums.Gender
      registrationId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cook"]>
    composites: {}
  }

  type CookGetPayload<S extends boolean | null | undefined | CookDefaultArgs> = $Result.GetResult<Prisma.$CookPayload, S>

  type CookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CookCountAggregateInputType | true
    }

  export interface CookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cook'], meta: { name: 'Cook' } }
    /**
     * Find zero or one Cook that matches the filter.
     * @param {CookFindUniqueArgs} args - Arguments to find a Cook
     * @example
     * // Get one Cook
     * const cook = await prisma.cook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CookFindUniqueArgs>(args: SelectSubset<T, CookFindUniqueArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CookFindUniqueOrThrowArgs} args - Arguments to find a Cook
     * @example
     * // Get one Cook
     * const cook = await prisma.cook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CookFindUniqueOrThrowArgs>(args: SelectSubset<T, CookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookFindFirstArgs} args - Arguments to find a Cook
     * @example
     * // Get one Cook
     * const cook = await prisma.cook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CookFindFirstArgs>(args?: SelectSubset<T, CookFindFirstArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookFindFirstOrThrowArgs} args - Arguments to find a Cook
     * @example
     * // Get one Cook
     * const cook = await prisma.cook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CookFindFirstOrThrowArgs>(args?: SelectSubset<T, CookFindFirstOrThrowArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cooks
     * const cooks = await prisma.cook.findMany()
     * 
     * // Get first 10 Cooks
     * const cooks = await prisma.cook.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cookWithIdOnly = await prisma.cook.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CookFindManyArgs>(args?: SelectSubset<T, CookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cook.
     * @param {CookCreateArgs} args - Arguments to create a Cook.
     * @example
     * // Create one Cook
     * const Cook = await prisma.cook.create({
     *   data: {
     *     // ... data to create a Cook
     *   }
     * })
     * 
     */
    create<T extends CookCreateArgs>(args: SelectSubset<T, CookCreateArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cooks.
     * @param {CookCreateManyArgs} args - Arguments to create many Cooks.
     * @example
     * // Create many Cooks
     * const cook = await prisma.cook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CookCreateManyArgs>(args?: SelectSubset<T, CookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cooks and returns the data saved in the database.
     * @param {CookCreateManyAndReturnArgs} args - Arguments to create many Cooks.
     * @example
     * // Create many Cooks
     * const cook = await prisma.cook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cooks and only return the `id`
     * const cookWithIdOnly = await prisma.cook.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CookCreateManyAndReturnArgs>(args?: SelectSubset<T, CookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cook.
     * @param {CookDeleteArgs} args - Arguments to delete one Cook.
     * @example
     * // Delete one Cook
     * const Cook = await prisma.cook.delete({
     *   where: {
     *     // ... filter to delete one Cook
     *   }
     * })
     * 
     */
    delete<T extends CookDeleteArgs>(args: SelectSubset<T, CookDeleteArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cook.
     * @param {CookUpdateArgs} args - Arguments to update one Cook.
     * @example
     * // Update one Cook
     * const cook = await prisma.cook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CookUpdateArgs>(args: SelectSubset<T, CookUpdateArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cooks.
     * @param {CookDeleteManyArgs} args - Arguments to filter Cooks to delete.
     * @example
     * // Delete a few Cooks
     * const { count } = await prisma.cook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CookDeleteManyArgs>(args?: SelectSubset<T, CookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cooks
     * const cook = await prisma.cook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CookUpdateManyArgs>(args: SelectSubset<T, CookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cooks and returns the data updated in the database.
     * @param {CookUpdateManyAndReturnArgs} args - Arguments to update many Cooks.
     * @example
     * // Update many Cooks
     * const cook = await prisma.cook.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cooks and only return the `id`
     * const cookWithIdOnly = await prisma.cook.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CookUpdateManyAndReturnArgs>(args: SelectSubset<T, CookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cook.
     * @param {CookUpsertArgs} args - Arguments to update or create a Cook.
     * @example
     * // Update or create a Cook
     * const cook = await prisma.cook.upsert({
     *   create: {
     *     // ... data to create a Cook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cook we want to update
     *   }
     * })
     */
    upsert<T extends CookUpsertArgs>(args: SelectSubset<T, CookUpsertArgs<ExtArgs>>): Prisma__CookClient<$Result.GetResult<Prisma.$CookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookCountArgs} args - Arguments to filter Cooks to count.
     * @example
     * // Count the number of Cooks
     * const count = await prisma.cook.count({
     *   where: {
     *     // ... the filter for the Cooks we want to count
     *   }
     * })
    **/
    count<T extends CookCountArgs>(
      args?: Subset<T, CookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CookAggregateArgs>(args: Subset<T, CookAggregateArgs>): Prisma.PrismaPromise<GetCookAggregateType<T>>

    /**
     * Group by Cook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CookGroupByArgs['orderBy'] }
        : { orderBy?: CookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cook model
   */
  readonly fields: CookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registration<T extends RegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegistrationDefaultArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cook model
   */
  interface CookFieldRefs {
    readonly id: FieldRef<"Cook", 'String'>
    readonly fullName: FieldRef<"Cook", 'String'>
    readonly nickname: FieldRef<"Cook", 'String'>
    readonly age: FieldRef<"Cook", 'Int'>
    readonly gender: FieldRef<"Cook", 'Gender'>
    readonly registrationId: FieldRef<"Cook", 'String'>
    readonly createdAt: FieldRef<"Cook", 'DateTime'>
    readonly updatedAt: FieldRef<"Cook", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cook findUnique
   */
  export type CookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * Filter, which Cook to fetch.
     */
    where: CookWhereUniqueInput
  }

  /**
   * Cook findUniqueOrThrow
   */
  export type CookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * Filter, which Cook to fetch.
     */
    where: CookWhereUniqueInput
  }

  /**
   * Cook findFirst
   */
  export type CookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * Filter, which Cook to fetch.
     */
    where?: CookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cooks to fetch.
     */
    orderBy?: CookOrderByWithRelationInput | CookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cooks.
     */
    cursor?: CookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cooks.
     */
    distinct?: CookScalarFieldEnum | CookScalarFieldEnum[]
  }

  /**
   * Cook findFirstOrThrow
   */
  export type CookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * Filter, which Cook to fetch.
     */
    where?: CookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cooks to fetch.
     */
    orderBy?: CookOrderByWithRelationInput | CookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cooks.
     */
    cursor?: CookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cooks.
     */
    distinct?: CookScalarFieldEnum | CookScalarFieldEnum[]
  }

  /**
   * Cook findMany
   */
  export type CookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * Filter, which Cooks to fetch.
     */
    where?: CookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cooks to fetch.
     */
    orderBy?: CookOrderByWithRelationInput | CookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cooks.
     */
    cursor?: CookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cooks.
     */
    skip?: number
    distinct?: CookScalarFieldEnum | CookScalarFieldEnum[]
  }

  /**
   * Cook create
   */
  export type CookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * The data needed to create a Cook.
     */
    data: XOR<CookCreateInput, CookUncheckedCreateInput>
  }

  /**
   * Cook createMany
   */
  export type CookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cooks.
     */
    data: CookCreateManyInput | CookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cook createManyAndReturn
   */
  export type CookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * The data used to create many Cooks.
     */
    data: CookCreateManyInput | CookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cook update
   */
  export type CookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * The data needed to update a Cook.
     */
    data: XOR<CookUpdateInput, CookUncheckedUpdateInput>
    /**
     * Choose, which Cook to update.
     */
    where: CookWhereUniqueInput
  }

  /**
   * Cook updateMany
   */
  export type CookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cooks.
     */
    data: XOR<CookUpdateManyMutationInput, CookUncheckedUpdateManyInput>
    /**
     * Filter which Cooks to update
     */
    where?: CookWhereInput
    /**
     * Limit how many Cooks to update.
     */
    limit?: number
  }

  /**
   * Cook updateManyAndReturn
   */
  export type CookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * The data used to update Cooks.
     */
    data: XOR<CookUpdateManyMutationInput, CookUncheckedUpdateManyInput>
    /**
     * Filter which Cooks to update
     */
    where?: CookWhereInput
    /**
     * Limit how many Cooks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cook upsert
   */
  export type CookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * The filter to search for the Cook to update in case it exists.
     */
    where: CookWhereUniqueInput
    /**
     * In case the Cook found by the `where` argument doesn't exist, create a new Cook with this data.
     */
    create: XOR<CookCreateInput, CookUncheckedCreateInput>
    /**
     * In case the Cook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CookUpdateInput, CookUncheckedUpdateInput>
  }

  /**
   * Cook delete
   */
  export type CookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
    /**
     * Filter which Cook to delete.
     */
    where: CookWhereUniqueInput
  }

  /**
   * Cook deleteMany
   */
  export type CookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cooks to delete
     */
    where?: CookWhereInput
    /**
     * Limit how many Cooks to delete.
     */
    limit?: number
  }

  /**
   * Cook without action
   */
  export type CookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cook
     */
    select?: CookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cook
     */
    omit?: CookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CookInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    emailVerified: 'emailVerified',
    image: 'image',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const DivisionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DivisionScalarFieldEnum = (typeof DivisionScalarFieldEnum)[keyof typeof DivisionScalarFieldEnum]


  export const ChurchScalarFieldEnum: {
    id: 'id',
    name: 'name',
    divisionId: 'divisionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChurchScalarFieldEnum = (typeof ChurchScalarFieldEnum)[keyof typeof ChurchScalarFieldEnum]


  export const CoordinatorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    divisionId: 'divisionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoordinatorScalarFieldEnum = (typeof CoordinatorScalarFieldEnum)[keyof typeof CoordinatorScalarFieldEnum]


  export const PastorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PastorScalarFieldEnum = (typeof PastorScalarFieldEnum)[keyof typeof PastorScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    location: 'location',
    banner: 'banner',
    startDate: 'startDate',
    endDate: 'endDate',
    registrationDeadline: 'registrationDeadline',
    preRegistrationFee: 'preRegistrationFee',
    preRegistrationStart: 'preRegistrationStart',
    preRegistrationEnd: 'preRegistrationEnd',
    onsiteRegistrationFee: 'onsiteRegistrationFee',
    cookRegistrationFee: 'cookRegistrationFee',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const RegistrationScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    churchId: 'churchId',
    presidentId: 'presidentId',
    status: 'status',
    remarks: 'remarks',
    receiptImage: 'receiptImage',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    totalFee: 'totalFee',
    delegateFeePerPerson: 'delegateFeePerPerson',
    cookFeePerPerson: 'cookFeePerPerson',
    isPreRegistration: 'isPreRegistration'
  };

  export type RegistrationScalarFieldEnum = (typeof RegistrationScalarFieldEnum)[keyof typeof RegistrationScalarFieldEnum]


  export const DelegateScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    nickname: 'nickname',
    age: 'age',
    gender: 'gender',
    registrationId: 'registrationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DelegateScalarFieldEnum = (typeof DelegateScalarFieldEnum)[keyof typeof DelegateScalarFieldEnum]


  export const CookScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    nickname: 'nickname',
    age: 'age',
    gender: 'gender',
    registrationId: 'registrationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CookScalarFieldEnum = (typeof CookScalarFieldEnum)[keyof typeof CookScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'EventStatus[]'
   */
  export type ListEnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus[]'>
    


  /**
   * Reference to a field of type 'RegistrationStatus'
   */
  export type EnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus'>
    


  /**
   * Reference to a field of type 'RegistrationStatus[]'
   */
  export type ListEnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    churchId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    church?: XOR<ChurchNullableScalarRelationFilter, ChurchWhereInput> | null
    registrations?: RegistrationListRelationFilter
    reviewedRegistrations?: RegistrationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    churchId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    church?: ChurchOrderByWithRelationInput
    registrations?: RegistrationOrderByRelationAggregateInput
    reviewedRegistrations?: RegistrationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    churchId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    church?: XOR<ChurchNullableScalarRelationFilter, ChurchWhereInput> | null
    registrations?: RegistrationListRelationFilter
    reviewedRegistrations?: RegistrationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    churchId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    churchId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type DivisionWhereInput = {
    AND?: DivisionWhereInput | DivisionWhereInput[]
    OR?: DivisionWhereInput[]
    NOT?: DivisionWhereInput | DivisionWhereInput[]
    id?: StringFilter<"Division"> | string
    name?: StringFilter<"Division"> | string
    createdAt?: DateTimeFilter<"Division"> | Date | string
    updatedAt?: DateTimeFilter<"Division"> | Date | string
    churches?: ChurchListRelationFilter
    coordinator?: XOR<CoordinatorNullableScalarRelationFilter, CoordinatorWhereInput> | null
  }

  export type DivisionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    churches?: ChurchOrderByRelationAggregateInput
    coordinator?: CoordinatorOrderByWithRelationInput
  }

  export type DivisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DivisionWhereInput | DivisionWhereInput[]
    OR?: DivisionWhereInput[]
    NOT?: DivisionWhereInput | DivisionWhereInput[]
    createdAt?: DateTimeFilter<"Division"> | Date | string
    updatedAt?: DateTimeFilter<"Division"> | Date | string
    churches?: ChurchListRelationFilter
    coordinator?: XOR<CoordinatorNullableScalarRelationFilter, CoordinatorWhereInput> | null
  }, "id" | "name">

  export type DivisionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DivisionCountOrderByAggregateInput
    _max?: DivisionMaxOrderByAggregateInput
    _min?: DivisionMinOrderByAggregateInput
  }

  export type DivisionScalarWhereWithAggregatesInput = {
    AND?: DivisionScalarWhereWithAggregatesInput | DivisionScalarWhereWithAggregatesInput[]
    OR?: DivisionScalarWhereWithAggregatesInput[]
    NOT?: DivisionScalarWhereWithAggregatesInput | DivisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Division"> | string
    name?: StringWithAggregatesFilter<"Division"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Division"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Division"> | Date | string
  }

  export type ChurchWhereInput = {
    AND?: ChurchWhereInput | ChurchWhereInput[]
    OR?: ChurchWhereInput[]
    NOT?: ChurchWhereInput | ChurchWhereInput[]
    id?: StringFilter<"Church"> | string
    name?: StringFilter<"Church"> | string
    divisionId?: StringFilter<"Church"> | string
    createdAt?: DateTimeFilter<"Church"> | Date | string
    updatedAt?: DateTimeFilter<"Church"> | Date | string
    division?: XOR<DivisionScalarRelationFilter, DivisionWhereInput>
    pastor?: XOR<PastorNullableScalarRelationFilter, PastorWhereInput> | null
    presidents?: UserListRelationFilter
    registrations?: RegistrationListRelationFilter
  }

  export type ChurchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    division?: DivisionOrderByWithRelationInput
    pastor?: PastorOrderByWithRelationInput
    presidents?: UserOrderByRelationAggregateInput
    registrations?: RegistrationOrderByRelationAggregateInput
  }

  export type ChurchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ChurchWhereInput | ChurchWhereInput[]
    OR?: ChurchWhereInput[]
    NOT?: ChurchWhereInput | ChurchWhereInput[]
    divisionId?: StringFilter<"Church"> | string
    createdAt?: DateTimeFilter<"Church"> | Date | string
    updatedAt?: DateTimeFilter<"Church"> | Date | string
    division?: XOR<DivisionScalarRelationFilter, DivisionWhereInput>
    pastor?: XOR<PastorNullableScalarRelationFilter, PastorWhereInput> | null
    presidents?: UserListRelationFilter
    registrations?: RegistrationListRelationFilter
  }, "id" | "name">

  export type ChurchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChurchCountOrderByAggregateInput
    _max?: ChurchMaxOrderByAggregateInput
    _min?: ChurchMinOrderByAggregateInput
  }

  export type ChurchScalarWhereWithAggregatesInput = {
    AND?: ChurchScalarWhereWithAggregatesInput | ChurchScalarWhereWithAggregatesInput[]
    OR?: ChurchScalarWhereWithAggregatesInput[]
    NOT?: ChurchScalarWhereWithAggregatesInput | ChurchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Church"> | string
    name?: StringWithAggregatesFilter<"Church"> | string
    divisionId?: StringWithAggregatesFilter<"Church"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Church"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Church"> | Date | string
  }

  export type CoordinatorWhereInput = {
    AND?: CoordinatorWhereInput | CoordinatorWhereInput[]
    OR?: CoordinatorWhereInput[]
    NOT?: CoordinatorWhereInput | CoordinatorWhereInput[]
    id?: StringFilter<"Coordinator"> | string
    name?: StringFilter<"Coordinator"> | string
    divisionId?: StringFilter<"Coordinator"> | string
    createdAt?: DateTimeFilter<"Coordinator"> | Date | string
    updatedAt?: DateTimeFilter<"Coordinator"> | Date | string
    division?: XOR<DivisionScalarRelationFilter, DivisionWhereInput>
  }

  export type CoordinatorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    division?: DivisionOrderByWithRelationInput
  }

  export type CoordinatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    divisionId?: string
    AND?: CoordinatorWhereInput | CoordinatorWhereInput[]
    OR?: CoordinatorWhereInput[]
    NOT?: CoordinatorWhereInput | CoordinatorWhereInput[]
    name?: StringFilter<"Coordinator"> | string
    createdAt?: DateTimeFilter<"Coordinator"> | Date | string
    updatedAt?: DateTimeFilter<"Coordinator"> | Date | string
    division?: XOR<DivisionScalarRelationFilter, DivisionWhereInput>
  }, "id" | "divisionId">

  export type CoordinatorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoordinatorCountOrderByAggregateInput
    _max?: CoordinatorMaxOrderByAggregateInput
    _min?: CoordinatorMinOrderByAggregateInput
  }

  export type CoordinatorScalarWhereWithAggregatesInput = {
    AND?: CoordinatorScalarWhereWithAggregatesInput | CoordinatorScalarWhereWithAggregatesInput[]
    OR?: CoordinatorScalarWhereWithAggregatesInput[]
    NOT?: CoordinatorScalarWhereWithAggregatesInput | CoordinatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Coordinator"> | string
    name?: StringWithAggregatesFilter<"Coordinator"> | string
    divisionId?: StringWithAggregatesFilter<"Coordinator"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Coordinator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Coordinator"> | Date | string
  }

  export type PastorWhereInput = {
    AND?: PastorWhereInput | PastorWhereInput[]
    OR?: PastorWhereInput[]
    NOT?: PastorWhereInput | PastorWhereInput[]
    id?: StringFilter<"Pastor"> | string
    name?: StringFilter<"Pastor"> | string
    churchId?: StringFilter<"Pastor"> | string
    createdAt?: DateTimeFilter<"Pastor"> | Date | string
    updatedAt?: DateTimeFilter<"Pastor"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }

  export type PastorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    church?: ChurchOrderByWithRelationInput
  }

  export type PastorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    churchId?: string
    AND?: PastorWhereInput | PastorWhereInput[]
    OR?: PastorWhereInput[]
    NOT?: PastorWhereInput | PastorWhereInput[]
    name?: StringFilter<"Pastor"> | string
    createdAt?: DateTimeFilter<"Pastor"> | Date | string
    updatedAt?: DateTimeFilter<"Pastor"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }, "id" | "churchId">

  export type PastorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PastorCountOrderByAggregateInput
    _max?: PastorMaxOrderByAggregateInput
    _min?: PastorMinOrderByAggregateInput
  }

  export type PastorScalarWhereWithAggregatesInput = {
    AND?: PastorScalarWhereWithAggregatesInput | PastorScalarWhereWithAggregatesInput[]
    OR?: PastorScalarWhereWithAggregatesInput[]
    NOT?: PastorScalarWhereWithAggregatesInput | PastorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pastor"> | string
    name?: StringWithAggregatesFilter<"Pastor"> | string
    churchId?: StringWithAggregatesFilter<"Pastor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pastor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pastor"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    name?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    location?: StringFilter<"Event"> | string
    banner?: StringNullableFilter<"Event"> | string | null
    startDate?: DateTimeFilter<"Event"> | Date | string
    endDate?: DateTimeFilter<"Event"> | Date | string
    registrationDeadline?: DateTimeFilter<"Event"> | Date | string
    preRegistrationFee?: IntFilter<"Event"> | number
    preRegistrationStart?: DateTimeFilter<"Event"> | Date | string
    preRegistrationEnd?: DateTimeFilter<"Event"> | Date | string
    onsiteRegistrationFee?: IntFilter<"Event"> | number
    cookRegistrationFee?: IntFilter<"Event"> | number
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    registrations?: RegistrationListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrder
    banner?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    registrationDeadline?: SortOrder
    preRegistrationFee?: SortOrder
    preRegistrationStart?: SortOrder
    preRegistrationEnd?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    registrations?: RegistrationOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    name?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    location?: StringFilter<"Event"> | string
    banner?: StringNullableFilter<"Event"> | string | null
    startDate?: DateTimeFilter<"Event"> | Date | string
    endDate?: DateTimeFilter<"Event"> | Date | string
    registrationDeadline?: DateTimeFilter<"Event"> | Date | string
    preRegistrationFee?: IntFilter<"Event"> | number
    preRegistrationStart?: DateTimeFilter<"Event"> | Date | string
    preRegistrationEnd?: DateTimeFilter<"Event"> | Date | string
    onsiteRegistrationFee?: IntFilter<"Event"> | number
    cookRegistrationFee?: IntFilter<"Event"> | number
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    registrations?: RegistrationListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrder
    banner?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    registrationDeadline?: SortOrder
    preRegistrationFee?: SortOrder
    preRegistrationStart?: SortOrder
    preRegistrationEnd?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    name?: StringWithAggregatesFilter<"Event"> | string
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    location?: StringWithAggregatesFilter<"Event"> | string
    banner?: StringNullableWithAggregatesFilter<"Event"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    registrationDeadline?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    preRegistrationFee?: IntWithAggregatesFilter<"Event"> | number
    preRegistrationStart?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    preRegistrationEnd?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    onsiteRegistrationFee?: IntWithAggregatesFilter<"Event"> | number
    cookRegistrationFee?: IntWithAggregatesFilter<"Event"> | number
    status?: EnumEventStatusWithAggregatesFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type RegistrationWhereInput = {
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    id?: StringFilter<"Registration"> | string
    eventId?: StringFilter<"Registration"> | string
    churchId?: StringFilter<"Registration"> | string
    presidentId?: StringFilter<"Registration"> | string
    status?: EnumRegistrationStatusFilter<"Registration"> | $Enums.RegistrationStatus
    remarks?: StringNullableFilter<"Registration"> | string | null
    receiptImage?: StringNullableFilter<"Registration"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Registration"> | Date | string | null
    reviewedBy?: StringNullableFilter<"Registration"> | string | null
    createdAt?: DateTimeFilter<"Registration"> | Date | string
    updatedAt?: DateTimeFilter<"Registration"> | Date | string
    totalFee?: IntFilter<"Registration"> | number
    delegateFeePerPerson?: IntFilter<"Registration"> | number
    cookFeePerPerson?: IntFilter<"Registration"> | number
    isPreRegistration?: BoolFilter<"Registration"> | boolean
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
    president?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    delegates?: DelegateListRelationFilter
    cooks?: CookListRelationFilter
  }

  export type RegistrationOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    churchId?: SortOrder
    presidentId?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    receiptImage?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
    isPreRegistration?: SortOrder
    event?: EventOrderByWithRelationInput
    church?: ChurchOrderByWithRelationInput
    president?: UserOrderByWithRelationInput
    reviewer?: UserOrderByWithRelationInput
    delegates?: DelegateOrderByRelationAggregateInput
    cooks?: CookOrderByRelationAggregateInput
  }

  export type RegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId_churchId?: RegistrationEventIdChurchIdCompoundUniqueInput
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    eventId?: StringFilter<"Registration"> | string
    churchId?: StringFilter<"Registration"> | string
    presidentId?: StringFilter<"Registration"> | string
    status?: EnumRegistrationStatusFilter<"Registration"> | $Enums.RegistrationStatus
    remarks?: StringNullableFilter<"Registration"> | string | null
    receiptImage?: StringNullableFilter<"Registration"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Registration"> | Date | string | null
    reviewedBy?: StringNullableFilter<"Registration"> | string | null
    createdAt?: DateTimeFilter<"Registration"> | Date | string
    updatedAt?: DateTimeFilter<"Registration"> | Date | string
    totalFee?: IntFilter<"Registration"> | number
    delegateFeePerPerson?: IntFilter<"Registration"> | number
    cookFeePerPerson?: IntFilter<"Registration"> | number
    isPreRegistration?: BoolFilter<"Registration"> | boolean
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
    president?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    delegates?: DelegateListRelationFilter
    cooks?: CookListRelationFilter
  }, "id" | "eventId_churchId">

  export type RegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    churchId?: SortOrder
    presidentId?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    receiptImage?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
    isPreRegistration?: SortOrder
    _count?: RegistrationCountOrderByAggregateInput
    _avg?: RegistrationAvgOrderByAggregateInput
    _max?: RegistrationMaxOrderByAggregateInput
    _min?: RegistrationMinOrderByAggregateInput
    _sum?: RegistrationSumOrderByAggregateInput
  }

  export type RegistrationScalarWhereWithAggregatesInput = {
    AND?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    OR?: RegistrationScalarWhereWithAggregatesInput[]
    NOT?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Registration"> | string
    eventId?: StringWithAggregatesFilter<"Registration"> | string
    churchId?: StringWithAggregatesFilter<"Registration"> | string
    presidentId?: StringWithAggregatesFilter<"Registration"> | string
    status?: EnumRegistrationStatusWithAggregatesFilter<"Registration"> | $Enums.RegistrationStatus
    remarks?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    receiptImage?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Registration"> | Date | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
    totalFee?: IntWithAggregatesFilter<"Registration"> | number
    delegateFeePerPerson?: IntWithAggregatesFilter<"Registration"> | number
    cookFeePerPerson?: IntWithAggregatesFilter<"Registration"> | number
    isPreRegistration?: BoolWithAggregatesFilter<"Registration"> | boolean
  }

  export type DelegateWhereInput = {
    AND?: DelegateWhereInput | DelegateWhereInput[]
    OR?: DelegateWhereInput[]
    NOT?: DelegateWhereInput | DelegateWhereInput[]
    id?: StringFilter<"Delegate"> | string
    fullName?: StringFilter<"Delegate"> | string
    nickname?: StringNullableFilter<"Delegate"> | string | null
    age?: IntFilter<"Delegate"> | number
    gender?: EnumGenderFilter<"Delegate"> | $Enums.Gender
    registrationId?: StringFilter<"Delegate"> | string
    createdAt?: DateTimeFilter<"Delegate"> | Date | string
    updatedAt?: DateTimeFilter<"Delegate"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }

  export type DelegateOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrderInput | SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    registration?: RegistrationOrderByWithRelationInput
  }

  export type DelegateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DelegateWhereInput | DelegateWhereInput[]
    OR?: DelegateWhereInput[]
    NOT?: DelegateWhereInput | DelegateWhereInput[]
    fullName?: StringFilter<"Delegate"> | string
    nickname?: StringNullableFilter<"Delegate"> | string | null
    age?: IntFilter<"Delegate"> | number
    gender?: EnumGenderFilter<"Delegate"> | $Enums.Gender
    registrationId?: StringFilter<"Delegate"> | string
    createdAt?: DateTimeFilter<"Delegate"> | Date | string
    updatedAt?: DateTimeFilter<"Delegate"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }, "id">

  export type DelegateOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrderInput | SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DelegateCountOrderByAggregateInput
    _avg?: DelegateAvgOrderByAggregateInput
    _max?: DelegateMaxOrderByAggregateInput
    _min?: DelegateMinOrderByAggregateInput
    _sum?: DelegateSumOrderByAggregateInput
  }

  export type DelegateScalarWhereWithAggregatesInput = {
    AND?: DelegateScalarWhereWithAggregatesInput | DelegateScalarWhereWithAggregatesInput[]
    OR?: DelegateScalarWhereWithAggregatesInput[]
    NOT?: DelegateScalarWhereWithAggregatesInput | DelegateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Delegate"> | string
    fullName?: StringWithAggregatesFilter<"Delegate"> | string
    nickname?: StringNullableWithAggregatesFilter<"Delegate"> | string | null
    age?: IntWithAggregatesFilter<"Delegate"> | number
    gender?: EnumGenderWithAggregatesFilter<"Delegate"> | $Enums.Gender
    registrationId?: StringWithAggregatesFilter<"Delegate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Delegate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Delegate"> | Date | string
  }

  export type CookWhereInput = {
    AND?: CookWhereInput | CookWhereInput[]
    OR?: CookWhereInput[]
    NOT?: CookWhereInput | CookWhereInput[]
    id?: StringFilter<"Cook"> | string
    fullName?: StringFilter<"Cook"> | string
    nickname?: StringNullableFilter<"Cook"> | string | null
    age?: IntFilter<"Cook"> | number
    gender?: EnumGenderFilter<"Cook"> | $Enums.Gender
    registrationId?: StringFilter<"Cook"> | string
    createdAt?: DateTimeFilter<"Cook"> | Date | string
    updatedAt?: DateTimeFilter<"Cook"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }

  export type CookOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrderInput | SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    registration?: RegistrationOrderByWithRelationInput
  }

  export type CookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CookWhereInput | CookWhereInput[]
    OR?: CookWhereInput[]
    NOT?: CookWhereInput | CookWhereInput[]
    fullName?: StringFilter<"Cook"> | string
    nickname?: StringNullableFilter<"Cook"> | string | null
    age?: IntFilter<"Cook"> | number
    gender?: EnumGenderFilter<"Cook"> | $Enums.Gender
    registrationId?: StringFilter<"Cook"> | string
    createdAt?: DateTimeFilter<"Cook"> | Date | string
    updatedAt?: DateTimeFilter<"Cook"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }, "id">

  export type CookOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrderInput | SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CookCountOrderByAggregateInput
    _avg?: CookAvgOrderByAggregateInput
    _max?: CookMaxOrderByAggregateInput
    _min?: CookMinOrderByAggregateInput
    _sum?: CookSumOrderByAggregateInput
  }

  export type CookScalarWhereWithAggregatesInput = {
    AND?: CookScalarWhereWithAggregatesInput | CookScalarWhereWithAggregatesInput[]
    OR?: CookScalarWhereWithAggregatesInput[]
    NOT?: CookScalarWhereWithAggregatesInput | CookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cook"> | string
    fullName?: StringWithAggregatesFilter<"Cook"> | string
    nickname?: StringNullableWithAggregatesFilter<"Cook"> | string | null
    age?: IntWithAggregatesFilter<"Cook"> | number
    gender?: EnumGenderWithAggregatesFilter<"Cook"> | $Enums.Gender
    registrationId?: StringWithAggregatesFilter<"Cook"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Cook"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cook"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    church?: ChurchCreateNestedOneWithoutPresidentsInput
    registrations?: RegistrationCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    church?: ChurchUpdateOneWithoutPresidentsNestedInput
    registrations?: RegistrationUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DivisionCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    churches?: ChurchCreateNestedManyWithoutDivisionInput
    coordinator?: CoordinatorCreateNestedOneWithoutDivisionInput
  }

  export type DivisionUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    churches?: ChurchUncheckedCreateNestedManyWithoutDivisionInput
    coordinator?: CoordinatorUncheckedCreateNestedOneWithoutDivisionInput
  }

  export type DivisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    churches?: ChurchUpdateManyWithoutDivisionNestedInput
    coordinator?: CoordinatorUpdateOneWithoutDivisionNestedInput
  }

  export type DivisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    churches?: ChurchUncheckedUpdateManyWithoutDivisionNestedInput
    coordinator?: CoordinatorUncheckedUpdateOneWithoutDivisionNestedInput
  }

  export type DivisionCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DivisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DivisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    division: DivisionCreateNestedOneWithoutChurchesInput
    pastor?: PastorCreateNestedOneWithoutChurchInput
    presidents?: UserCreateNestedManyWithoutChurchInput
    registrations?: RegistrationCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pastor?: PastorUncheckedCreateNestedOneWithoutChurchInput
    presidents?: UserUncheckedCreateNestedManyWithoutChurchInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    division?: DivisionUpdateOneRequiredWithoutChurchesNestedInput
    pastor?: PastorUpdateOneWithoutChurchNestedInput
    presidents?: UserUpdateManyWithoutChurchNestedInput
    registrations?: RegistrationUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pastor?: PastorUncheckedUpdateOneWithoutChurchNestedInput
    presidents?: UserUncheckedUpdateManyWithoutChurchNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type ChurchCreateManyInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoordinatorCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    division: DivisionCreateNestedOneWithoutCoordinatorInput
  }

  export type CoordinatorUncheckedCreateInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoordinatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    division?: DivisionUpdateOneRequiredWithoutCoordinatorNestedInput
  }

  export type CoordinatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoordinatorCreateManyInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoordinatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoordinatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastorCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    church: ChurchCreateNestedOneWithoutPastorInput
  }

  export type PastorUncheckedCreateInput = {
    id?: string
    name: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    church?: ChurchUpdateOneRequiredWithoutPastorNestedInput
  }

  export type PastorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastorCreateManyInput = {
    id?: string
    name: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    name: string
    description?: string | null
    location: string
    banner?: string | null
    startDate: Date | string
    endDate: Date | string
    registrationDeadline: Date | string
    preRegistrationFee: number
    preRegistrationStart: Date | string
    preRegistrationEnd: Date | string
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status?: $Enums.EventStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    registrations?: RegistrationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    location: string
    banner?: string | null
    startDate: Date | string
    endDate: Date | string
    registrationDeadline: Date | string
    preRegistrationFee: number
    preRegistrationStart: Date | string
    preRegistrationEnd: Date | string
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status?: $Enums.EventStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    registrations?: RegistrationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    banner?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationFee?: IntFieldUpdateOperationsInput | number
    preRegistrationStart?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    onsiteRegistrationFee?: IntFieldUpdateOperationsInput | number
    cookRegistrationFee?: IntFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: RegistrationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    banner?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationFee?: IntFieldUpdateOperationsInput | number
    preRegistrationStart?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    onsiteRegistrationFee?: IntFieldUpdateOperationsInput | number
    cookRegistrationFee?: IntFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: RegistrationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    location: string
    banner?: string | null
    startDate: Date | string
    endDate: Date | string
    registrationDeadline: Date | string
    preRegistrationFee: number
    preRegistrationStart: Date | string
    preRegistrationEnd: Date | string
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status?: $Enums.EventStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    banner?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationFee?: IntFieldUpdateOperationsInput | number
    preRegistrationStart?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    onsiteRegistrationFee?: IntFieldUpdateOperationsInput | number
    cookRegistrationFee?: IntFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    banner?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationFee?: IntFieldUpdateOperationsInput | number
    preRegistrationStart?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    onsiteRegistrationFee?: IntFieldUpdateOperationsInput | number
    cookRegistrationFee?: IntFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationCreateInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    event: EventCreateNestedOneWithoutRegistrationsInput
    church: ChurchCreateNestedOneWithoutRegistrationsInput
    president: UserCreateNestedOneWithoutRegistrationsInput
    reviewer?: UserCreateNestedOneWithoutReviewedRegistrationsInput
    delegates?: DelegateCreateNestedManyWithoutRegistrationInput
    cooks?: CookCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateInput = {
    id?: string
    eventId: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    delegates?: DelegateUncheckedCreateNestedManyWithoutRegistrationInput
    cooks?: CookUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutRegistrationsNestedInput
    church?: ChurchUpdateOneRequiredWithoutRegistrationsNestedInput
    president?: UserUpdateOneRequiredWithoutRegistrationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewedRegistrationsNestedInput
    delegates?: DelegateUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    delegates?: DelegateUncheckedUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationCreateManyInput = {
    id?: string
    eventId: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
  }

  export type RegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DelegateCreateInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    registration: RegistrationCreateNestedOneWithoutDelegatesInput
  }

  export type DelegateUncheckedCreateInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    registrationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DelegateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registration?: RegistrationUpdateOneRequiredWithoutDelegatesNestedInput
  }

  export type DelegateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    registrationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegateCreateManyInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    registrationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DelegateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    registrationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CookCreateInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    registration: RegistrationCreateNestedOneWithoutCooksInput
  }

  export type CookUncheckedCreateInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    registrationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CookUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registration?: RegistrationUpdateOneRequiredWithoutCooksNestedInput
  }

  export type CookUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    registrationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CookCreateManyInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    registrationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CookUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CookUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    registrationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ChurchNullableScalarRelationFilter = {
    is?: ChurchWhereInput | null
    isNot?: ChurchWhereInput | null
  }

  export type RegistrationListRelationFilter = {
    every?: RegistrationWhereInput
    some?: RegistrationWhereInput
    none?: RegistrationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchListRelationFilter = {
    every?: ChurchWhereInput
    some?: ChurchWhereInput
    none?: ChurchWhereInput
  }

  export type CoordinatorNullableScalarRelationFilter = {
    is?: CoordinatorWhereInput | null
    isNot?: CoordinatorWhereInput | null
  }

  export type ChurchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DivisionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DivisionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DivisionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DivisionScalarRelationFilter = {
    is?: DivisionWhereInput
    isNot?: DivisionWhereInput
  }

  export type PastorNullableScalarRelationFilter = {
    is?: PastorWhereInput | null
    isNot?: PastorWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChurchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoordinatorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoordinatorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoordinatorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    divisionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchScalarRelationFilter = {
    is?: ChurchWhereInput
    isNot?: ChurchWhereInput
  }

  export type PastorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PastorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PastorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    banner?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    registrationDeadline?: SortOrder
    preRegistrationFee?: SortOrder
    preRegistrationStart?: SortOrder
    preRegistrationEnd?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    preRegistrationFee?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    banner?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    registrationDeadline?: SortOrder
    preRegistrationFee?: SortOrder
    preRegistrationStart?: SortOrder
    preRegistrationEnd?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    banner?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    registrationDeadline?: SortOrder
    preRegistrationFee?: SortOrder
    preRegistrationStart?: SortOrder
    preRegistrationEnd?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    preRegistrationFee?: SortOrder
    onsiteRegistrationFee?: SortOrder
    cookRegistrationFee?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type EnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DelegateListRelationFilter = {
    every?: DelegateWhereInput
    some?: DelegateWhereInput
    none?: DelegateWhereInput
  }

  export type CookListRelationFilter = {
    every?: CookWhereInput
    some?: CookWhereInput
    none?: CookWhereInput
  }

  export type DelegateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegistrationEventIdChurchIdCompoundUniqueInput = {
    eventId: string
    churchId: string
  }

  export type RegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    churchId?: SortOrder
    presidentId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    receiptImage?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
    isPreRegistration?: SortOrder
  }

  export type RegistrationAvgOrderByAggregateInput = {
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
  }

  export type RegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    churchId?: SortOrder
    presidentId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    receiptImage?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
    isPreRegistration?: SortOrder
  }

  export type RegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    churchId?: SortOrder
    presidentId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    receiptImage?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
    isPreRegistration?: SortOrder
  }

  export type RegistrationSumOrderByAggregateInput = {
    totalFee?: SortOrder
    delegateFeePerPerson?: SortOrder
    cookFeePerPerson?: SortOrder
  }

  export type EnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type RegistrationScalarRelationFilter = {
    is?: RegistrationWhereInput
    isNot?: RegistrationWhereInput
  }

  export type DelegateCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DelegateAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type DelegateMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DelegateMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DelegateSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type CookCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CookAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type CookMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CookMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    registrationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CookSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ChurchCreateNestedOneWithoutPresidentsInput = {
    create?: XOR<ChurchCreateWithoutPresidentsInput, ChurchUncheckedCreateWithoutPresidentsInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutPresidentsInput
    connect?: ChurchWhereUniqueInput
  }

  export type RegistrationCreateNestedManyWithoutPresidentInput = {
    create?: XOR<RegistrationCreateWithoutPresidentInput, RegistrationUncheckedCreateWithoutPresidentInput> | RegistrationCreateWithoutPresidentInput[] | RegistrationUncheckedCreateWithoutPresidentInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutPresidentInput | RegistrationCreateOrConnectWithoutPresidentInput[]
    createMany?: RegistrationCreateManyPresidentInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type RegistrationCreateNestedManyWithoutReviewerInput = {
    create?: XOR<RegistrationCreateWithoutReviewerInput, RegistrationUncheckedCreateWithoutReviewerInput> | RegistrationCreateWithoutReviewerInput[] | RegistrationUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutReviewerInput | RegistrationCreateOrConnectWithoutReviewerInput[]
    createMany?: RegistrationCreateManyReviewerInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type RegistrationUncheckedCreateNestedManyWithoutPresidentInput = {
    create?: XOR<RegistrationCreateWithoutPresidentInput, RegistrationUncheckedCreateWithoutPresidentInput> | RegistrationCreateWithoutPresidentInput[] | RegistrationUncheckedCreateWithoutPresidentInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutPresidentInput | RegistrationCreateOrConnectWithoutPresidentInput[]
    createMany?: RegistrationCreateManyPresidentInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type RegistrationUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<RegistrationCreateWithoutReviewerInput, RegistrationUncheckedCreateWithoutReviewerInput> | RegistrationCreateWithoutReviewerInput[] | RegistrationUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutReviewerInput | RegistrationCreateOrConnectWithoutReviewerInput[]
    createMany?: RegistrationCreateManyReviewerInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ChurchUpdateOneWithoutPresidentsNestedInput = {
    create?: XOR<ChurchCreateWithoutPresidentsInput, ChurchUncheckedCreateWithoutPresidentsInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutPresidentsInput
    upsert?: ChurchUpsertWithoutPresidentsInput
    disconnect?: ChurchWhereInput | boolean
    delete?: ChurchWhereInput | boolean
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutPresidentsInput, ChurchUpdateWithoutPresidentsInput>, ChurchUncheckedUpdateWithoutPresidentsInput>
  }

  export type RegistrationUpdateManyWithoutPresidentNestedInput = {
    create?: XOR<RegistrationCreateWithoutPresidentInput, RegistrationUncheckedCreateWithoutPresidentInput> | RegistrationCreateWithoutPresidentInput[] | RegistrationUncheckedCreateWithoutPresidentInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutPresidentInput | RegistrationCreateOrConnectWithoutPresidentInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutPresidentInput | RegistrationUpsertWithWhereUniqueWithoutPresidentInput[]
    createMany?: RegistrationCreateManyPresidentInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutPresidentInput | RegistrationUpdateWithWhereUniqueWithoutPresidentInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutPresidentInput | RegistrationUpdateManyWithWhereWithoutPresidentInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type RegistrationUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<RegistrationCreateWithoutReviewerInput, RegistrationUncheckedCreateWithoutReviewerInput> | RegistrationCreateWithoutReviewerInput[] | RegistrationUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutReviewerInput | RegistrationCreateOrConnectWithoutReviewerInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutReviewerInput | RegistrationUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: RegistrationCreateManyReviewerInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutReviewerInput | RegistrationUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutReviewerInput | RegistrationUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type RegistrationUncheckedUpdateManyWithoutPresidentNestedInput = {
    create?: XOR<RegistrationCreateWithoutPresidentInput, RegistrationUncheckedCreateWithoutPresidentInput> | RegistrationCreateWithoutPresidentInput[] | RegistrationUncheckedCreateWithoutPresidentInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutPresidentInput | RegistrationCreateOrConnectWithoutPresidentInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutPresidentInput | RegistrationUpsertWithWhereUniqueWithoutPresidentInput[]
    createMany?: RegistrationCreateManyPresidentInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutPresidentInput | RegistrationUpdateWithWhereUniqueWithoutPresidentInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutPresidentInput | RegistrationUpdateManyWithWhereWithoutPresidentInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type RegistrationUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<RegistrationCreateWithoutReviewerInput, RegistrationUncheckedCreateWithoutReviewerInput> | RegistrationCreateWithoutReviewerInput[] | RegistrationUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutReviewerInput | RegistrationCreateOrConnectWithoutReviewerInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutReviewerInput | RegistrationUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: RegistrationCreateManyReviewerInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutReviewerInput | RegistrationUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutReviewerInput | RegistrationUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type ChurchCreateNestedManyWithoutDivisionInput = {
    create?: XOR<ChurchCreateWithoutDivisionInput, ChurchUncheckedCreateWithoutDivisionInput> | ChurchCreateWithoutDivisionInput[] | ChurchUncheckedCreateWithoutDivisionInput[]
    connectOrCreate?: ChurchCreateOrConnectWithoutDivisionInput | ChurchCreateOrConnectWithoutDivisionInput[]
    createMany?: ChurchCreateManyDivisionInputEnvelope
    connect?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
  }

  export type CoordinatorCreateNestedOneWithoutDivisionInput = {
    create?: XOR<CoordinatorCreateWithoutDivisionInput, CoordinatorUncheckedCreateWithoutDivisionInput>
    connectOrCreate?: CoordinatorCreateOrConnectWithoutDivisionInput
    connect?: CoordinatorWhereUniqueInput
  }

  export type ChurchUncheckedCreateNestedManyWithoutDivisionInput = {
    create?: XOR<ChurchCreateWithoutDivisionInput, ChurchUncheckedCreateWithoutDivisionInput> | ChurchCreateWithoutDivisionInput[] | ChurchUncheckedCreateWithoutDivisionInput[]
    connectOrCreate?: ChurchCreateOrConnectWithoutDivisionInput | ChurchCreateOrConnectWithoutDivisionInput[]
    createMany?: ChurchCreateManyDivisionInputEnvelope
    connect?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
  }

  export type CoordinatorUncheckedCreateNestedOneWithoutDivisionInput = {
    create?: XOR<CoordinatorCreateWithoutDivisionInput, CoordinatorUncheckedCreateWithoutDivisionInput>
    connectOrCreate?: CoordinatorCreateOrConnectWithoutDivisionInput
    connect?: CoordinatorWhereUniqueInput
  }

  export type ChurchUpdateManyWithoutDivisionNestedInput = {
    create?: XOR<ChurchCreateWithoutDivisionInput, ChurchUncheckedCreateWithoutDivisionInput> | ChurchCreateWithoutDivisionInput[] | ChurchUncheckedCreateWithoutDivisionInput[]
    connectOrCreate?: ChurchCreateOrConnectWithoutDivisionInput | ChurchCreateOrConnectWithoutDivisionInput[]
    upsert?: ChurchUpsertWithWhereUniqueWithoutDivisionInput | ChurchUpsertWithWhereUniqueWithoutDivisionInput[]
    createMany?: ChurchCreateManyDivisionInputEnvelope
    set?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    disconnect?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    delete?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    connect?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    update?: ChurchUpdateWithWhereUniqueWithoutDivisionInput | ChurchUpdateWithWhereUniqueWithoutDivisionInput[]
    updateMany?: ChurchUpdateManyWithWhereWithoutDivisionInput | ChurchUpdateManyWithWhereWithoutDivisionInput[]
    deleteMany?: ChurchScalarWhereInput | ChurchScalarWhereInput[]
  }

  export type CoordinatorUpdateOneWithoutDivisionNestedInput = {
    create?: XOR<CoordinatorCreateWithoutDivisionInput, CoordinatorUncheckedCreateWithoutDivisionInput>
    connectOrCreate?: CoordinatorCreateOrConnectWithoutDivisionInput
    upsert?: CoordinatorUpsertWithoutDivisionInput
    disconnect?: CoordinatorWhereInput | boolean
    delete?: CoordinatorWhereInput | boolean
    connect?: CoordinatorWhereUniqueInput
    update?: XOR<XOR<CoordinatorUpdateToOneWithWhereWithoutDivisionInput, CoordinatorUpdateWithoutDivisionInput>, CoordinatorUncheckedUpdateWithoutDivisionInput>
  }

  export type ChurchUncheckedUpdateManyWithoutDivisionNestedInput = {
    create?: XOR<ChurchCreateWithoutDivisionInput, ChurchUncheckedCreateWithoutDivisionInput> | ChurchCreateWithoutDivisionInput[] | ChurchUncheckedCreateWithoutDivisionInput[]
    connectOrCreate?: ChurchCreateOrConnectWithoutDivisionInput | ChurchCreateOrConnectWithoutDivisionInput[]
    upsert?: ChurchUpsertWithWhereUniqueWithoutDivisionInput | ChurchUpsertWithWhereUniqueWithoutDivisionInput[]
    createMany?: ChurchCreateManyDivisionInputEnvelope
    set?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    disconnect?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    delete?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    connect?: ChurchWhereUniqueInput | ChurchWhereUniqueInput[]
    update?: ChurchUpdateWithWhereUniqueWithoutDivisionInput | ChurchUpdateWithWhereUniqueWithoutDivisionInput[]
    updateMany?: ChurchUpdateManyWithWhereWithoutDivisionInput | ChurchUpdateManyWithWhereWithoutDivisionInput[]
    deleteMany?: ChurchScalarWhereInput | ChurchScalarWhereInput[]
  }

  export type CoordinatorUncheckedUpdateOneWithoutDivisionNestedInput = {
    create?: XOR<CoordinatorCreateWithoutDivisionInput, CoordinatorUncheckedCreateWithoutDivisionInput>
    connectOrCreate?: CoordinatorCreateOrConnectWithoutDivisionInput
    upsert?: CoordinatorUpsertWithoutDivisionInput
    disconnect?: CoordinatorWhereInput | boolean
    delete?: CoordinatorWhereInput | boolean
    connect?: CoordinatorWhereUniqueInput
    update?: XOR<XOR<CoordinatorUpdateToOneWithWhereWithoutDivisionInput, CoordinatorUpdateWithoutDivisionInput>, CoordinatorUncheckedUpdateWithoutDivisionInput>
  }

  export type DivisionCreateNestedOneWithoutChurchesInput = {
    create?: XOR<DivisionCreateWithoutChurchesInput, DivisionUncheckedCreateWithoutChurchesInput>
    connectOrCreate?: DivisionCreateOrConnectWithoutChurchesInput
    connect?: DivisionWhereUniqueInput
  }

  export type PastorCreateNestedOneWithoutChurchInput = {
    create?: XOR<PastorCreateWithoutChurchInput, PastorUncheckedCreateWithoutChurchInput>
    connectOrCreate?: PastorCreateOrConnectWithoutChurchInput
    connect?: PastorWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutChurchInput = {
    create?: XOR<UserCreateWithoutChurchInput, UserUncheckedCreateWithoutChurchInput> | UserCreateWithoutChurchInput[] | UserUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChurchInput | UserCreateOrConnectWithoutChurchInput[]
    createMany?: UserCreateManyChurchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RegistrationCreateNestedManyWithoutChurchInput = {
    create?: XOR<RegistrationCreateWithoutChurchInput, RegistrationUncheckedCreateWithoutChurchInput> | RegistrationCreateWithoutChurchInput[] | RegistrationUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutChurchInput | RegistrationCreateOrConnectWithoutChurchInput[]
    createMany?: RegistrationCreateManyChurchInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type PastorUncheckedCreateNestedOneWithoutChurchInput = {
    create?: XOR<PastorCreateWithoutChurchInput, PastorUncheckedCreateWithoutChurchInput>
    connectOrCreate?: PastorCreateOrConnectWithoutChurchInput
    connect?: PastorWhereUniqueInput
  }

  export type UserUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<UserCreateWithoutChurchInput, UserUncheckedCreateWithoutChurchInput> | UserCreateWithoutChurchInput[] | UserUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChurchInput | UserCreateOrConnectWithoutChurchInput[]
    createMany?: UserCreateManyChurchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RegistrationUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<RegistrationCreateWithoutChurchInput, RegistrationUncheckedCreateWithoutChurchInput> | RegistrationCreateWithoutChurchInput[] | RegistrationUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutChurchInput | RegistrationCreateOrConnectWithoutChurchInput[]
    createMany?: RegistrationCreateManyChurchInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type DivisionUpdateOneRequiredWithoutChurchesNestedInput = {
    create?: XOR<DivisionCreateWithoutChurchesInput, DivisionUncheckedCreateWithoutChurchesInput>
    connectOrCreate?: DivisionCreateOrConnectWithoutChurchesInput
    upsert?: DivisionUpsertWithoutChurchesInput
    connect?: DivisionWhereUniqueInput
    update?: XOR<XOR<DivisionUpdateToOneWithWhereWithoutChurchesInput, DivisionUpdateWithoutChurchesInput>, DivisionUncheckedUpdateWithoutChurchesInput>
  }

  export type PastorUpdateOneWithoutChurchNestedInput = {
    create?: XOR<PastorCreateWithoutChurchInput, PastorUncheckedCreateWithoutChurchInput>
    connectOrCreate?: PastorCreateOrConnectWithoutChurchInput
    upsert?: PastorUpsertWithoutChurchInput
    disconnect?: PastorWhereInput | boolean
    delete?: PastorWhereInput | boolean
    connect?: PastorWhereUniqueInput
    update?: XOR<XOR<PastorUpdateToOneWithWhereWithoutChurchInput, PastorUpdateWithoutChurchInput>, PastorUncheckedUpdateWithoutChurchInput>
  }

  export type UserUpdateManyWithoutChurchNestedInput = {
    create?: XOR<UserCreateWithoutChurchInput, UserUncheckedCreateWithoutChurchInput> | UserCreateWithoutChurchInput[] | UserUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChurchInput | UserCreateOrConnectWithoutChurchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutChurchInput | UserUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: UserCreateManyChurchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutChurchInput | UserUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutChurchInput | UserUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RegistrationUpdateManyWithoutChurchNestedInput = {
    create?: XOR<RegistrationCreateWithoutChurchInput, RegistrationUncheckedCreateWithoutChurchInput> | RegistrationCreateWithoutChurchInput[] | RegistrationUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutChurchInput | RegistrationCreateOrConnectWithoutChurchInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutChurchInput | RegistrationUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: RegistrationCreateManyChurchInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutChurchInput | RegistrationUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutChurchInput | RegistrationUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type PastorUncheckedUpdateOneWithoutChurchNestedInput = {
    create?: XOR<PastorCreateWithoutChurchInput, PastorUncheckedCreateWithoutChurchInput>
    connectOrCreate?: PastorCreateOrConnectWithoutChurchInput
    upsert?: PastorUpsertWithoutChurchInput
    disconnect?: PastorWhereInput | boolean
    delete?: PastorWhereInput | boolean
    connect?: PastorWhereUniqueInput
    update?: XOR<XOR<PastorUpdateToOneWithWhereWithoutChurchInput, PastorUpdateWithoutChurchInput>, PastorUncheckedUpdateWithoutChurchInput>
  }

  export type UserUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<UserCreateWithoutChurchInput, UserUncheckedCreateWithoutChurchInput> | UserCreateWithoutChurchInput[] | UserUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutChurchInput | UserCreateOrConnectWithoutChurchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutChurchInput | UserUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: UserCreateManyChurchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutChurchInput | UserUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutChurchInput | UserUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RegistrationUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<RegistrationCreateWithoutChurchInput, RegistrationUncheckedCreateWithoutChurchInput> | RegistrationCreateWithoutChurchInput[] | RegistrationUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutChurchInput | RegistrationCreateOrConnectWithoutChurchInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutChurchInput | RegistrationUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: RegistrationCreateManyChurchInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutChurchInput | RegistrationUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutChurchInput | RegistrationUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type DivisionCreateNestedOneWithoutCoordinatorInput = {
    create?: XOR<DivisionCreateWithoutCoordinatorInput, DivisionUncheckedCreateWithoutCoordinatorInput>
    connectOrCreate?: DivisionCreateOrConnectWithoutCoordinatorInput
    connect?: DivisionWhereUniqueInput
  }

  export type DivisionUpdateOneRequiredWithoutCoordinatorNestedInput = {
    create?: XOR<DivisionCreateWithoutCoordinatorInput, DivisionUncheckedCreateWithoutCoordinatorInput>
    connectOrCreate?: DivisionCreateOrConnectWithoutCoordinatorInput
    upsert?: DivisionUpsertWithoutCoordinatorInput
    connect?: DivisionWhereUniqueInput
    update?: XOR<XOR<DivisionUpdateToOneWithWhereWithoutCoordinatorInput, DivisionUpdateWithoutCoordinatorInput>, DivisionUncheckedUpdateWithoutCoordinatorInput>
  }

  export type ChurchCreateNestedOneWithoutPastorInput = {
    create?: XOR<ChurchCreateWithoutPastorInput, ChurchUncheckedCreateWithoutPastorInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutPastorInput
    connect?: ChurchWhereUniqueInput
  }

  export type ChurchUpdateOneRequiredWithoutPastorNestedInput = {
    create?: XOR<ChurchCreateWithoutPastorInput, ChurchUncheckedCreateWithoutPastorInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutPastorInput
    upsert?: ChurchUpsertWithoutPastorInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutPastorInput, ChurchUpdateWithoutPastorInput>, ChurchUncheckedUpdateWithoutPastorInput>
  }

  export type RegistrationCreateNestedManyWithoutEventInput = {
    create?: XOR<RegistrationCreateWithoutEventInput, RegistrationUncheckedCreateWithoutEventInput> | RegistrationCreateWithoutEventInput[] | RegistrationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutEventInput | RegistrationCreateOrConnectWithoutEventInput[]
    createMany?: RegistrationCreateManyEventInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type RegistrationUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<RegistrationCreateWithoutEventInput, RegistrationUncheckedCreateWithoutEventInput> | RegistrationCreateWithoutEventInput[] | RegistrationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutEventInput | RegistrationCreateOrConnectWithoutEventInput[]
    createMany?: RegistrationCreateManyEventInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventStatus
  }

  export type RegistrationUpdateManyWithoutEventNestedInput = {
    create?: XOR<RegistrationCreateWithoutEventInput, RegistrationUncheckedCreateWithoutEventInput> | RegistrationCreateWithoutEventInput[] | RegistrationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutEventInput | RegistrationCreateOrConnectWithoutEventInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutEventInput | RegistrationUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: RegistrationCreateManyEventInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutEventInput | RegistrationUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutEventInput | RegistrationUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type RegistrationUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<RegistrationCreateWithoutEventInput, RegistrationUncheckedCreateWithoutEventInput> | RegistrationCreateWithoutEventInput[] | RegistrationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutEventInput | RegistrationCreateOrConnectWithoutEventInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutEventInput | RegistrationUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: RegistrationCreateManyEventInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutEventInput | RegistrationUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutEventInput | RegistrationUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<EventCreateWithoutRegistrationsInput, EventUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: EventCreateOrConnectWithoutRegistrationsInput
    connect?: EventWhereUniqueInput
  }

  export type ChurchCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<ChurchCreateWithoutRegistrationsInput, ChurchUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutRegistrationsInput
    connect?: ChurchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<UserCreateWithoutRegistrationsInput, UserUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRegistrationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewedRegistrationsInput = {
    create?: XOR<UserCreateWithoutReviewedRegistrationsInput, UserUncheckedCreateWithoutReviewedRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewedRegistrationsInput
    connect?: UserWhereUniqueInput
  }

  export type DelegateCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<DelegateCreateWithoutRegistrationInput, DelegateUncheckedCreateWithoutRegistrationInput> | DelegateCreateWithoutRegistrationInput[] | DelegateUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: DelegateCreateOrConnectWithoutRegistrationInput | DelegateCreateOrConnectWithoutRegistrationInput[]
    createMany?: DelegateCreateManyRegistrationInputEnvelope
    connect?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
  }

  export type CookCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<CookCreateWithoutRegistrationInput, CookUncheckedCreateWithoutRegistrationInput> | CookCreateWithoutRegistrationInput[] | CookUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: CookCreateOrConnectWithoutRegistrationInput | CookCreateOrConnectWithoutRegistrationInput[]
    createMany?: CookCreateManyRegistrationInputEnvelope
    connect?: CookWhereUniqueInput | CookWhereUniqueInput[]
  }

  export type DelegateUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<DelegateCreateWithoutRegistrationInput, DelegateUncheckedCreateWithoutRegistrationInput> | DelegateCreateWithoutRegistrationInput[] | DelegateUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: DelegateCreateOrConnectWithoutRegistrationInput | DelegateCreateOrConnectWithoutRegistrationInput[]
    createMany?: DelegateCreateManyRegistrationInputEnvelope
    connect?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
  }

  export type CookUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<CookCreateWithoutRegistrationInput, CookUncheckedCreateWithoutRegistrationInput> | CookCreateWithoutRegistrationInput[] | CookUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: CookCreateOrConnectWithoutRegistrationInput | CookCreateOrConnectWithoutRegistrationInput[]
    createMany?: CookCreateManyRegistrationInputEnvelope
    connect?: CookWhereUniqueInput | CookWhereUniqueInput[]
  }

  export type EnumRegistrationStatusFieldUpdateOperationsInput = {
    set?: $Enums.RegistrationStatus
  }

  export type EventUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<EventCreateWithoutRegistrationsInput, EventUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: EventCreateOrConnectWithoutRegistrationsInput
    upsert?: EventUpsertWithoutRegistrationsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutRegistrationsInput, EventUpdateWithoutRegistrationsInput>, EventUncheckedUpdateWithoutRegistrationsInput>
  }

  export type ChurchUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<ChurchCreateWithoutRegistrationsInput, ChurchUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutRegistrationsInput
    upsert?: ChurchUpsertWithoutRegistrationsInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutRegistrationsInput, ChurchUpdateWithoutRegistrationsInput>, ChurchUncheckedUpdateWithoutRegistrationsInput>
  }

  export type UserUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<UserCreateWithoutRegistrationsInput, UserUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRegistrationsInput
    upsert?: UserUpsertWithoutRegistrationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRegistrationsInput, UserUpdateWithoutRegistrationsInput>, UserUncheckedUpdateWithoutRegistrationsInput>
  }

  export type UserUpdateOneWithoutReviewedRegistrationsNestedInput = {
    create?: XOR<UserCreateWithoutReviewedRegistrationsInput, UserUncheckedCreateWithoutReviewedRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewedRegistrationsInput
    upsert?: UserUpsertWithoutReviewedRegistrationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewedRegistrationsInput, UserUpdateWithoutReviewedRegistrationsInput>, UserUncheckedUpdateWithoutReviewedRegistrationsInput>
  }

  export type DelegateUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<DelegateCreateWithoutRegistrationInput, DelegateUncheckedCreateWithoutRegistrationInput> | DelegateCreateWithoutRegistrationInput[] | DelegateUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: DelegateCreateOrConnectWithoutRegistrationInput | DelegateCreateOrConnectWithoutRegistrationInput[]
    upsert?: DelegateUpsertWithWhereUniqueWithoutRegistrationInput | DelegateUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: DelegateCreateManyRegistrationInputEnvelope
    set?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    disconnect?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    delete?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    connect?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    update?: DelegateUpdateWithWhereUniqueWithoutRegistrationInput | DelegateUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: DelegateUpdateManyWithWhereWithoutRegistrationInput | DelegateUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: DelegateScalarWhereInput | DelegateScalarWhereInput[]
  }

  export type CookUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<CookCreateWithoutRegistrationInput, CookUncheckedCreateWithoutRegistrationInput> | CookCreateWithoutRegistrationInput[] | CookUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: CookCreateOrConnectWithoutRegistrationInput | CookCreateOrConnectWithoutRegistrationInput[]
    upsert?: CookUpsertWithWhereUniqueWithoutRegistrationInput | CookUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: CookCreateManyRegistrationInputEnvelope
    set?: CookWhereUniqueInput | CookWhereUniqueInput[]
    disconnect?: CookWhereUniqueInput | CookWhereUniqueInput[]
    delete?: CookWhereUniqueInput | CookWhereUniqueInput[]
    connect?: CookWhereUniqueInput | CookWhereUniqueInput[]
    update?: CookUpdateWithWhereUniqueWithoutRegistrationInput | CookUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: CookUpdateManyWithWhereWithoutRegistrationInput | CookUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: CookScalarWhereInput | CookScalarWhereInput[]
  }

  export type DelegateUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<DelegateCreateWithoutRegistrationInput, DelegateUncheckedCreateWithoutRegistrationInput> | DelegateCreateWithoutRegistrationInput[] | DelegateUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: DelegateCreateOrConnectWithoutRegistrationInput | DelegateCreateOrConnectWithoutRegistrationInput[]
    upsert?: DelegateUpsertWithWhereUniqueWithoutRegistrationInput | DelegateUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: DelegateCreateManyRegistrationInputEnvelope
    set?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    disconnect?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    delete?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    connect?: DelegateWhereUniqueInput | DelegateWhereUniqueInput[]
    update?: DelegateUpdateWithWhereUniqueWithoutRegistrationInput | DelegateUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: DelegateUpdateManyWithWhereWithoutRegistrationInput | DelegateUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: DelegateScalarWhereInput | DelegateScalarWhereInput[]
  }

  export type CookUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<CookCreateWithoutRegistrationInput, CookUncheckedCreateWithoutRegistrationInput> | CookCreateWithoutRegistrationInput[] | CookUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: CookCreateOrConnectWithoutRegistrationInput | CookCreateOrConnectWithoutRegistrationInput[]
    upsert?: CookUpsertWithWhereUniqueWithoutRegistrationInput | CookUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: CookCreateManyRegistrationInputEnvelope
    set?: CookWhereUniqueInput | CookWhereUniqueInput[]
    disconnect?: CookWhereUniqueInput | CookWhereUniqueInput[]
    delete?: CookWhereUniqueInput | CookWhereUniqueInput[]
    connect?: CookWhereUniqueInput | CookWhereUniqueInput[]
    update?: CookUpdateWithWhereUniqueWithoutRegistrationInput | CookUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: CookUpdateManyWithWhereWithoutRegistrationInput | CookUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: CookScalarWhereInput | CookScalarWhereInput[]
  }

  export type RegistrationCreateNestedOneWithoutDelegatesInput = {
    create?: XOR<RegistrationCreateWithoutDelegatesInput, RegistrationUncheckedCreateWithoutDelegatesInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutDelegatesInput
    connect?: RegistrationWhereUniqueInput
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type RegistrationUpdateOneRequiredWithoutDelegatesNestedInput = {
    create?: XOR<RegistrationCreateWithoutDelegatesInput, RegistrationUncheckedCreateWithoutDelegatesInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutDelegatesInput
    upsert?: RegistrationUpsertWithoutDelegatesInput
    connect?: RegistrationWhereUniqueInput
    update?: XOR<XOR<RegistrationUpdateToOneWithWhereWithoutDelegatesInput, RegistrationUpdateWithoutDelegatesInput>, RegistrationUncheckedUpdateWithoutDelegatesInput>
  }

  export type RegistrationCreateNestedOneWithoutCooksInput = {
    create?: XOR<RegistrationCreateWithoutCooksInput, RegistrationUncheckedCreateWithoutCooksInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutCooksInput
    connect?: RegistrationWhereUniqueInput
  }

  export type RegistrationUpdateOneRequiredWithoutCooksNestedInput = {
    create?: XOR<RegistrationCreateWithoutCooksInput, RegistrationUncheckedCreateWithoutCooksInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutCooksInput
    upsert?: RegistrationUpsertWithoutCooksInput
    connect?: RegistrationWhereUniqueInput
    update?: XOR<XOR<RegistrationUpdateToOneWithWhereWithoutCooksInput, RegistrationUpdateWithoutCooksInput>, RegistrationUncheckedUpdateWithoutCooksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type NestedEnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChurchCreateWithoutPresidentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    division: DivisionCreateNestedOneWithoutChurchesInput
    pastor?: PastorCreateNestedOneWithoutChurchInput
    registrations?: RegistrationCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutPresidentsInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pastor?: PastorUncheckedCreateNestedOneWithoutChurchInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutPresidentsInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutPresidentsInput, ChurchUncheckedCreateWithoutPresidentsInput>
  }

  export type RegistrationCreateWithoutPresidentInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    event: EventCreateNestedOneWithoutRegistrationsInput
    church: ChurchCreateNestedOneWithoutRegistrationsInput
    reviewer?: UserCreateNestedOneWithoutReviewedRegistrationsInput
    delegates?: DelegateCreateNestedManyWithoutRegistrationInput
    cooks?: CookCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutPresidentInput = {
    id?: string
    eventId: string
    churchId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    delegates?: DelegateUncheckedCreateNestedManyWithoutRegistrationInput
    cooks?: CookUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutPresidentInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutPresidentInput, RegistrationUncheckedCreateWithoutPresidentInput>
  }

  export type RegistrationCreateManyPresidentInputEnvelope = {
    data: RegistrationCreateManyPresidentInput | RegistrationCreateManyPresidentInput[]
    skipDuplicates?: boolean
  }

  export type RegistrationCreateWithoutReviewerInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    event: EventCreateNestedOneWithoutRegistrationsInput
    church: ChurchCreateNestedOneWithoutRegistrationsInput
    president: UserCreateNestedOneWithoutRegistrationsInput
    delegates?: DelegateCreateNestedManyWithoutRegistrationInput
    cooks?: CookCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutReviewerInput = {
    id?: string
    eventId: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    delegates?: DelegateUncheckedCreateNestedManyWithoutRegistrationInput
    cooks?: CookUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutReviewerInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutReviewerInput, RegistrationUncheckedCreateWithoutReviewerInput>
  }

  export type RegistrationCreateManyReviewerInputEnvelope = {
    data: RegistrationCreateManyReviewerInput | RegistrationCreateManyReviewerInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ChurchUpsertWithoutPresidentsInput = {
    update: XOR<ChurchUpdateWithoutPresidentsInput, ChurchUncheckedUpdateWithoutPresidentsInput>
    create: XOR<ChurchCreateWithoutPresidentsInput, ChurchUncheckedCreateWithoutPresidentsInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutPresidentsInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutPresidentsInput, ChurchUncheckedUpdateWithoutPresidentsInput>
  }

  export type ChurchUpdateWithoutPresidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    division?: DivisionUpdateOneRequiredWithoutChurchesNestedInput
    pastor?: PastorUpdateOneWithoutChurchNestedInput
    registrations?: RegistrationUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutPresidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pastor?: PastorUncheckedUpdateOneWithoutChurchNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type RegistrationUpsertWithWhereUniqueWithoutPresidentInput = {
    where: RegistrationWhereUniqueInput
    update: XOR<RegistrationUpdateWithoutPresidentInput, RegistrationUncheckedUpdateWithoutPresidentInput>
    create: XOR<RegistrationCreateWithoutPresidentInput, RegistrationUncheckedCreateWithoutPresidentInput>
  }

  export type RegistrationUpdateWithWhereUniqueWithoutPresidentInput = {
    where: RegistrationWhereUniqueInput
    data: XOR<RegistrationUpdateWithoutPresidentInput, RegistrationUncheckedUpdateWithoutPresidentInput>
  }

  export type RegistrationUpdateManyWithWhereWithoutPresidentInput = {
    where: RegistrationScalarWhereInput
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyWithoutPresidentInput>
  }

  export type RegistrationScalarWhereInput = {
    AND?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
    OR?: RegistrationScalarWhereInput[]
    NOT?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
    id?: StringFilter<"Registration"> | string
    eventId?: StringFilter<"Registration"> | string
    churchId?: StringFilter<"Registration"> | string
    presidentId?: StringFilter<"Registration"> | string
    status?: EnumRegistrationStatusFilter<"Registration"> | $Enums.RegistrationStatus
    remarks?: StringNullableFilter<"Registration"> | string | null
    receiptImage?: StringNullableFilter<"Registration"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Registration"> | Date | string | null
    reviewedBy?: StringNullableFilter<"Registration"> | string | null
    createdAt?: DateTimeFilter<"Registration"> | Date | string
    updatedAt?: DateTimeFilter<"Registration"> | Date | string
    totalFee?: IntFilter<"Registration"> | number
    delegateFeePerPerson?: IntFilter<"Registration"> | number
    cookFeePerPerson?: IntFilter<"Registration"> | number
    isPreRegistration?: BoolFilter<"Registration"> | boolean
  }

  export type RegistrationUpsertWithWhereUniqueWithoutReviewerInput = {
    where: RegistrationWhereUniqueInput
    update: XOR<RegistrationUpdateWithoutReviewerInput, RegistrationUncheckedUpdateWithoutReviewerInput>
    create: XOR<RegistrationCreateWithoutReviewerInput, RegistrationUncheckedCreateWithoutReviewerInput>
  }

  export type RegistrationUpdateWithWhereUniqueWithoutReviewerInput = {
    where: RegistrationWhereUniqueInput
    data: XOR<RegistrationUpdateWithoutReviewerInput, RegistrationUncheckedUpdateWithoutReviewerInput>
  }

  export type RegistrationUpdateManyWithWhereWithoutReviewerInput = {
    where: RegistrationScalarWhereInput
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyWithoutReviewerInput>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    church?: ChurchCreateNestedOneWithoutPresidentsInput
    registrations?: RegistrationCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    church?: ChurchUpdateOneWithoutPresidentsNestedInput
    registrations?: RegistrationUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    church?: ChurchCreateNestedOneWithoutPresidentsInput
    registrations?: RegistrationCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    church?: ChurchUpdateOneWithoutPresidentsNestedInput
    registrations?: RegistrationUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type ChurchCreateWithoutDivisionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pastor?: PastorCreateNestedOneWithoutChurchInput
    presidents?: UserCreateNestedManyWithoutChurchInput
    registrations?: RegistrationCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutDivisionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pastor?: PastorUncheckedCreateNestedOneWithoutChurchInput
    presidents?: UserUncheckedCreateNestedManyWithoutChurchInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutDivisionInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutDivisionInput, ChurchUncheckedCreateWithoutDivisionInput>
  }

  export type ChurchCreateManyDivisionInputEnvelope = {
    data: ChurchCreateManyDivisionInput | ChurchCreateManyDivisionInput[]
    skipDuplicates?: boolean
  }

  export type CoordinatorCreateWithoutDivisionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoordinatorUncheckedCreateWithoutDivisionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoordinatorCreateOrConnectWithoutDivisionInput = {
    where: CoordinatorWhereUniqueInput
    create: XOR<CoordinatorCreateWithoutDivisionInput, CoordinatorUncheckedCreateWithoutDivisionInput>
  }

  export type ChurchUpsertWithWhereUniqueWithoutDivisionInput = {
    where: ChurchWhereUniqueInput
    update: XOR<ChurchUpdateWithoutDivisionInput, ChurchUncheckedUpdateWithoutDivisionInput>
    create: XOR<ChurchCreateWithoutDivisionInput, ChurchUncheckedCreateWithoutDivisionInput>
  }

  export type ChurchUpdateWithWhereUniqueWithoutDivisionInput = {
    where: ChurchWhereUniqueInput
    data: XOR<ChurchUpdateWithoutDivisionInput, ChurchUncheckedUpdateWithoutDivisionInput>
  }

  export type ChurchUpdateManyWithWhereWithoutDivisionInput = {
    where: ChurchScalarWhereInput
    data: XOR<ChurchUpdateManyMutationInput, ChurchUncheckedUpdateManyWithoutDivisionInput>
  }

  export type ChurchScalarWhereInput = {
    AND?: ChurchScalarWhereInput | ChurchScalarWhereInput[]
    OR?: ChurchScalarWhereInput[]
    NOT?: ChurchScalarWhereInput | ChurchScalarWhereInput[]
    id?: StringFilter<"Church"> | string
    name?: StringFilter<"Church"> | string
    divisionId?: StringFilter<"Church"> | string
    createdAt?: DateTimeFilter<"Church"> | Date | string
    updatedAt?: DateTimeFilter<"Church"> | Date | string
  }

  export type CoordinatorUpsertWithoutDivisionInput = {
    update: XOR<CoordinatorUpdateWithoutDivisionInput, CoordinatorUncheckedUpdateWithoutDivisionInput>
    create: XOR<CoordinatorCreateWithoutDivisionInput, CoordinatorUncheckedCreateWithoutDivisionInput>
    where?: CoordinatorWhereInput
  }

  export type CoordinatorUpdateToOneWithWhereWithoutDivisionInput = {
    where?: CoordinatorWhereInput
    data: XOR<CoordinatorUpdateWithoutDivisionInput, CoordinatorUncheckedUpdateWithoutDivisionInput>
  }

  export type CoordinatorUpdateWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoordinatorUncheckedUpdateWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DivisionCreateWithoutChurchesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    coordinator?: CoordinatorCreateNestedOneWithoutDivisionInput
  }

  export type DivisionUncheckedCreateWithoutChurchesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    coordinator?: CoordinatorUncheckedCreateNestedOneWithoutDivisionInput
  }

  export type DivisionCreateOrConnectWithoutChurchesInput = {
    where: DivisionWhereUniqueInput
    create: XOR<DivisionCreateWithoutChurchesInput, DivisionUncheckedCreateWithoutChurchesInput>
  }

  export type PastorCreateWithoutChurchInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastorUncheckedCreateWithoutChurchInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastorCreateOrConnectWithoutChurchInput = {
    where: PastorWhereUniqueInput
    create: XOR<PastorCreateWithoutChurchInput, PastorUncheckedCreateWithoutChurchInput>
  }

  export type UserCreateWithoutChurchInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    registrations?: RegistrationCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutChurchInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutPresidentInput
    reviewedRegistrations?: RegistrationUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutChurchInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChurchInput, UserUncheckedCreateWithoutChurchInput>
  }

  export type UserCreateManyChurchInputEnvelope = {
    data: UserCreateManyChurchInput | UserCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type RegistrationCreateWithoutChurchInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    event: EventCreateNestedOneWithoutRegistrationsInput
    president: UserCreateNestedOneWithoutRegistrationsInput
    reviewer?: UserCreateNestedOneWithoutReviewedRegistrationsInput
    delegates?: DelegateCreateNestedManyWithoutRegistrationInput
    cooks?: CookCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutChurchInput = {
    id?: string
    eventId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    delegates?: DelegateUncheckedCreateNestedManyWithoutRegistrationInput
    cooks?: CookUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutChurchInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutChurchInput, RegistrationUncheckedCreateWithoutChurchInput>
  }

  export type RegistrationCreateManyChurchInputEnvelope = {
    data: RegistrationCreateManyChurchInput | RegistrationCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type DivisionUpsertWithoutChurchesInput = {
    update: XOR<DivisionUpdateWithoutChurchesInput, DivisionUncheckedUpdateWithoutChurchesInput>
    create: XOR<DivisionCreateWithoutChurchesInput, DivisionUncheckedCreateWithoutChurchesInput>
    where?: DivisionWhereInput
  }

  export type DivisionUpdateToOneWithWhereWithoutChurchesInput = {
    where?: DivisionWhereInput
    data: XOR<DivisionUpdateWithoutChurchesInput, DivisionUncheckedUpdateWithoutChurchesInput>
  }

  export type DivisionUpdateWithoutChurchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coordinator?: CoordinatorUpdateOneWithoutDivisionNestedInput
  }

  export type DivisionUncheckedUpdateWithoutChurchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coordinator?: CoordinatorUncheckedUpdateOneWithoutDivisionNestedInput
  }

  export type PastorUpsertWithoutChurchInput = {
    update: XOR<PastorUpdateWithoutChurchInput, PastorUncheckedUpdateWithoutChurchInput>
    create: XOR<PastorCreateWithoutChurchInput, PastorUncheckedCreateWithoutChurchInput>
    where?: PastorWhereInput
  }

  export type PastorUpdateToOneWithWhereWithoutChurchInput = {
    where?: PastorWhereInput
    data: XOR<PastorUpdateWithoutChurchInput, PastorUncheckedUpdateWithoutChurchInput>
  }

  export type PastorUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastorUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutChurchInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutChurchInput, UserUncheckedUpdateWithoutChurchInput>
    create: XOR<UserCreateWithoutChurchInput, UserUncheckedCreateWithoutChurchInput>
  }

  export type UserUpdateWithWhereUniqueWithoutChurchInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutChurchInput, UserUncheckedUpdateWithoutChurchInput>
  }

  export type UserUpdateManyWithWhereWithoutChurchInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutChurchInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    churchId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type RegistrationUpsertWithWhereUniqueWithoutChurchInput = {
    where: RegistrationWhereUniqueInput
    update: XOR<RegistrationUpdateWithoutChurchInput, RegistrationUncheckedUpdateWithoutChurchInput>
    create: XOR<RegistrationCreateWithoutChurchInput, RegistrationUncheckedCreateWithoutChurchInput>
  }

  export type RegistrationUpdateWithWhereUniqueWithoutChurchInput = {
    where: RegistrationWhereUniqueInput
    data: XOR<RegistrationUpdateWithoutChurchInput, RegistrationUncheckedUpdateWithoutChurchInput>
  }

  export type RegistrationUpdateManyWithWhereWithoutChurchInput = {
    where: RegistrationScalarWhereInput
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyWithoutChurchInput>
  }

  export type DivisionCreateWithoutCoordinatorInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    churches?: ChurchCreateNestedManyWithoutDivisionInput
  }

  export type DivisionUncheckedCreateWithoutCoordinatorInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    churches?: ChurchUncheckedCreateNestedManyWithoutDivisionInput
  }

  export type DivisionCreateOrConnectWithoutCoordinatorInput = {
    where: DivisionWhereUniqueInput
    create: XOR<DivisionCreateWithoutCoordinatorInput, DivisionUncheckedCreateWithoutCoordinatorInput>
  }

  export type DivisionUpsertWithoutCoordinatorInput = {
    update: XOR<DivisionUpdateWithoutCoordinatorInput, DivisionUncheckedUpdateWithoutCoordinatorInput>
    create: XOR<DivisionCreateWithoutCoordinatorInput, DivisionUncheckedCreateWithoutCoordinatorInput>
    where?: DivisionWhereInput
  }

  export type DivisionUpdateToOneWithWhereWithoutCoordinatorInput = {
    where?: DivisionWhereInput
    data: XOR<DivisionUpdateWithoutCoordinatorInput, DivisionUncheckedUpdateWithoutCoordinatorInput>
  }

  export type DivisionUpdateWithoutCoordinatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    churches?: ChurchUpdateManyWithoutDivisionNestedInput
  }

  export type DivisionUncheckedUpdateWithoutCoordinatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    churches?: ChurchUncheckedUpdateManyWithoutDivisionNestedInput
  }

  export type ChurchCreateWithoutPastorInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    division: DivisionCreateNestedOneWithoutChurchesInput
    presidents?: UserCreateNestedManyWithoutChurchInput
    registrations?: RegistrationCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutPastorInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    presidents?: UserUncheckedCreateNestedManyWithoutChurchInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutPastorInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutPastorInput, ChurchUncheckedCreateWithoutPastorInput>
  }

  export type ChurchUpsertWithoutPastorInput = {
    update: XOR<ChurchUpdateWithoutPastorInput, ChurchUncheckedUpdateWithoutPastorInput>
    create: XOR<ChurchCreateWithoutPastorInput, ChurchUncheckedCreateWithoutPastorInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutPastorInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutPastorInput, ChurchUncheckedUpdateWithoutPastorInput>
  }

  export type ChurchUpdateWithoutPastorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    division?: DivisionUpdateOneRequiredWithoutChurchesNestedInput
    presidents?: UserUpdateManyWithoutChurchNestedInput
    registrations?: RegistrationUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutPastorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presidents?: UserUncheckedUpdateManyWithoutChurchNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type RegistrationCreateWithoutEventInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    church: ChurchCreateNestedOneWithoutRegistrationsInput
    president: UserCreateNestedOneWithoutRegistrationsInput
    reviewer?: UserCreateNestedOneWithoutReviewedRegistrationsInput
    delegates?: DelegateCreateNestedManyWithoutRegistrationInput
    cooks?: CookCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutEventInput = {
    id?: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    delegates?: DelegateUncheckedCreateNestedManyWithoutRegistrationInput
    cooks?: CookUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutEventInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutEventInput, RegistrationUncheckedCreateWithoutEventInput>
  }

  export type RegistrationCreateManyEventInputEnvelope = {
    data: RegistrationCreateManyEventInput | RegistrationCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type RegistrationUpsertWithWhereUniqueWithoutEventInput = {
    where: RegistrationWhereUniqueInput
    update: XOR<RegistrationUpdateWithoutEventInput, RegistrationUncheckedUpdateWithoutEventInput>
    create: XOR<RegistrationCreateWithoutEventInput, RegistrationUncheckedCreateWithoutEventInput>
  }

  export type RegistrationUpdateWithWhereUniqueWithoutEventInput = {
    where: RegistrationWhereUniqueInput
    data: XOR<RegistrationUpdateWithoutEventInput, RegistrationUncheckedUpdateWithoutEventInput>
  }

  export type RegistrationUpdateManyWithWhereWithoutEventInput = {
    where: RegistrationScalarWhereInput
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyWithoutEventInput>
  }

  export type EventCreateWithoutRegistrationsInput = {
    id?: string
    name: string
    description?: string | null
    location: string
    banner?: string | null
    startDate: Date | string
    endDate: Date | string
    registrationDeadline: Date | string
    preRegistrationFee: number
    preRegistrationStart: Date | string
    preRegistrationEnd: Date | string
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status?: $Enums.EventStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUncheckedCreateWithoutRegistrationsInput = {
    id?: string
    name: string
    description?: string | null
    location: string
    banner?: string | null
    startDate: Date | string
    endDate: Date | string
    registrationDeadline: Date | string
    preRegistrationFee: number
    preRegistrationStart: Date | string
    preRegistrationEnd: Date | string
    onsiteRegistrationFee: number
    cookRegistrationFee: number
    status?: $Enums.EventStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCreateOrConnectWithoutRegistrationsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutRegistrationsInput, EventUncheckedCreateWithoutRegistrationsInput>
  }

  export type ChurchCreateWithoutRegistrationsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    division: DivisionCreateNestedOneWithoutChurchesInput
    pastor?: PastorCreateNestedOneWithoutChurchInput
    presidents?: UserCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutRegistrationsInput = {
    id?: string
    name: string
    divisionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pastor?: PastorUncheckedCreateNestedOneWithoutChurchInput
    presidents?: UserUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutRegistrationsInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutRegistrationsInput, ChurchUncheckedCreateWithoutRegistrationsInput>
  }

  export type UserCreateWithoutRegistrationsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    church?: ChurchCreateNestedOneWithoutPresidentsInput
    reviewedRegistrations?: RegistrationCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutRegistrationsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reviewedRegistrations?: RegistrationUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutRegistrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRegistrationsInput, UserUncheckedCreateWithoutRegistrationsInput>
  }

  export type UserCreateWithoutReviewedRegistrationsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    church?: ChurchCreateNestedOneWithoutPresidentsInput
    registrations?: RegistrationCreateNestedManyWithoutPresidentInput
  }

  export type UserUncheckedCreateWithoutReviewedRegistrationsInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    registrations?: RegistrationUncheckedCreateNestedManyWithoutPresidentInput
  }

  export type UserCreateOrConnectWithoutReviewedRegistrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewedRegistrationsInput, UserUncheckedCreateWithoutReviewedRegistrationsInput>
  }

  export type DelegateCreateWithoutRegistrationInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DelegateUncheckedCreateWithoutRegistrationInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DelegateCreateOrConnectWithoutRegistrationInput = {
    where: DelegateWhereUniqueInput
    create: XOR<DelegateCreateWithoutRegistrationInput, DelegateUncheckedCreateWithoutRegistrationInput>
  }

  export type DelegateCreateManyRegistrationInputEnvelope = {
    data: DelegateCreateManyRegistrationInput | DelegateCreateManyRegistrationInput[]
    skipDuplicates?: boolean
  }

  export type CookCreateWithoutRegistrationInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CookUncheckedCreateWithoutRegistrationInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CookCreateOrConnectWithoutRegistrationInput = {
    where: CookWhereUniqueInput
    create: XOR<CookCreateWithoutRegistrationInput, CookUncheckedCreateWithoutRegistrationInput>
  }

  export type CookCreateManyRegistrationInputEnvelope = {
    data: CookCreateManyRegistrationInput | CookCreateManyRegistrationInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithoutRegistrationsInput = {
    update: XOR<EventUpdateWithoutRegistrationsInput, EventUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<EventCreateWithoutRegistrationsInput, EventUncheckedCreateWithoutRegistrationsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutRegistrationsInput, EventUncheckedUpdateWithoutRegistrationsInput>
  }

  export type EventUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    banner?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationFee?: IntFieldUpdateOperationsInput | number
    preRegistrationStart?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    onsiteRegistrationFee?: IntFieldUpdateOperationsInput | number
    cookRegistrationFee?: IntFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    banner?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationFee?: IntFieldUpdateOperationsInput | number
    preRegistrationStart?: DateTimeFieldUpdateOperationsInput | Date | string
    preRegistrationEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    onsiteRegistrationFee?: IntFieldUpdateOperationsInput | number
    cookRegistrationFee?: IntFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchUpsertWithoutRegistrationsInput = {
    update: XOR<ChurchUpdateWithoutRegistrationsInput, ChurchUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<ChurchCreateWithoutRegistrationsInput, ChurchUncheckedCreateWithoutRegistrationsInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutRegistrationsInput, ChurchUncheckedUpdateWithoutRegistrationsInput>
  }

  export type ChurchUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    division?: DivisionUpdateOneRequiredWithoutChurchesNestedInput
    pastor?: PastorUpdateOneWithoutChurchNestedInput
    presidents?: UserUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    divisionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pastor?: PastorUncheckedUpdateOneWithoutChurchNestedInput
    presidents?: UserUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type UserUpsertWithoutRegistrationsInput = {
    update: XOR<UserUpdateWithoutRegistrationsInput, UserUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<UserCreateWithoutRegistrationsInput, UserUncheckedCreateWithoutRegistrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRegistrationsInput, UserUncheckedUpdateWithoutRegistrationsInput>
  }

  export type UserUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    church?: ChurchUpdateOneWithoutPresidentsNestedInput
    reviewedRegistrations?: RegistrationUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reviewedRegistrations?: RegistrationUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserUpsertWithoutReviewedRegistrationsInput = {
    update: XOR<UserUpdateWithoutReviewedRegistrationsInput, UserUncheckedUpdateWithoutReviewedRegistrationsInput>
    create: XOR<UserCreateWithoutReviewedRegistrationsInput, UserUncheckedCreateWithoutReviewedRegistrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewedRegistrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewedRegistrationsInput, UserUncheckedUpdateWithoutReviewedRegistrationsInput>
  }

  export type UserUpdateWithoutReviewedRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    church?: ChurchUpdateOneWithoutPresidentsNestedInput
    registrations?: RegistrationUpdateManyWithoutPresidentNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewedRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutPresidentNestedInput
  }

  export type DelegateUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: DelegateWhereUniqueInput
    update: XOR<DelegateUpdateWithoutRegistrationInput, DelegateUncheckedUpdateWithoutRegistrationInput>
    create: XOR<DelegateCreateWithoutRegistrationInput, DelegateUncheckedCreateWithoutRegistrationInput>
  }

  export type DelegateUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: DelegateWhereUniqueInput
    data: XOR<DelegateUpdateWithoutRegistrationInput, DelegateUncheckedUpdateWithoutRegistrationInput>
  }

  export type DelegateUpdateManyWithWhereWithoutRegistrationInput = {
    where: DelegateScalarWhereInput
    data: XOR<DelegateUpdateManyMutationInput, DelegateUncheckedUpdateManyWithoutRegistrationInput>
  }

  export type DelegateScalarWhereInput = {
    AND?: DelegateScalarWhereInput | DelegateScalarWhereInput[]
    OR?: DelegateScalarWhereInput[]
    NOT?: DelegateScalarWhereInput | DelegateScalarWhereInput[]
    id?: StringFilter<"Delegate"> | string
    fullName?: StringFilter<"Delegate"> | string
    nickname?: StringNullableFilter<"Delegate"> | string | null
    age?: IntFilter<"Delegate"> | number
    gender?: EnumGenderFilter<"Delegate"> | $Enums.Gender
    registrationId?: StringFilter<"Delegate"> | string
    createdAt?: DateTimeFilter<"Delegate"> | Date | string
    updatedAt?: DateTimeFilter<"Delegate"> | Date | string
  }

  export type CookUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: CookWhereUniqueInput
    update: XOR<CookUpdateWithoutRegistrationInput, CookUncheckedUpdateWithoutRegistrationInput>
    create: XOR<CookCreateWithoutRegistrationInput, CookUncheckedCreateWithoutRegistrationInput>
  }

  export type CookUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: CookWhereUniqueInput
    data: XOR<CookUpdateWithoutRegistrationInput, CookUncheckedUpdateWithoutRegistrationInput>
  }

  export type CookUpdateManyWithWhereWithoutRegistrationInput = {
    where: CookScalarWhereInput
    data: XOR<CookUpdateManyMutationInput, CookUncheckedUpdateManyWithoutRegistrationInput>
  }

  export type CookScalarWhereInput = {
    AND?: CookScalarWhereInput | CookScalarWhereInput[]
    OR?: CookScalarWhereInput[]
    NOT?: CookScalarWhereInput | CookScalarWhereInput[]
    id?: StringFilter<"Cook"> | string
    fullName?: StringFilter<"Cook"> | string
    nickname?: StringNullableFilter<"Cook"> | string | null
    age?: IntFilter<"Cook"> | number
    gender?: EnumGenderFilter<"Cook"> | $Enums.Gender
    registrationId?: StringFilter<"Cook"> | string
    createdAt?: DateTimeFilter<"Cook"> | Date | string
    updatedAt?: DateTimeFilter<"Cook"> | Date | string
  }

  export type RegistrationCreateWithoutDelegatesInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    event: EventCreateNestedOneWithoutRegistrationsInput
    church: ChurchCreateNestedOneWithoutRegistrationsInput
    president: UserCreateNestedOneWithoutRegistrationsInput
    reviewer?: UserCreateNestedOneWithoutReviewedRegistrationsInput
    cooks?: CookCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutDelegatesInput = {
    id?: string
    eventId: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    cooks?: CookUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutDelegatesInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutDelegatesInput, RegistrationUncheckedCreateWithoutDelegatesInput>
  }

  export type RegistrationUpsertWithoutDelegatesInput = {
    update: XOR<RegistrationUpdateWithoutDelegatesInput, RegistrationUncheckedUpdateWithoutDelegatesInput>
    create: XOR<RegistrationCreateWithoutDelegatesInput, RegistrationUncheckedCreateWithoutDelegatesInput>
    where?: RegistrationWhereInput
  }

  export type RegistrationUpdateToOneWithWhereWithoutDelegatesInput = {
    where?: RegistrationWhereInput
    data: XOR<RegistrationUpdateWithoutDelegatesInput, RegistrationUncheckedUpdateWithoutDelegatesInput>
  }

  export type RegistrationUpdateWithoutDelegatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutRegistrationsNestedInput
    church?: ChurchUpdateOneRequiredWithoutRegistrationsNestedInput
    president?: UserUpdateOneRequiredWithoutRegistrationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewedRegistrationsNestedInput
    cooks?: CookUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutDelegatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    cooks?: CookUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationCreateWithoutCooksInput = {
    id?: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    event: EventCreateNestedOneWithoutRegistrationsInput
    church: ChurchCreateNestedOneWithoutRegistrationsInput
    president: UserCreateNestedOneWithoutRegistrationsInput
    reviewer?: UserCreateNestedOneWithoutReviewedRegistrationsInput
    delegates?: DelegateCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutCooksInput = {
    id?: string
    eventId: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
    delegates?: DelegateUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutCooksInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutCooksInput, RegistrationUncheckedCreateWithoutCooksInput>
  }

  export type RegistrationUpsertWithoutCooksInput = {
    update: XOR<RegistrationUpdateWithoutCooksInput, RegistrationUncheckedUpdateWithoutCooksInput>
    create: XOR<RegistrationCreateWithoutCooksInput, RegistrationUncheckedCreateWithoutCooksInput>
    where?: RegistrationWhereInput
  }

  export type RegistrationUpdateToOneWithWhereWithoutCooksInput = {
    where?: RegistrationWhereInput
    data: XOR<RegistrationUpdateWithoutCooksInput, RegistrationUncheckedUpdateWithoutCooksInput>
  }

  export type RegistrationUpdateWithoutCooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutRegistrationsNestedInput
    church?: ChurchUpdateOneRequiredWithoutRegistrationsNestedInput
    president?: UserUpdateOneRequiredWithoutRegistrationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewedRegistrationsNestedInput
    delegates?: DelegateUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutCooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    delegates?: DelegateUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationCreateManyPresidentInput = {
    id?: string
    eventId: string
    churchId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
  }

  export type RegistrationCreateManyReviewerInput = {
    id?: string
    eventId: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUpdateWithoutPresidentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutRegistrationsNestedInput
    church?: ChurchUpdateOneRequiredWithoutRegistrationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewedRegistrationsNestedInput
    delegates?: DelegateUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutPresidentInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    delegates?: DelegateUncheckedUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateManyWithoutPresidentInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RegistrationUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutRegistrationsNestedInput
    church?: ChurchUpdateOneRequiredWithoutRegistrationsNestedInput
    president?: UserUpdateOneRequiredWithoutRegistrationsNestedInput
    delegates?: DelegateUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    delegates?: DelegateUncheckedUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateManyWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ChurchCreateManyDivisionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchUpdateWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pastor?: PastorUpdateOneWithoutChurchNestedInput
    presidents?: UserUpdateManyWithoutChurchNestedInput
    registrations?: RegistrationUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pastor?: PastorUncheckedUpdateOneWithoutChurchNestedInput
    presidents?: UserUncheckedUpdateManyWithoutChurchNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateManyWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyChurchInput = {
    id?: string
    name: string
    email: string
    role?: $Enums.UserRole
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationCreateManyChurchInput = {
    id?: string
    eventId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
  }

  export type UserUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    registrations?: RegistrationUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    registrations?: RegistrationUncheckedUpdateManyWithoutPresidentNestedInput
    reviewedRegistrations?: RegistrationUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutRegistrationsNestedInput
    president?: UserUpdateOneRequiredWithoutRegistrationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewedRegistrationsNestedInput
    delegates?: DelegateUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    delegates?: DelegateUncheckedUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RegistrationCreateManyEventInput = {
    id?: string
    churchId: string
    presidentId: string
    status?: $Enums.RegistrationStatus
    remarks?: string | null
    receiptImage?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalFee?: number
    delegateFeePerPerson?: number
    cookFeePerPerson?: number
    isPreRegistration?: boolean
  }

  export type RegistrationUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    church?: ChurchUpdateOneRequiredWithoutRegistrationsNestedInput
    president?: UserUpdateOneRequiredWithoutRegistrationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewedRegistrationsNestedInput
    delegates?: DelegateUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
    delegates?: DelegateUncheckedUpdateManyWithoutRegistrationNestedInput
    cooks?: CookUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    presidentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalFee?: IntFieldUpdateOperationsInput | number
    delegateFeePerPerson?: IntFieldUpdateOperationsInput | number
    cookFeePerPerson?: IntFieldUpdateOperationsInput | number
    isPreRegistration?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DelegateCreateManyRegistrationInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CookCreateManyRegistrationInput = {
    id?: string
    fullName: string
    nickname?: string | null
    age: number
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DelegateUpdateWithoutRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegateUncheckedUpdateWithoutRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegateUncheckedUpdateManyWithoutRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CookUpdateWithoutRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CookUncheckedUpdateWithoutRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CookUncheckedUpdateManyWithoutRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}