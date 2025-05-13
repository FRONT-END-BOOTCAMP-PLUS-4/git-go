
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Repo
 * 
 */
export type Repo = $Result.DefaultSelection<Prisma.$RepoPayload>
/**
 * Model Memoir
 * 
 */
export type Memoir = $Result.DefaultSelection<Prisma.$MemoirPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MemoirType
 * 
 */
export type MemoirType = $Result.DefaultSelection<Prisma.$MemoirTypePayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model MemoirTag
 * 
 */
export type MemoirTag = $Result.DefaultSelection<Prisma.$MemoirTagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Repos
 * const repos = await prisma.repo.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Repos
   * const repos = await prisma.repo.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * `prisma.repo`: Exposes CRUD operations for the **Repo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Repos
    * const repos = await prisma.repo.findMany()
    * ```
    */
  get repo(): Prisma.RepoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memoir`: Exposes CRUD operations for the **Memoir** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memoirs
    * const memoirs = await prisma.memoir.findMany()
    * ```
    */
  get memoir(): Prisma.MemoirDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.memoirType`: Exposes CRUD operations for the **MemoirType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemoirTypes
    * const memoirTypes = await prisma.memoirType.findMany()
    * ```
    */
  get memoirType(): Prisma.MemoirTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memoirTag`: Exposes CRUD operations for the **MemoirTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemoirTags
    * const memoirTags = await prisma.memoirTag.findMany()
    * ```
    */
  get memoirTag(): Prisma.MemoirTagDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    Repo: 'Repo',
    Memoir: 'Memoir',
    User: 'User',
    MemoirType: 'MemoirType',
    Tag: 'Tag',
    MemoirTag: 'MemoirTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "repo" | "memoir" | "user" | "memoirType" | "tag" | "memoirTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Repo: {
        payload: Prisma.$RepoPayload<ExtArgs>
        fields: Prisma.RepoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>
          }
          findFirst: {
            args: Prisma.RepoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>
          }
          findMany: {
            args: Prisma.RepoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>[]
          }
          create: {
            args: Prisma.RepoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>
          }
          createMany: {
            args: Prisma.RepoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>[]
          }
          delete: {
            args: Prisma.RepoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>
          }
          update: {
            args: Prisma.RepoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>
          }
          deleteMany: {
            args: Prisma.RepoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>[]
          }
          upsert: {
            args: Prisma.RepoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepoPayload>
          }
          aggregate: {
            args: Prisma.RepoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepo>
          }
          groupBy: {
            args: Prisma.RepoGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepoGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepoCountArgs<ExtArgs>
            result: $Utils.Optional<RepoCountAggregateOutputType> | number
          }
        }
      }
      Memoir: {
        payload: Prisma.$MemoirPayload<ExtArgs>
        fields: Prisma.MemoirFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoirFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoirFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>
          }
          findFirst: {
            args: Prisma.MemoirFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoirFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>
          }
          findMany: {
            args: Prisma.MemoirFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>[]
          }
          create: {
            args: Prisma.MemoirCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>
          }
          createMany: {
            args: Prisma.MemoirCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoirCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>[]
          }
          delete: {
            args: Prisma.MemoirDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>
          }
          update: {
            args: Prisma.MemoirUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>
          }
          deleteMany: {
            args: Prisma.MemoirDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoirUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoirUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>[]
          }
          upsert: {
            args: Prisma.MemoirUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirPayload>
          }
          aggregate: {
            args: Prisma.MemoirAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemoir>
          }
          groupBy: {
            args: Prisma.MemoirGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoirGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoirCountArgs<ExtArgs>
            result: $Utils.Optional<MemoirCountAggregateOutputType> | number
          }
        }
      }
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
      MemoirType: {
        payload: Prisma.$MemoirTypePayload<ExtArgs>
        fields: Prisma.MemoirTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoirTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoirTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>
          }
          findFirst: {
            args: Prisma.MemoirTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoirTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>
          }
          findMany: {
            args: Prisma.MemoirTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>[]
          }
          create: {
            args: Prisma.MemoirTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>
          }
          createMany: {
            args: Prisma.MemoirTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoirTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>[]
          }
          delete: {
            args: Prisma.MemoirTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>
          }
          update: {
            args: Prisma.MemoirTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>
          }
          deleteMany: {
            args: Prisma.MemoirTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoirTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoirTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>[]
          }
          upsert: {
            args: Prisma.MemoirTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTypePayload>
          }
          aggregate: {
            args: Prisma.MemoirTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemoirType>
          }
          groupBy: {
            args: Prisma.MemoirTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoirTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoirTypeCountArgs<ExtArgs>
            result: $Utils.Optional<MemoirTypeCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      MemoirTag: {
        payload: Prisma.$MemoirTagPayload<ExtArgs>
        fields: Prisma.MemoirTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoirTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoirTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>
          }
          findFirst: {
            args: Prisma.MemoirTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoirTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>
          }
          findMany: {
            args: Prisma.MemoirTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>[]
          }
          create: {
            args: Prisma.MemoirTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>
          }
          createMany: {
            args: Prisma.MemoirTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoirTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>[]
          }
          delete: {
            args: Prisma.MemoirTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>
          }
          update: {
            args: Prisma.MemoirTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>
          }
          deleteMany: {
            args: Prisma.MemoirTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoirTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoirTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>[]
          }
          upsert: {
            args: Prisma.MemoirTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoirTagPayload>
          }
          aggregate: {
            args: Prisma.MemoirTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemoirTag>
          }
          groupBy: {
            args: Prisma.MemoirTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoirTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoirTagCountArgs<ExtArgs>
            result: $Utils.Optional<MemoirTagCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    repo?: RepoOmit
    memoir?: MemoirOmit
    user?: UserOmit
    memoirType?: MemoirTypeOmit
    tag?: TagOmit
    memoirTag?: MemoirTagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type RepoCountOutputType
   */

  export type RepoCountOutputType = {
    memoirs: number
  }

  export type RepoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirs?: boolean | RepoCountOutputTypeCountMemoirsArgs
  }

  // Custom InputTypes
  /**
   * RepoCountOutputType without action
   */
  export type RepoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepoCountOutputType
     */
    select?: RepoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepoCountOutputType without action
   */
  export type RepoCountOutputTypeCountMemoirsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirWhereInput
  }


  /**
   * Count Type MemoirCountOutputType
   */

  export type MemoirCountOutputType = {
    tags: number
  }

  export type MemoirCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | MemoirCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * MemoirCountOutputType without action
   */
  export type MemoirCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirCountOutputType
     */
    select?: MemoirCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemoirCountOutputType without action
   */
  export type MemoirCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirTagWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memoirs: number
    repos: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirs?: boolean | UserCountOutputTypeCountMemoirsArgs
    repos?: boolean | UserCountOutputTypeCountReposArgs
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
  export type UserCountOutputTypeCountMemoirsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepoWhereInput
  }


  /**
   * Count Type MemoirTypeCountOutputType
   */

  export type MemoirTypeCountOutputType = {
    memoirs: number
  }

  export type MemoirTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirs?: boolean | MemoirTypeCountOutputTypeCountMemoirsArgs
  }

  // Custom InputTypes
  /**
   * MemoirTypeCountOutputType without action
   */
  export type MemoirTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTypeCountOutputType
     */
    select?: MemoirTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemoirTypeCountOutputType without action
   */
  export type MemoirTypeCountOutputTypeCountMemoirsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    memoirTags: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirTags?: boolean | TagCountOutputTypeCountMemoirTagsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountMemoirTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Repo
   */

  export type AggregateRepo = {
    _count: RepoCountAggregateOutputType | null
    _avg: RepoAvgAggregateOutputType | null
    _sum: RepoSumAggregateOutputType | null
    _min: RepoMinAggregateOutputType | null
    _max: RepoMaxAggregateOutputType | null
  }

  export type RepoAvgAggregateOutputType = {
    id: number | null
  }

  export type RepoSumAggregateOutputType = {
    id: number | null
  }

  export type RepoMinAggregateOutputType = {
    id: number | null
    name: string | null
    userId: string | null
  }

  export type RepoMaxAggregateOutputType = {
    id: number | null
    name: string | null
    userId: string | null
  }

  export type RepoCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    _all: number
  }


  export type RepoAvgAggregateInputType = {
    id?: true
  }

  export type RepoSumAggregateInputType = {
    id?: true
  }

  export type RepoMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type RepoMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type RepoCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    _all?: true
  }

  export type RepoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repo to aggregate.
     */
    where?: RepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repos to fetch.
     */
    orderBy?: RepoOrderByWithRelationInput | RepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Repos
    **/
    _count?: true | RepoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepoMaxAggregateInputType
  }

  export type GetRepoAggregateType<T extends RepoAggregateArgs> = {
        [P in keyof T & keyof AggregateRepo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepo[P]>
      : GetScalarType<T[P], AggregateRepo[P]>
  }




  export type RepoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepoWhereInput
    orderBy?: RepoOrderByWithAggregationInput | RepoOrderByWithAggregationInput[]
    by: RepoScalarFieldEnum[] | RepoScalarFieldEnum
    having?: RepoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepoCountAggregateInputType | true
    _avg?: RepoAvgAggregateInputType
    _sum?: RepoSumAggregateInputType
    _min?: RepoMinAggregateInputType
    _max?: RepoMaxAggregateInputType
  }

  export type RepoGroupByOutputType = {
    id: number
    name: string | null
    userId: string
    _count: RepoCountAggregateOutputType | null
    _avg: RepoAvgAggregateOutputType | null
    _sum: RepoSumAggregateOutputType | null
    _min: RepoMinAggregateOutputType | null
    _max: RepoMaxAggregateOutputType | null
  }

  type GetRepoGroupByPayload<T extends RepoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepoGroupByOutputType[P]>
            : GetScalarType<T[P], RepoGroupByOutputType[P]>
        }
      >
    >


  export type RepoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    memoirs?: boolean | Repo$memoirsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | RepoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repo"]>

  export type RepoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repo"]>

  export type RepoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repo"]>

  export type RepoSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
  }

  export type RepoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId", ExtArgs["result"]["repo"]>
  export type RepoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirs?: boolean | Repo$memoirsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | RepoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RepoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RepoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Repo"
    objects: {
      memoirs: Prisma.$MemoirPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      userId: string
    }, ExtArgs["result"]["repo"]>
    composites: {}
  }

  type RepoGetPayload<S extends boolean | null | undefined | RepoDefaultArgs> = $Result.GetResult<Prisma.$RepoPayload, S>

  type RepoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepoCountAggregateInputType | true
    }

  export interface RepoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Repo'], meta: { name: 'Repo' } }
    /**
     * Find zero or one Repo that matches the filter.
     * @param {RepoFindUniqueArgs} args - Arguments to find a Repo
     * @example
     * // Get one Repo
     * const repo = await prisma.repo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepoFindUniqueArgs>(args: SelectSubset<T, RepoFindUniqueArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Repo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepoFindUniqueOrThrowArgs} args - Arguments to find a Repo
     * @example
     * // Get one Repo
     * const repo = await prisma.repo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepoFindUniqueOrThrowArgs>(args: SelectSubset<T, RepoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoFindFirstArgs} args - Arguments to find a Repo
     * @example
     * // Get one Repo
     * const repo = await prisma.repo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepoFindFirstArgs>(args?: SelectSubset<T, RepoFindFirstArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoFindFirstOrThrowArgs} args - Arguments to find a Repo
     * @example
     * // Get one Repo
     * const repo = await prisma.repo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepoFindFirstOrThrowArgs>(args?: SelectSubset<T, RepoFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Repos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repos
     * const repos = await prisma.repo.findMany()
     * 
     * // Get first 10 Repos
     * const repos = await prisma.repo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repoWithIdOnly = await prisma.repo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepoFindManyArgs>(args?: SelectSubset<T, RepoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Repo.
     * @param {RepoCreateArgs} args - Arguments to create a Repo.
     * @example
     * // Create one Repo
     * const Repo = await prisma.repo.create({
     *   data: {
     *     // ... data to create a Repo
     *   }
     * })
     * 
     */
    create<T extends RepoCreateArgs>(args: SelectSubset<T, RepoCreateArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Repos.
     * @param {RepoCreateManyArgs} args - Arguments to create many Repos.
     * @example
     * // Create many Repos
     * const repo = await prisma.repo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepoCreateManyArgs>(args?: SelectSubset<T, RepoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Repos and returns the data saved in the database.
     * @param {RepoCreateManyAndReturnArgs} args - Arguments to create many Repos.
     * @example
     * // Create many Repos
     * const repo = await prisma.repo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Repos and only return the `id`
     * const repoWithIdOnly = await prisma.repo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepoCreateManyAndReturnArgs>(args?: SelectSubset<T, RepoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Repo.
     * @param {RepoDeleteArgs} args - Arguments to delete one Repo.
     * @example
     * // Delete one Repo
     * const Repo = await prisma.repo.delete({
     *   where: {
     *     // ... filter to delete one Repo
     *   }
     * })
     * 
     */
    delete<T extends RepoDeleteArgs>(args: SelectSubset<T, RepoDeleteArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Repo.
     * @param {RepoUpdateArgs} args - Arguments to update one Repo.
     * @example
     * // Update one Repo
     * const repo = await prisma.repo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepoUpdateArgs>(args: SelectSubset<T, RepoUpdateArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Repos.
     * @param {RepoDeleteManyArgs} args - Arguments to filter Repos to delete.
     * @example
     * // Delete a few Repos
     * const { count } = await prisma.repo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepoDeleteManyArgs>(args?: SelectSubset<T, RepoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repos
     * const repo = await prisma.repo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepoUpdateManyArgs>(args: SelectSubset<T, RepoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repos and returns the data updated in the database.
     * @param {RepoUpdateManyAndReturnArgs} args - Arguments to update many Repos.
     * @example
     * // Update many Repos
     * const repo = await prisma.repo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Repos and only return the `id`
     * const repoWithIdOnly = await prisma.repo.updateManyAndReturn({
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
    updateManyAndReturn<T extends RepoUpdateManyAndReturnArgs>(args: SelectSubset<T, RepoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Repo.
     * @param {RepoUpsertArgs} args - Arguments to update or create a Repo.
     * @example
     * // Update or create a Repo
     * const repo = await prisma.repo.upsert({
     *   create: {
     *     // ... data to create a Repo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repo we want to update
     *   }
     * })
     */
    upsert<T extends RepoUpsertArgs>(args: SelectSubset<T, RepoUpsertArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Repos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoCountArgs} args - Arguments to filter Repos to count.
     * @example
     * // Count the number of Repos
     * const count = await prisma.repo.count({
     *   where: {
     *     // ... the filter for the Repos we want to count
     *   }
     * })
    **/
    count<T extends RepoCountArgs>(
      args?: Subset<T, RepoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Repo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RepoAggregateArgs>(args: Subset<T, RepoAggregateArgs>): Prisma.PrismaPromise<GetRepoAggregateType<T>>

    /**
     * Group by Repo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepoGroupByArgs} args - Group by arguments.
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
      T extends RepoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepoGroupByArgs['orderBy'] }
        : { orderBy?: RepoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RepoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Repo model
   */
  readonly fields: RepoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memoirs<T extends Repo$memoirsArgs<ExtArgs> = {}>(args?: Subset<T, Repo$memoirsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Repo model
   */
  interface RepoFieldRefs {
    readonly id: FieldRef<"Repo", 'Int'>
    readonly name: FieldRef<"Repo", 'String'>
    readonly userId: FieldRef<"Repo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Repo findUnique
   */
  export type RepoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * Filter, which Repo to fetch.
     */
    where: RepoWhereUniqueInput
  }

  /**
   * Repo findUniqueOrThrow
   */
  export type RepoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * Filter, which Repo to fetch.
     */
    where: RepoWhereUniqueInput
  }

  /**
   * Repo findFirst
   */
  export type RepoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * Filter, which Repo to fetch.
     */
    where?: RepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repos to fetch.
     */
    orderBy?: RepoOrderByWithRelationInput | RepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repos.
     */
    cursor?: RepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repos.
     */
    distinct?: RepoScalarFieldEnum | RepoScalarFieldEnum[]
  }

  /**
   * Repo findFirstOrThrow
   */
  export type RepoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * Filter, which Repo to fetch.
     */
    where?: RepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repos to fetch.
     */
    orderBy?: RepoOrderByWithRelationInput | RepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repos.
     */
    cursor?: RepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repos.
     */
    distinct?: RepoScalarFieldEnum | RepoScalarFieldEnum[]
  }

  /**
   * Repo findMany
   */
  export type RepoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * Filter, which Repos to fetch.
     */
    where?: RepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repos to fetch.
     */
    orderBy?: RepoOrderByWithRelationInput | RepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Repos.
     */
    cursor?: RepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repos.
     */
    skip?: number
    distinct?: RepoScalarFieldEnum | RepoScalarFieldEnum[]
  }

  /**
   * Repo create
   */
  export type RepoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * The data needed to create a Repo.
     */
    data: XOR<RepoCreateInput, RepoUncheckedCreateInput>
  }

  /**
   * Repo createMany
   */
  export type RepoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Repos.
     */
    data: RepoCreateManyInput | RepoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Repo createManyAndReturn
   */
  export type RepoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * The data used to create many Repos.
     */
    data: RepoCreateManyInput | RepoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repo update
   */
  export type RepoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * The data needed to update a Repo.
     */
    data: XOR<RepoUpdateInput, RepoUncheckedUpdateInput>
    /**
     * Choose, which Repo to update.
     */
    where: RepoWhereUniqueInput
  }

  /**
   * Repo updateMany
   */
  export type RepoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Repos.
     */
    data: XOR<RepoUpdateManyMutationInput, RepoUncheckedUpdateManyInput>
    /**
     * Filter which Repos to update
     */
    where?: RepoWhereInput
    /**
     * Limit how many Repos to update.
     */
    limit?: number
  }

  /**
   * Repo updateManyAndReturn
   */
  export type RepoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * The data used to update Repos.
     */
    data: XOR<RepoUpdateManyMutationInput, RepoUncheckedUpdateManyInput>
    /**
     * Filter which Repos to update
     */
    where?: RepoWhereInput
    /**
     * Limit how many Repos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repo upsert
   */
  export type RepoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * The filter to search for the Repo to update in case it exists.
     */
    where: RepoWhereUniqueInput
    /**
     * In case the Repo found by the `where` argument doesn't exist, create a new Repo with this data.
     */
    create: XOR<RepoCreateInput, RepoUncheckedCreateInput>
    /**
     * In case the Repo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepoUpdateInput, RepoUncheckedUpdateInput>
  }

  /**
   * Repo delete
   */
  export type RepoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    /**
     * Filter which Repo to delete.
     */
    where: RepoWhereUniqueInput
  }

  /**
   * Repo deleteMany
   */
  export type RepoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repos to delete
     */
    where?: RepoWhereInput
    /**
     * Limit how many Repos to delete.
     */
    limit?: number
  }

  /**
   * Repo.memoirs
   */
  export type Repo$memoirsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    where?: MemoirWhereInput
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    cursor?: MemoirWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoirScalarFieldEnum | MemoirScalarFieldEnum[]
  }

  /**
   * Repo without action
   */
  export type RepoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
  }


  /**
   * Model Memoir
   */

  export type AggregateMemoir = {
    _count: MemoirCountAggregateOutputType | null
    _avg: MemoirAvgAggregateOutputType | null
    _sum: MemoirSumAggregateOutputType | null
    _min: MemoirMinAggregateOutputType | null
    _max: MemoirMaxAggregateOutputType | null
  }

  export type MemoirAvgAggregateOutputType = {
    id: number | null
    typeId: number | null
    repoId: number | null
  }

  export type MemoirSumAggregateOutputType = {
    id: number | null
    typeId: number | null
    repoId: number | null
  }

  export type MemoirMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    source: string | null
    aiSum: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    typeId: number | null
    repoId: number | null
  }

  export type MemoirMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    source: string | null
    aiSum: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    typeId: number | null
    repoId: number | null
  }

  export type MemoirCountAggregateOutputType = {
    id: number
    title: number
    content: number
    source: number
    aiSum: number
    createdAt: number
    updatedAt: number
    userId: number
    typeId: number
    repoId: number
    _all: number
  }


  export type MemoirAvgAggregateInputType = {
    id?: true
    typeId?: true
    repoId?: true
  }

  export type MemoirSumAggregateInputType = {
    id?: true
    typeId?: true
    repoId?: true
  }

  export type MemoirMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    source?: true
    aiSum?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    typeId?: true
    repoId?: true
  }

  export type MemoirMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    source?: true
    aiSum?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    typeId?: true
    repoId?: true
  }

  export type MemoirCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    source?: true
    aiSum?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    typeId?: true
    repoId?: true
    _all?: true
  }

  export type MemoirAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memoir to aggregate.
     */
    where?: MemoirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memoirs to fetch.
     */
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memoirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memoirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memoirs
    **/
    _count?: true | MemoirCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoirAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoirSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoirMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoirMaxAggregateInputType
  }

  export type GetMemoirAggregateType<T extends MemoirAggregateArgs> = {
        [P in keyof T & keyof AggregateMemoir]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemoir[P]>
      : GetScalarType<T[P], AggregateMemoir[P]>
  }




  export type MemoirGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirWhereInput
    orderBy?: MemoirOrderByWithAggregationInput | MemoirOrderByWithAggregationInput[]
    by: MemoirScalarFieldEnum[] | MemoirScalarFieldEnum
    having?: MemoirScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoirCountAggregateInputType | true
    _avg?: MemoirAvgAggregateInputType
    _sum?: MemoirSumAggregateInputType
    _min?: MemoirMinAggregateInputType
    _max?: MemoirMaxAggregateInputType
  }

  export type MemoirGroupByOutputType = {
    id: number
    title: string
    content: string
    source: string
    aiSum: string | null
    createdAt: Date
    updatedAt: Date | null
    userId: string
    typeId: number
    repoId: number
    _count: MemoirCountAggregateOutputType | null
    _avg: MemoirAvgAggregateOutputType | null
    _sum: MemoirSumAggregateOutputType | null
    _min: MemoirMinAggregateOutputType | null
    _max: MemoirMaxAggregateOutputType | null
  }

  type GetMemoirGroupByPayload<T extends MemoirGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoirGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoirGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoirGroupByOutputType[P]>
            : GetScalarType<T[P], MemoirGroupByOutputType[P]>
        }
      >
    >


  export type MemoirSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    aiSum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    typeId?: boolean
    repoId?: boolean
    repo?: boolean | RepoDefaultArgs<ExtArgs>
    type?: boolean | MemoirTypeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Memoir$tagsArgs<ExtArgs>
    _count?: boolean | MemoirCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoir"]>

  export type MemoirSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    aiSum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    typeId?: boolean
    repoId?: boolean
    repo?: boolean | RepoDefaultArgs<ExtArgs>
    type?: boolean | MemoirTypeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoir"]>

  export type MemoirSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    aiSum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    typeId?: boolean
    repoId?: boolean
    repo?: boolean | RepoDefaultArgs<ExtArgs>
    type?: boolean | MemoirTypeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoir"]>

  export type MemoirSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    aiSum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    typeId?: boolean
    repoId?: boolean
  }

  export type MemoirOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "source" | "aiSum" | "createdAt" | "updatedAt" | "userId" | "typeId" | "repoId", ExtArgs["result"]["memoir"]>
  export type MemoirInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repo?: boolean | RepoDefaultArgs<ExtArgs>
    type?: boolean | MemoirTypeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Memoir$tagsArgs<ExtArgs>
    _count?: boolean | MemoirCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemoirIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repo?: boolean | RepoDefaultArgs<ExtArgs>
    type?: boolean | MemoirTypeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MemoirIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repo?: boolean | RepoDefaultArgs<ExtArgs>
    type?: boolean | MemoirTypeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MemoirPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Memoir"
    objects: {
      repo: Prisma.$RepoPayload<ExtArgs>
      type: Prisma.$MemoirTypePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      tags: Prisma.$MemoirTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      source: string
      aiSum: string | null
      createdAt: Date
      updatedAt: Date | null
      userId: string
      typeId: number
      repoId: number
    }, ExtArgs["result"]["memoir"]>
    composites: {}
  }

  type MemoirGetPayload<S extends boolean | null | undefined | MemoirDefaultArgs> = $Result.GetResult<Prisma.$MemoirPayload, S>

  type MemoirCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoirFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoirCountAggregateInputType | true
    }

  export interface MemoirDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Memoir'], meta: { name: 'Memoir' } }
    /**
     * Find zero or one Memoir that matches the filter.
     * @param {MemoirFindUniqueArgs} args - Arguments to find a Memoir
     * @example
     * // Get one Memoir
     * const memoir = await prisma.memoir.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoirFindUniqueArgs>(args: SelectSubset<T, MemoirFindUniqueArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Memoir that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoirFindUniqueOrThrowArgs} args - Arguments to find a Memoir
     * @example
     * // Get one Memoir
     * const memoir = await prisma.memoir.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoirFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoirFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memoir that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirFindFirstArgs} args - Arguments to find a Memoir
     * @example
     * // Get one Memoir
     * const memoir = await prisma.memoir.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoirFindFirstArgs>(args?: SelectSubset<T, MemoirFindFirstArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memoir that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirFindFirstOrThrowArgs} args - Arguments to find a Memoir
     * @example
     * // Get one Memoir
     * const memoir = await prisma.memoir.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoirFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoirFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memoirs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memoirs
     * const memoirs = await prisma.memoir.findMany()
     * 
     * // Get first 10 Memoirs
     * const memoirs = await prisma.memoir.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memoirWithIdOnly = await prisma.memoir.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemoirFindManyArgs>(args?: SelectSubset<T, MemoirFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Memoir.
     * @param {MemoirCreateArgs} args - Arguments to create a Memoir.
     * @example
     * // Create one Memoir
     * const Memoir = await prisma.memoir.create({
     *   data: {
     *     // ... data to create a Memoir
     *   }
     * })
     * 
     */
    create<T extends MemoirCreateArgs>(args: SelectSubset<T, MemoirCreateArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memoirs.
     * @param {MemoirCreateManyArgs} args - Arguments to create many Memoirs.
     * @example
     * // Create many Memoirs
     * const memoir = await prisma.memoir.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoirCreateManyArgs>(args?: SelectSubset<T, MemoirCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memoirs and returns the data saved in the database.
     * @param {MemoirCreateManyAndReturnArgs} args - Arguments to create many Memoirs.
     * @example
     * // Create many Memoirs
     * const memoir = await prisma.memoir.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memoirs and only return the `id`
     * const memoirWithIdOnly = await prisma.memoir.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoirCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoirCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Memoir.
     * @param {MemoirDeleteArgs} args - Arguments to delete one Memoir.
     * @example
     * // Delete one Memoir
     * const Memoir = await prisma.memoir.delete({
     *   where: {
     *     // ... filter to delete one Memoir
     *   }
     * })
     * 
     */
    delete<T extends MemoirDeleteArgs>(args: SelectSubset<T, MemoirDeleteArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Memoir.
     * @param {MemoirUpdateArgs} args - Arguments to update one Memoir.
     * @example
     * // Update one Memoir
     * const memoir = await prisma.memoir.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoirUpdateArgs>(args: SelectSubset<T, MemoirUpdateArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memoirs.
     * @param {MemoirDeleteManyArgs} args - Arguments to filter Memoirs to delete.
     * @example
     * // Delete a few Memoirs
     * const { count } = await prisma.memoir.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoirDeleteManyArgs>(args?: SelectSubset<T, MemoirDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memoirs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memoirs
     * const memoir = await prisma.memoir.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoirUpdateManyArgs>(args: SelectSubset<T, MemoirUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memoirs and returns the data updated in the database.
     * @param {MemoirUpdateManyAndReturnArgs} args - Arguments to update many Memoirs.
     * @example
     * // Update many Memoirs
     * const memoir = await prisma.memoir.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Memoirs and only return the `id`
     * const memoirWithIdOnly = await prisma.memoir.updateManyAndReturn({
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
    updateManyAndReturn<T extends MemoirUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoirUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Memoir.
     * @param {MemoirUpsertArgs} args - Arguments to update or create a Memoir.
     * @example
     * // Update or create a Memoir
     * const memoir = await prisma.memoir.upsert({
     *   create: {
     *     // ... data to create a Memoir
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Memoir we want to update
     *   }
     * })
     */
    upsert<T extends MemoirUpsertArgs>(args: SelectSubset<T, MemoirUpsertArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memoirs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirCountArgs} args - Arguments to filter Memoirs to count.
     * @example
     * // Count the number of Memoirs
     * const count = await prisma.memoir.count({
     *   where: {
     *     // ... the filter for the Memoirs we want to count
     *   }
     * })
    **/
    count<T extends MemoirCountArgs>(
      args?: Subset<T, MemoirCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoirCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Memoir.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MemoirAggregateArgs>(args: Subset<T, MemoirAggregateArgs>): Prisma.PrismaPromise<GetMemoirAggregateType<T>>

    /**
     * Group by Memoir.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirGroupByArgs} args - Group by arguments.
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
      T extends MemoirGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoirGroupByArgs['orderBy'] }
        : { orderBy?: MemoirGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MemoirGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoirGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Memoir model
   */
  readonly fields: MemoirFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Memoir.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoirClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repo<T extends RepoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepoDefaultArgs<ExtArgs>>): Prisma__RepoClient<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    type<T extends MemoirTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemoirTypeDefaultArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends Memoir$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Memoir$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Memoir model
   */
  interface MemoirFieldRefs {
    readonly id: FieldRef<"Memoir", 'Int'>
    readonly title: FieldRef<"Memoir", 'String'>
    readonly content: FieldRef<"Memoir", 'String'>
    readonly source: FieldRef<"Memoir", 'String'>
    readonly aiSum: FieldRef<"Memoir", 'String'>
    readonly createdAt: FieldRef<"Memoir", 'DateTime'>
    readonly updatedAt: FieldRef<"Memoir", 'DateTime'>
    readonly userId: FieldRef<"Memoir", 'String'>
    readonly typeId: FieldRef<"Memoir", 'Int'>
    readonly repoId: FieldRef<"Memoir", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Memoir findUnique
   */
  export type MemoirFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * Filter, which Memoir to fetch.
     */
    where: MemoirWhereUniqueInput
  }

  /**
   * Memoir findUniqueOrThrow
   */
  export type MemoirFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * Filter, which Memoir to fetch.
     */
    where: MemoirWhereUniqueInput
  }

  /**
   * Memoir findFirst
   */
  export type MemoirFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * Filter, which Memoir to fetch.
     */
    where?: MemoirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memoirs to fetch.
     */
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memoirs.
     */
    cursor?: MemoirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memoirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memoirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memoirs.
     */
    distinct?: MemoirScalarFieldEnum | MemoirScalarFieldEnum[]
  }

  /**
   * Memoir findFirstOrThrow
   */
  export type MemoirFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * Filter, which Memoir to fetch.
     */
    where?: MemoirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memoirs to fetch.
     */
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memoirs.
     */
    cursor?: MemoirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memoirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memoirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memoirs.
     */
    distinct?: MemoirScalarFieldEnum | MemoirScalarFieldEnum[]
  }

  /**
   * Memoir findMany
   */
  export type MemoirFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * Filter, which Memoirs to fetch.
     */
    where?: MemoirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memoirs to fetch.
     */
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memoirs.
     */
    cursor?: MemoirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memoirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memoirs.
     */
    skip?: number
    distinct?: MemoirScalarFieldEnum | MemoirScalarFieldEnum[]
  }

  /**
   * Memoir create
   */
  export type MemoirCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * The data needed to create a Memoir.
     */
    data: XOR<MemoirCreateInput, MemoirUncheckedCreateInput>
  }

  /**
   * Memoir createMany
   */
  export type MemoirCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memoirs.
     */
    data: MemoirCreateManyInput | MemoirCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Memoir createManyAndReturn
   */
  export type MemoirCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * The data used to create many Memoirs.
     */
    data: MemoirCreateManyInput | MemoirCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Memoir update
   */
  export type MemoirUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * The data needed to update a Memoir.
     */
    data: XOR<MemoirUpdateInput, MemoirUncheckedUpdateInput>
    /**
     * Choose, which Memoir to update.
     */
    where: MemoirWhereUniqueInput
  }

  /**
   * Memoir updateMany
   */
  export type MemoirUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memoirs.
     */
    data: XOR<MemoirUpdateManyMutationInput, MemoirUncheckedUpdateManyInput>
    /**
     * Filter which Memoirs to update
     */
    where?: MemoirWhereInput
    /**
     * Limit how many Memoirs to update.
     */
    limit?: number
  }

  /**
   * Memoir updateManyAndReturn
   */
  export type MemoirUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * The data used to update Memoirs.
     */
    data: XOR<MemoirUpdateManyMutationInput, MemoirUncheckedUpdateManyInput>
    /**
     * Filter which Memoirs to update
     */
    where?: MemoirWhereInput
    /**
     * Limit how many Memoirs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Memoir upsert
   */
  export type MemoirUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * The filter to search for the Memoir to update in case it exists.
     */
    where: MemoirWhereUniqueInput
    /**
     * In case the Memoir found by the `where` argument doesn't exist, create a new Memoir with this data.
     */
    create: XOR<MemoirCreateInput, MemoirUncheckedCreateInput>
    /**
     * In case the Memoir was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoirUpdateInput, MemoirUncheckedUpdateInput>
  }

  /**
   * Memoir delete
   */
  export type MemoirDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    /**
     * Filter which Memoir to delete.
     */
    where: MemoirWhereUniqueInput
  }

  /**
   * Memoir deleteMany
   */
  export type MemoirDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memoirs to delete
     */
    where?: MemoirWhereInput
    /**
     * Limit how many Memoirs to delete.
     */
    limit?: number
  }

  /**
   * Memoir.tags
   */
  export type Memoir$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    where?: MemoirTagWhereInput
    orderBy?: MemoirTagOrderByWithRelationInput | MemoirTagOrderByWithRelationInput[]
    cursor?: MemoirTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoirTagScalarFieldEnum | MemoirTagScalarFieldEnum[]
  }

  /**
   * Memoir without action
   */
  export type MemoirDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
  }


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
    username: string | null
    profileUrl: string | null
    createdAt: Date | null
    deletedAt: Date | null
    githubId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    profileUrl: string | null
    createdAt: Date | null
    deletedAt: Date | null
    githubId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    profileUrl: number
    createdAt: number
    deletedAt: number
    githubId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    profileUrl?: true
    createdAt?: true
    deletedAt?: true
    githubId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    profileUrl?: true
    createdAt?: true
    deletedAt?: true
    githubId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    profileUrl?: true
    createdAt?: true
    deletedAt?: true
    githubId?: true
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
    username: string
    profileUrl: string | null
    createdAt: Date
    deletedAt: Date | null
    githubId: string
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
    username?: boolean
    profileUrl?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    githubId?: boolean
    memoirs?: boolean | User$memoirsArgs<ExtArgs>
    repos?: boolean | User$reposArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    profileUrl?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    githubId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    profileUrl?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    githubId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    profileUrl?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    githubId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "profileUrl" | "createdAt" | "deletedAt" | "githubId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirs?: boolean | User$memoirsArgs<ExtArgs>
    repos?: boolean | User$reposArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memoirs: Prisma.$MemoirPayload<ExtArgs>[]
      repos: Prisma.$RepoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      profileUrl: string | null
      createdAt: Date
      deletedAt: Date | null
      githubId: string
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
    memoirs<T extends User$memoirsArgs<ExtArgs> = {}>(args?: Subset<T, User$memoirsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repos<T extends User$reposArgs<ExtArgs> = {}>(args?: Subset<T, User$reposArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly username: FieldRef<"User", 'String'>
    readonly profileUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly githubId: FieldRef<"User", 'String'>
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
   * User.memoirs
   */
  export type User$memoirsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    where?: MemoirWhereInput
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    cursor?: MemoirWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoirScalarFieldEnum | MemoirScalarFieldEnum[]
  }

  /**
   * User.repos
   */
  export type User$reposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repo
     */
    select?: RepoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repo
     */
    omit?: RepoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepoInclude<ExtArgs> | null
    where?: RepoWhereInput
    orderBy?: RepoOrderByWithRelationInput | RepoOrderByWithRelationInput[]
    cursor?: RepoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepoScalarFieldEnum | RepoScalarFieldEnum[]
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
   * Model MemoirType
   */

  export type AggregateMemoirType = {
    _count: MemoirTypeCountAggregateOutputType | null
    _avg: MemoirTypeAvgAggregateOutputType | null
    _sum: MemoirTypeSumAggregateOutputType | null
    _min: MemoirTypeMinAggregateOutputType | null
    _max: MemoirTypeMaxAggregateOutputType | null
  }

  export type MemoirTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type MemoirTypeSumAggregateOutputType = {
    id: number | null
  }

  export type MemoirTypeMinAggregateOutputType = {
    id: number | null
    type: string | null
  }

  export type MemoirTypeMaxAggregateOutputType = {
    id: number | null
    type: string | null
  }

  export type MemoirTypeCountAggregateOutputType = {
    id: number
    type: number
    _all: number
  }


  export type MemoirTypeAvgAggregateInputType = {
    id?: true
  }

  export type MemoirTypeSumAggregateInputType = {
    id?: true
  }

  export type MemoirTypeMinAggregateInputType = {
    id?: true
    type?: true
  }

  export type MemoirTypeMaxAggregateInputType = {
    id?: true
    type?: true
  }

  export type MemoirTypeCountAggregateInputType = {
    id?: true
    type?: true
    _all?: true
  }

  export type MemoirTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoirType to aggregate.
     */
    where?: MemoirTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTypes to fetch.
     */
    orderBy?: MemoirTypeOrderByWithRelationInput | MemoirTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoirTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemoirTypes
    **/
    _count?: true | MemoirTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoirTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoirTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoirTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoirTypeMaxAggregateInputType
  }

  export type GetMemoirTypeAggregateType<T extends MemoirTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateMemoirType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemoirType[P]>
      : GetScalarType<T[P], AggregateMemoirType[P]>
  }




  export type MemoirTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirTypeWhereInput
    orderBy?: MemoirTypeOrderByWithAggregationInput | MemoirTypeOrderByWithAggregationInput[]
    by: MemoirTypeScalarFieldEnum[] | MemoirTypeScalarFieldEnum
    having?: MemoirTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoirTypeCountAggregateInputType | true
    _avg?: MemoirTypeAvgAggregateInputType
    _sum?: MemoirTypeSumAggregateInputType
    _min?: MemoirTypeMinAggregateInputType
    _max?: MemoirTypeMaxAggregateInputType
  }

  export type MemoirTypeGroupByOutputType = {
    id: number
    type: string
    _count: MemoirTypeCountAggregateOutputType | null
    _avg: MemoirTypeAvgAggregateOutputType | null
    _sum: MemoirTypeSumAggregateOutputType | null
    _min: MemoirTypeMinAggregateOutputType | null
    _max: MemoirTypeMaxAggregateOutputType | null
  }

  type GetMemoirTypeGroupByPayload<T extends MemoirTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoirTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoirTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoirTypeGroupByOutputType[P]>
            : GetScalarType<T[P], MemoirTypeGroupByOutputType[P]>
        }
      >
    >


  export type MemoirTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    memoirs?: boolean | MemoirType$memoirsArgs<ExtArgs>
    _count?: boolean | MemoirTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoirType"]>

  export type MemoirTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
  }, ExtArgs["result"]["memoirType"]>

  export type MemoirTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
  }, ExtArgs["result"]["memoirType"]>

  export type MemoirTypeSelectScalar = {
    id?: boolean
    type?: boolean
  }

  export type MemoirTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type", ExtArgs["result"]["memoirType"]>
  export type MemoirTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirs?: boolean | MemoirType$memoirsArgs<ExtArgs>
    _count?: boolean | MemoirTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemoirTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MemoirTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MemoirTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemoirType"
    objects: {
      memoirs: Prisma.$MemoirPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
    }, ExtArgs["result"]["memoirType"]>
    composites: {}
  }

  type MemoirTypeGetPayload<S extends boolean | null | undefined | MemoirTypeDefaultArgs> = $Result.GetResult<Prisma.$MemoirTypePayload, S>

  type MemoirTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoirTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoirTypeCountAggregateInputType | true
    }

  export interface MemoirTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemoirType'], meta: { name: 'MemoirType' } }
    /**
     * Find zero or one MemoirType that matches the filter.
     * @param {MemoirTypeFindUniqueArgs} args - Arguments to find a MemoirType
     * @example
     * // Get one MemoirType
     * const memoirType = await prisma.memoirType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoirTypeFindUniqueArgs>(args: SelectSubset<T, MemoirTypeFindUniqueArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemoirType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoirTypeFindUniqueOrThrowArgs} args - Arguments to find a MemoirType
     * @example
     * // Get one MemoirType
     * const memoirType = await prisma.memoirType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoirTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoirTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoirType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeFindFirstArgs} args - Arguments to find a MemoirType
     * @example
     * // Get one MemoirType
     * const memoirType = await prisma.memoirType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoirTypeFindFirstArgs>(args?: SelectSubset<T, MemoirTypeFindFirstArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoirType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeFindFirstOrThrowArgs} args - Arguments to find a MemoirType
     * @example
     * // Get one MemoirType
     * const memoirType = await prisma.memoirType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoirTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoirTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemoirTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemoirTypes
     * const memoirTypes = await prisma.memoirType.findMany()
     * 
     * // Get first 10 MemoirTypes
     * const memoirTypes = await prisma.memoirType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memoirTypeWithIdOnly = await prisma.memoirType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemoirTypeFindManyArgs>(args?: SelectSubset<T, MemoirTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemoirType.
     * @param {MemoirTypeCreateArgs} args - Arguments to create a MemoirType.
     * @example
     * // Create one MemoirType
     * const MemoirType = await prisma.memoirType.create({
     *   data: {
     *     // ... data to create a MemoirType
     *   }
     * })
     * 
     */
    create<T extends MemoirTypeCreateArgs>(args: SelectSubset<T, MemoirTypeCreateArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemoirTypes.
     * @param {MemoirTypeCreateManyArgs} args - Arguments to create many MemoirTypes.
     * @example
     * // Create many MemoirTypes
     * const memoirType = await prisma.memoirType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoirTypeCreateManyArgs>(args?: SelectSubset<T, MemoirTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemoirTypes and returns the data saved in the database.
     * @param {MemoirTypeCreateManyAndReturnArgs} args - Arguments to create many MemoirTypes.
     * @example
     * // Create many MemoirTypes
     * const memoirType = await prisma.memoirType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemoirTypes and only return the `id`
     * const memoirTypeWithIdOnly = await prisma.memoirType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoirTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoirTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemoirType.
     * @param {MemoirTypeDeleteArgs} args - Arguments to delete one MemoirType.
     * @example
     * // Delete one MemoirType
     * const MemoirType = await prisma.memoirType.delete({
     *   where: {
     *     // ... filter to delete one MemoirType
     *   }
     * })
     * 
     */
    delete<T extends MemoirTypeDeleteArgs>(args: SelectSubset<T, MemoirTypeDeleteArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemoirType.
     * @param {MemoirTypeUpdateArgs} args - Arguments to update one MemoirType.
     * @example
     * // Update one MemoirType
     * const memoirType = await prisma.memoirType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoirTypeUpdateArgs>(args: SelectSubset<T, MemoirTypeUpdateArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemoirTypes.
     * @param {MemoirTypeDeleteManyArgs} args - Arguments to filter MemoirTypes to delete.
     * @example
     * // Delete a few MemoirTypes
     * const { count } = await prisma.memoirType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoirTypeDeleteManyArgs>(args?: SelectSubset<T, MemoirTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoirTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemoirTypes
     * const memoirType = await prisma.memoirType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoirTypeUpdateManyArgs>(args: SelectSubset<T, MemoirTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoirTypes and returns the data updated in the database.
     * @param {MemoirTypeUpdateManyAndReturnArgs} args - Arguments to update many MemoirTypes.
     * @example
     * // Update many MemoirTypes
     * const memoirType = await prisma.memoirType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemoirTypes and only return the `id`
     * const memoirTypeWithIdOnly = await prisma.memoirType.updateManyAndReturn({
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
    updateManyAndReturn<T extends MemoirTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoirTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemoirType.
     * @param {MemoirTypeUpsertArgs} args - Arguments to update or create a MemoirType.
     * @example
     * // Update or create a MemoirType
     * const memoirType = await prisma.memoirType.upsert({
     *   create: {
     *     // ... data to create a MemoirType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemoirType we want to update
     *   }
     * })
     */
    upsert<T extends MemoirTypeUpsertArgs>(args: SelectSubset<T, MemoirTypeUpsertArgs<ExtArgs>>): Prisma__MemoirTypeClient<$Result.GetResult<Prisma.$MemoirTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemoirTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeCountArgs} args - Arguments to filter MemoirTypes to count.
     * @example
     * // Count the number of MemoirTypes
     * const count = await prisma.memoirType.count({
     *   where: {
     *     // ... the filter for the MemoirTypes we want to count
     *   }
     * })
    **/
    count<T extends MemoirTypeCountArgs>(
      args?: Subset<T, MemoirTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoirTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemoirType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MemoirTypeAggregateArgs>(args: Subset<T, MemoirTypeAggregateArgs>): Prisma.PrismaPromise<GetMemoirTypeAggregateType<T>>

    /**
     * Group by MemoirType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTypeGroupByArgs} args - Group by arguments.
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
      T extends MemoirTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoirTypeGroupByArgs['orderBy'] }
        : { orderBy?: MemoirTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MemoirTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoirTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemoirType model
   */
  readonly fields: MemoirTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemoirType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoirTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memoirs<T extends MemoirType$memoirsArgs<ExtArgs> = {}>(args?: Subset<T, MemoirType$memoirsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MemoirType model
   */
  interface MemoirTypeFieldRefs {
    readonly id: FieldRef<"MemoirType", 'Int'>
    readonly type: FieldRef<"MemoirType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MemoirType findUnique
   */
  export type MemoirTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * Filter, which MemoirType to fetch.
     */
    where: MemoirTypeWhereUniqueInput
  }

  /**
   * MemoirType findUniqueOrThrow
   */
  export type MemoirTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * Filter, which MemoirType to fetch.
     */
    where: MemoirTypeWhereUniqueInput
  }

  /**
   * MemoirType findFirst
   */
  export type MemoirTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * Filter, which MemoirType to fetch.
     */
    where?: MemoirTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTypes to fetch.
     */
    orderBy?: MemoirTypeOrderByWithRelationInput | MemoirTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoirTypes.
     */
    cursor?: MemoirTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoirTypes.
     */
    distinct?: MemoirTypeScalarFieldEnum | MemoirTypeScalarFieldEnum[]
  }

  /**
   * MemoirType findFirstOrThrow
   */
  export type MemoirTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * Filter, which MemoirType to fetch.
     */
    where?: MemoirTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTypes to fetch.
     */
    orderBy?: MemoirTypeOrderByWithRelationInput | MemoirTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoirTypes.
     */
    cursor?: MemoirTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoirTypes.
     */
    distinct?: MemoirTypeScalarFieldEnum | MemoirTypeScalarFieldEnum[]
  }

  /**
   * MemoirType findMany
   */
  export type MemoirTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * Filter, which MemoirTypes to fetch.
     */
    where?: MemoirTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTypes to fetch.
     */
    orderBy?: MemoirTypeOrderByWithRelationInput | MemoirTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemoirTypes.
     */
    cursor?: MemoirTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTypes.
     */
    skip?: number
    distinct?: MemoirTypeScalarFieldEnum | MemoirTypeScalarFieldEnum[]
  }

  /**
   * MemoirType create
   */
  export type MemoirTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a MemoirType.
     */
    data: XOR<MemoirTypeCreateInput, MemoirTypeUncheckedCreateInput>
  }

  /**
   * MemoirType createMany
   */
  export type MemoirTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemoirTypes.
     */
    data: MemoirTypeCreateManyInput | MemoirTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemoirType createManyAndReturn
   */
  export type MemoirTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * The data used to create many MemoirTypes.
     */
    data: MemoirTypeCreateManyInput | MemoirTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemoirType update
   */
  export type MemoirTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a MemoirType.
     */
    data: XOR<MemoirTypeUpdateInput, MemoirTypeUncheckedUpdateInput>
    /**
     * Choose, which MemoirType to update.
     */
    where: MemoirTypeWhereUniqueInput
  }

  /**
   * MemoirType updateMany
   */
  export type MemoirTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemoirTypes.
     */
    data: XOR<MemoirTypeUpdateManyMutationInput, MemoirTypeUncheckedUpdateManyInput>
    /**
     * Filter which MemoirTypes to update
     */
    where?: MemoirTypeWhereInput
    /**
     * Limit how many MemoirTypes to update.
     */
    limit?: number
  }

  /**
   * MemoirType updateManyAndReturn
   */
  export type MemoirTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * The data used to update MemoirTypes.
     */
    data: XOR<MemoirTypeUpdateManyMutationInput, MemoirTypeUncheckedUpdateManyInput>
    /**
     * Filter which MemoirTypes to update
     */
    where?: MemoirTypeWhereInput
    /**
     * Limit how many MemoirTypes to update.
     */
    limit?: number
  }

  /**
   * MemoirType upsert
   */
  export type MemoirTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the MemoirType to update in case it exists.
     */
    where: MemoirTypeWhereUniqueInput
    /**
     * In case the MemoirType found by the `where` argument doesn't exist, create a new MemoirType with this data.
     */
    create: XOR<MemoirTypeCreateInput, MemoirTypeUncheckedCreateInput>
    /**
     * In case the MemoirType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoirTypeUpdateInput, MemoirTypeUncheckedUpdateInput>
  }

  /**
   * MemoirType delete
   */
  export type MemoirTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
    /**
     * Filter which MemoirType to delete.
     */
    where: MemoirTypeWhereUniqueInput
  }

  /**
   * MemoirType deleteMany
   */
  export type MemoirTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoirTypes to delete
     */
    where?: MemoirTypeWhereInput
    /**
     * Limit how many MemoirTypes to delete.
     */
    limit?: number
  }

  /**
   * MemoirType.memoirs
   */
  export type MemoirType$memoirsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memoir
     */
    select?: MemoirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memoir
     */
    omit?: MemoirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirInclude<ExtArgs> | null
    where?: MemoirWhereInput
    orderBy?: MemoirOrderByWithRelationInput | MemoirOrderByWithRelationInput[]
    cursor?: MemoirWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoirScalarFieldEnum | MemoirScalarFieldEnum[]
  }

  /**
   * MemoirType without action
   */
  export type MemoirTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirType
     */
    select?: MemoirTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirType
     */
    omit?: MemoirTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTypeInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    memoirTags?: boolean | Tag$memoirTagsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoirTags?: boolean | Tag$memoirTagsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      memoirTags: Prisma.$MemoirTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
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
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
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
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memoirTags<T extends Tag$memoirTagsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$memoirTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.memoirTags
   */
  export type Tag$memoirTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    where?: MemoirTagWhereInput
    orderBy?: MemoirTagOrderByWithRelationInput | MemoirTagOrderByWithRelationInput[]
    cursor?: MemoirTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoirTagScalarFieldEnum | MemoirTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model MemoirTag
   */

  export type AggregateMemoirTag = {
    _count: MemoirTagCountAggregateOutputType | null
    _avg: MemoirTagAvgAggregateOutputType | null
    _sum: MemoirTagSumAggregateOutputType | null
    _min: MemoirTagMinAggregateOutputType | null
    _max: MemoirTagMaxAggregateOutputType | null
  }

  export type MemoirTagAvgAggregateOutputType = {
    memoirId: number | null
    tagId: number | null
  }

  export type MemoirTagSumAggregateOutputType = {
    memoirId: number | null
    tagId: number | null
  }

  export type MemoirTagMinAggregateOutputType = {
    memoirId: number | null
    tagId: number | null
  }

  export type MemoirTagMaxAggregateOutputType = {
    memoirId: number | null
    tagId: number | null
  }

  export type MemoirTagCountAggregateOutputType = {
    memoirId: number
    tagId: number
    _all: number
  }


  export type MemoirTagAvgAggregateInputType = {
    memoirId?: true
    tagId?: true
  }

  export type MemoirTagSumAggregateInputType = {
    memoirId?: true
    tagId?: true
  }

  export type MemoirTagMinAggregateInputType = {
    memoirId?: true
    tagId?: true
  }

  export type MemoirTagMaxAggregateInputType = {
    memoirId?: true
    tagId?: true
  }

  export type MemoirTagCountAggregateInputType = {
    memoirId?: true
    tagId?: true
    _all?: true
  }

  export type MemoirTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoirTag to aggregate.
     */
    where?: MemoirTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTags to fetch.
     */
    orderBy?: MemoirTagOrderByWithRelationInput | MemoirTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoirTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemoirTags
    **/
    _count?: true | MemoirTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoirTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoirTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoirTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoirTagMaxAggregateInputType
  }

  export type GetMemoirTagAggregateType<T extends MemoirTagAggregateArgs> = {
        [P in keyof T & keyof AggregateMemoirTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemoirTag[P]>
      : GetScalarType<T[P], AggregateMemoirTag[P]>
  }




  export type MemoirTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoirTagWhereInput
    orderBy?: MemoirTagOrderByWithAggregationInput | MemoirTagOrderByWithAggregationInput[]
    by: MemoirTagScalarFieldEnum[] | MemoirTagScalarFieldEnum
    having?: MemoirTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoirTagCountAggregateInputType | true
    _avg?: MemoirTagAvgAggregateInputType
    _sum?: MemoirTagSumAggregateInputType
    _min?: MemoirTagMinAggregateInputType
    _max?: MemoirTagMaxAggregateInputType
  }

  export type MemoirTagGroupByOutputType = {
    memoirId: number
    tagId: number
    _count: MemoirTagCountAggregateOutputType | null
    _avg: MemoirTagAvgAggregateOutputType | null
    _sum: MemoirTagSumAggregateOutputType | null
    _min: MemoirTagMinAggregateOutputType | null
    _max: MemoirTagMaxAggregateOutputType | null
  }

  type GetMemoirTagGroupByPayload<T extends MemoirTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoirTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoirTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoirTagGroupByOutputType[P]>
            : GetScalarType<T[P], MemoirTagGroupByOutputType[P]>
        }
      >
    >


  export type MemoirTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memoirId?: boolean
    tagId?: boolean
    memoir?: boolean | MemoirDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoirTag"]>

  export type MemoirTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memoirId?: boolean
    tagId?: boolean
    memoir?: boolean | MemoirDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoirTag"]>

  export type MemoirTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memoirId?: boolean
    tagId?: boolean
    memoir?: boolean | MemoirDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoirTag"]>

  export type MemoirTagSelectScalar = {
    memoirId?: boolean
    tagId?: boolean
  }

  export type MemoirTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"memoirId" | "tagId", ExtArgs["result"]["memoirTag"]>
  export type MemoirTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoir?: boolean | MemoirDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type MemoirTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoir?: boolean | MemoirDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type MemoirTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memoir?: boolean | MemoirDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $MemoirTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemoirTag"
    objects: {
      memoir: Prisma.$MemoirPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      memoirId: number
      tagId: number
    }, ExtArgs["result"]["memoirTag"]>
    composites: {}
  }

  type MemoirTagGetPayload<S extends boolean | null | undefined | MemoirTagDefaultArgs> = $Result.GetResult<Prisma.$MemoirTagPayload, S>

  type MemoirTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoirTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoirTagCountAggregateInputType | true
    }

  export interface MemoirTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemoirTag'], meta: { name: 'MemoirTag' } }
    /**
     * Find zero or one MemoirTag that matches the filter.
     * @param {MemoirTagFindUniqueArgs} args - Arguments to find a MemoirTag
     * @example
     * // Get one MemoirTag
     * const memoirTag = await prisma.memoirTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoirTagFindUniqueArgs>(args: SelectSubset<T, MemoirTagFindUniqueArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemoirTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoirTagFindUniqueOrThrowArgs} args - Arguments to find a MemoirTag
     * @example
     * // Get one MemoirTag
     * const memoirTag = await prisma.memoirTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoirTagFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoirTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoirTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagFindFirstArgs} args - Arguments to find a MemoirTag
     * @example
     * // Get one MemoirTag
     * const memoirTag = await prisma.memoirTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoirTagFindFirstArgs>(args?: SelectSubset<T, MemoirTagFindFirstArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoirTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagFindFirstOrThrowArgs} args - Arguments to find a MemoirTag
     * @example
     * // Get one MemoirTag
     * const memoirTag = await prisma.memoirTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoirTagFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoirTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemoirTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemoirTags
     * const memoirTags = await prisma.memoirTag.findMany()
     * 
     * // Get first 10 MemoirTags
     * const memoirTags = await prisma.memoirTag.findMany({ take: 10 })
     * 
     * // Only select the `memoirId`
     * const memoirTagWithMemoirIdOnly = await prisma.memoirTag.findMany({ select: { memoirId: true } })
     * 
     */
    findMany<T extends MemoirTagFindManyArgs>(args?: SelectSubset<T, MemoirTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemoirTag.
     * @param {MemoirTagCreateArgs} args - Arguments to create a MemoirTag.
     * @example
     * // Create one MemoirTag
     * const MemoirTag = await prisma.memoirTag.create({
     *   data: {
     *     // ... data to create a MemoirTag
     *   }
     * })
     * 
     */
    create<T extends MemoirTagCreateArgs>(args: SelectSubset<T, MemoirTagCreateArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemoirTags.
     * @param {MemoirTagCreateManyArgs} args - Arguments to create many MemoirTags.
     * @example
     * // Create many MemoirTags
     * const memoirTag = await prisma.memoirTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoirTagCreateManyArgs>(args?: SelectSubset<T, MemoirTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemoirTags and returns the data saved in the database.
     * @param {MemoirTagCreateManyAndReturnArgs} args - Arguments to create many MemoirTags.
     * @example
     * // Create many MemoirTags
     * const memoirTag = await prisma.memoirTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemoirTags and only return the `memoirId`
     * const memoirTagWithMemoirIdOnly = await prisma.memoirTag.createManyAndReturn({
     *   select: { memoirId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoirTagCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoirTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemoirTag.
     * @param {MemoirTagDeleteArgs} args - Arguments to delete one MemoirTag.
     * @example
     * // Delete one MemoirTag
     * const MemoirTag = await prisma.memoirTag.delete({
     *   where: {
     *     // ... filter to delete one MemoirTag
     *   }
     * })
     * 
     */
    delete<T extends MemoirTagDeleteArgs>(args: SelectSubset<T, MemoirTagDeleteArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemoirTag.
     * @param {MemoirTagUpdateArgs} args - Arguments to update one MemoirTag.
     * @example
     * // Update one MemoirTag
     * const memoirTag = await prisma.memoirTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoirTagUpdateArgs>(args: SelectSubset<T, MemoirTagUpdateArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemoirTags.
     * @param {MemoirTagDeleteManyArgs} args - Arguments to filter MemoirTags to delete.
     * @example
     * // Delete a few MemoirTags
     * const { count } = await prisma.memoirTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoirTagDeleteManyArgs>(args?: SelectSubset<T, MemoirTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoirTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemoirTags
     * const memoirTag = await prisma.memoirTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoirTagUpdateManyArgs>(args: SelectSubset<T, MemoirTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoirTags and returns the data updated in the database.
     * @param {MemoirTagUpdateManyAndReturnArgs} args - Arguments to update many MemoirTags.
     * @example
     * // Update many MemoirTags
     * const memoirTag = await prisma.memoirTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemoirTags and only return the `memoirId`
     * const memoirTagWithMemoirIdOnly = await prisma.memoirTag.updateManyAndReturn({
     *   select: { memoirId: true },
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
    updateManyAndReturn<T extends MemoirTagUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoirTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemoirTag.
     * @param {MemoirTagUpsertArgs} args - Arguments to update or create a MemoirTag.
     * @example
     * // Update or create a MemoirTag
     * const memoirTag = await prisma.memoirTag.upsert({
     *   create: {
     *     // ... data to create a MemoirTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemoirTag we want to update
     *   }
     * })
     */
    upsert<T extends MemoirTagUpsertArgs>(args: SelectSubset<T, MemoirTagUpsertArgs<ExtArgs>>): Prisma__MemoirTagClient<$Result.GetResult<Prisma.$MemoirTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemoirTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagCountArgs} args - Arguments to filter MemoirTags to count.
     * @example
     * // Count the number of MemoirTags
     * const count = await prisma.memoirTag.count({
     *   where: {
     *     // ... the filter for the MemoirTags we want to count
     *   }
     * })
    **/
    count<T extends MemoirTagCountArgs>(
      args?: Subset<T, MemoirTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoirTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemoirTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MemoirTagAggregateArgs>(args: Subset<T, MemoirTagAggregateArgs>): Prisma.PrismaPromise<GetMemoirTagAggregateType<T>>

    /**
     * Group by MemoirTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoirTagGroupByArgs} args - Group by arguments.
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
      T extends MemoirTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoirTagGroupByArgs['orderBy'] }
        : { orderBy?: MemoirTagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MemoirTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoirTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemoirTag model
   */
  readonly fields: MemoirTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemoirTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoirTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memoir<T extends MemoirDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemoirDefaultArgs<ExtArgs>>): Prisma__MemoirClient<$Result.GetResult<Prisma.$MemoirPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MemoirTag model
   */
  interface MemoirTagFieldRefs {
    readonly memoirId: FieldRef<"MemoirTag", 'Int'>
    readonly tagId: FieldRef<"MemoirTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MemoirTag findUnique
   */
  export type MemoirTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoirTag to fetch.
     */
    where: MemoirTagWhereUniqueInput
  }

  /**
   * MemoirTag findUniqueOrThrow
   */
  export type MemoirTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoirTag to fetch.
     */
    where: MemoirTagWhereUniqueInput
  }

  /**
   * MemoirTag findFirst
   */
  export type MemoirTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoirTag to fetch.
     */
    where?: MemoirTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTags to fetch.
     */
    orderBy?: MemoirTagOrderByWithRelationInput | MemoirTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoirTags.
     */
    cursor?: MemoirTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoirTags.
     */
    distinct?: MemoirTagScalarFieldEnum | MemoirTagScalarFieldEnum[]
  }

  /**
   * MemoirTag findFirstOrThrow
   */
  export type MemoirTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoirTag to fetch.
     */
    where?: MemoirTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTags to fetch.
     */
    orderBy?: MemoirTagOrderByWithRelationInput | MemoirTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoirTags.
     */
    cursor?: MemoirTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoirTags.
     */
    distinct?: MemoirTagScalarFieldEnum | MemoirTagScalarFieldEnum[]
  }

  /**
   * MemoirTag findMany
   */
  export type MemoirTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoirTags to fetch.
     */
    where?: MemoirTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoirTags to fetch.
     */
    orderBy?: MemoirTagOrderByWithRelationInput | MemoirTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemoirTags.
     */
    cursor?: MemoirTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoirTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoirTags.
     */
    skip?: number
    distinct?: MemoirTagScalarFieldEnum | MemoirTagScalarFieldEnum[]
  }

  /**
   * MemoirTag create
   */
  export type MemoirTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * The data needed to create a MemoirTag.
     */
    data: XOR<MemoirTagCreateInput, MemoirTagUncheckedCreateInput>
  }

  /**
   * MemoirTag createMany
   */
  export type MemoirTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemoirTags.
     */
    data: MemoirTagCreateManyInput | MemoirTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemoirTag createManyAndReturn
   */
  export type MemoirTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * The data used to create many MemoirTags.
     */
    data: MemoirTagCreateManyInput | MemoirTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemoirTag update
   */
  export type MemoirTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * The data needed to update a MemoirTag.
     */
    data: XOR<MemoirTagUpdateInput, MemoirTagUncheckedUpdateInput>
    /**
     * Choose, which MemoirTag to update.
     */
    where: MemoirTagWhereUniqueInput
  }

  /**
   * MemoirTag updateMany
   */
  export type MemoirTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemoirTags.
     */
    data: XOR<MemoirTagUpdateManyMutationInput, MemoirTagUncheckedUpdateManyInput>
    /**
     * Filter which MemoirTags to update
     */
    where?: MemoirTagWhereInput
    /**
     * Limit how many MemoirTags to update.
     */
    limit?: number
  }

  /**
   * MemoirTag updateManyAndReturn
   */
  export type MemoirTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * The data used to update MemoirTags.
     */
    data: XOR<MemoirTagUpdateManyMutationInput, MemoirTagUncheckedUpdateManyInput>
    /**
     * Filter which MemoirTags to update
     */
    where?: MemoirTagWhereInput
    /**
     * Limit how many MemoirTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemoirTag upsert
   */
  export type MemoirTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * The filter to search for the MemoirTag to update in case it exists.
     */
    where: MemoirTagWhereUniqueInput
    /**
     * In case the MemoirTag found by the `where` argument doesn't exist, create a new MemoirTag with this data.
     */
    create: XOR<MemoirTagCreateInput, MemoirTagUncheckedCreateInput>
    /**
     * In case the MemoirTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoirTagUpdateInput, MemoirTagUncheckedUpdateInput>
  }

  /**
   * MemoirTag delete
   */
  export type MemoirTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
    /**
     * Filter which MemoirTag to delete.
     */
    where: MemoirTagWhereUniqueInput
  }

  /**
   * MemoirTag deleteMany
   */
  export type MemoirTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoirTags to delete
     */
    where?: MemoirTagWhereInput
    /**
     * Limit how many MemoirTags to delete.
     */
    limit?: number
  }

  /**
   * MemoirTag without action
   */
  export type MemoirTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoirTag
     */
    select?: MemoirTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoirTag
     */
    omit?: MemoirTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoirTagInclude<ExtArgs> | null
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


  export const RepoScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId'
  };

  export type RepoScalarFieldEnum = (typeof RepoScalarFieldEnum)[keyof typeof RepoScalarFieldEnum]


  export const MemoirScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    source: 'source',
    aiSum: 'aiSum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    typeId: 'typeId',
    repoId: 'repoId'
  };

  export type MemoirScalarFieldEnum = (typeof MemoirScalarFieldEnum)[keyof typeof MemoirScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    profileUrl: 'profileUrl',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    githubId: 'githubId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MemoirTypeScalarFieldEnum: {
    id: 'id',
    type: 'type'
  };

  export type MemoirTypeScalarFieldEnum = (typeof MemoirTypeScalarFieldEnum)[keyof typeof MemoirTypeScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const MemoirTagScalarFieldEnum: {
    memoirId: 'memoirId',
    tagId: 'tagId'
  };

  export type MemoirTagScalarFieldEnum = (typeof MemoirTagScalarFieldEnum)[keyof typeof MemoirTagScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type RepoWhereInput = {
    AND?: RepoWhereInput | RepoWhereInput[]
    OR?: RepoWhereInput[]
    NOT?: RepoWhereInput | RepoWhereInput[]
    id?: IntFilter<"Repo"> | number
    name?: StringNullableFilter<"Repo"> | string | null
    userId?: StringFilter<"Repo"> | string
    memoirs?: MemoirListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RepoOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    userId?: SortOrder
    memoirs?: MemoirOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type RepoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RepoWhereInput | RepoWhereInput[]
    OR?: RepoWhereInput[]
    NOT?: RepoWhereInput | RepoWhereInput[]
    name?: StringNullableFilter<"Repo"> | string | null
    userId?: StringFilter<"Repo"> | string
    memoirs?: MemoirListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RepoOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: RepoCountOrderByAggregateInput
    _avg?: RepoAvgOrderByAggregateInput
    _max?: RepoMaxOrderByAggregateInput
    _min?: RepoMinOrderByAggregateInput
    _sum?: RepoSumOrderByAggregateInput
  }

  export type RepoScalarWhereWithAggregatesInput = {
    AND?: RepoScalarWhereWithAggregatesInput | RepoScalarWhereWithAggregatesInput[]
    OR?: RepoScalarWhereWithAggregatesInput[]
    NOT?: RepoScalarWhereWithAggregatesInput | RepoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Repo"> | number
    name?: StringNullableWithAggregatesFilter<"Repo"> | string | null
    userId?: StringWithAggregatesFilter<"Repo"> | string
  }

  export type MemoirWhereInput = {
    AND?: MemoirWhereInput | MemoirWhereInput[]
    OR?: MemoirWhereInput[]
    NOT?: MemoirWhereInput | MemoirWhereInput[]
    id?: IntFilter<"Memoir"> | number
    title?: StringFilter<"Memoir"> | string
    content?: StringFilter<"Memoir"> | string
    source?: StringFilter<"Memoir"> | string
    aiSum?: StringNullableFilter<"Memoir"> | string | null
    createdAt?: DateTimeFilter<"Memoir"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Memoir"> | Date | string | null
    userId?: StringFilter<"Memoir"> | string
    typeId?: IntFilter<"Memoir"> | number
    repoId?: IntFilter<"Memoir"> | number
    repo?: XOR<RepoScalarRelationFilter, RepoWhereInput>
    type?: XOR<MemoirTypeScalarRelationFilter, MemoirTypeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: MemoirTagListRelationFilter
  }

  export type MemoirOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    aiSum?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
    repo?: RepoOrderByWithRelationInput
    type?: MemoirTypeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    tags?: MemoirTagOrderByRelationAggregateInput
  }

  export type MemoirWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MemoirWhereInput | MemoirWhereInput[]
    OR?: MemoirWhereInput[]
    NOT?: MemoirWhereInput | MemoirWhereInput[]
    title?: StringFilter<"Memoir"> | string
    content?: StringFilter<"Memoir"> | string
    source?: StringFilter<"Memoir"> | string
    aiSum?: StringNullableFilter<"Memoir"> | string | null
    createdAt?: DateTimeFilter<"Memoir"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Memoir"> | Date | string | null
    userId?: StringFilter<"Memoir"> | string
    typeId?: IntFilter<"Memoir"> | number
    repoId?: IntFilter<"Memoir"> | number
    repo?: XOR<RepoScalarRelationFilter, RepoWhereInput>
    type?: XOR<MemoirTypeScalarRelationFilter, MemoirTypeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: MemoirTagListRelationFilter
  }, "id">

  export type MemoirOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    aiSum?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
    _count?: MemoirCountOrderByAggregateInput
    _avg?: MemoirAvgOrderByAggregateInput
    _max?: MemoirMaxOrderByAggregateInput
    _min?: MemoirMinOrderByAggregateInput
    _sum?: MemoirSumOrderByAggregateInput
  }

  export type MemoirScalarWhereWithAggregatesInput = {
    AND?: MemoirScalarWhereWithAggregatesInput | MemoirScalarWhereWithAggregatesInput[]
    OR?: MemoirScalarWhereWithAggregatesInput[]
    NOT?: MemoirScalarWhereWithAggregatesInput | MemoirScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Memoir"> | number
    title?: StringWithAggregatesFilter<"Memoir"> | string
    content?: StringWithAggregatesFilter<"Memoir"> | string
    source?: StringWithAggregatesFilter<"Memoir"> | string
    aiSum?: StringNullableWithAggregatesFilter<"Memoir"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Memoir"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Memoir"> | Date | string | null
    userId?: StringWithAggregatesFilter<"Memoir"> | string
    typeId?: IntWithAggregatesFilter<"Memoir"> | number
    repoId?: IntWithAggregatesFilter<"Memoir"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    profileUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    githubId?: StringFilter<"User"> | string
    memoirs?: MemoirListRelationFilter
    repos?: RepoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    profileUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    githubId?: SortOrder
    memoirs?: MemoirOrderByRelationAggregateInput
    repos?: RepoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    profileUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    githubId?: StringFilter<"User"> | string
    memoirs?: MemoirListRelationFilter
    repos?: RepoListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    profileUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    githubId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    profileUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    githubId?: StringWithAggregatesFilter<"User"> | string
  }

  export type MemoirTypeWhereInput = {
    AND?: MemoirTypeWhereInput | MemoirTypeWhereInput[]
    OR?: MemoirTypeWhereInput[]
    NOT?: MemoirTypeWhereInput | MemoirTypeWhereInput[]
    id?: IntFilter<"MemoirType"> | number
    type?: StringFilter<"MemoirType"> | string
    memoirs?: MemoirListRelationFilter
  }

  export type MemoirTypeOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    memoirs?: MemoirOrderByRelationAggregateInput
  }

  export type MemoirTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MemoirTypeWhereInput | MemoirTypeWhereInput[]
    OR?: MemoirTypeWhereInput[]
    NOT?: MemoirTypeWhereInput | MemoirTypeWhereInput[]
    type?: StringFilter<"MemoirType"> | string
    memoirs?: MemoirListRelationFilter
  }, "id">

  export type MemoirTypeOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    _count?: MemoirTypeCountOrderByAggregateInput
    _avg?: MemoirTypeAvgOrderByAggregateInput
    _max?: MemoirTypeMaxOrderByAggregateInput
    _min?: MemoirTypeMinOrderByAggregateInput
    _sum?: MemoirTypeSumOrderByAggregateInput
  }

  export type MemoirTypeScalarWhereWithAggregatesInput = {
    AND?: MemoirTypeScalarWhereWithAggregatesInput | MemoirTypeScalarWhereWithAggregatesInput[]
    OR?: MemoirTypeScalarWhereWithAggregatesInput[]
    NOT?: MemoirTypeScalarWhereWithAggregatesInput | MemoirTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MemoirType"> | number
    type?: StringWithAggregatesFilter<"MemoirType"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    memoirTags?: MemoirTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    memoirTags?: MemoirTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    name?: StringFilter<"Tag"> | string
    memoirTags?: MemoirTagListRelationFilter
  }, "id">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type MemoirTagWhereInput = {
    AND?: MemoirTagWhereInput | MemoirTagWhereInput[]
    OR?: MemoirTagWhereInput[]
    NOT?: MemoirTagWhereInput | MemoirTagWhereInput[]
    memoirId?: IntFilter<"MemoirTag"> | number
    tagId?: IntFilter<"MemoirTag"> | number
    memoir?: XOR<MemoirScalarRelationFilter, MemoirWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type MemoirTagOrderByWithRelationInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
    memoir?: MemoirOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type MemoirTagWhereUniqueInput = Prisma.AtLeast<{
    memoirId_tagId?: MemoirTagMemoirIdTagIdCompoundUniqueInput
    AND?: MemoirTagWhereInput | MemoirTagWhereInput[]
    OR?: MemoirTagWhereInput[]
    NOT?: MemoirTagWhereInput | MemoirTagWhereInput[]
    memoirId?: IntFilter<"MemoirTag"> | number
    tagId?: IntFilter<"MemoirTag"> | number
    memoir?: XOR<MemoirScalarRelationFilter, MemoirWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "memoirId_tagId">

  export type MemoirTagOrderByWithAggregationInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
    _count?: MemoirTagCountOrderByAggregateInput
    _avg?: MemoirTagAvgOrderByAggregateInput
    _max?: MemoirTagMaxOrderByAggregateInput
    _min?: MemoirTagMinOrderByAggregateInput
    _sum?: MemoirTagSumOrderByAggregateInput
  }

  export type MemoirTagScalarWhereWithAggregatesInput = {
    AND?: MemoirTagScalarWhereWithAggregatesInput | MemoirTagScalarWhereWithAggregatesInput[]
    OR?: MemoirTagScalarWhereWithAggregatesInput[]
    NOT?: MemoirTagScalarWhereWithAggregatesInput | MemoirTagScalarWhereWithAggregatesInput[]
    memoirId?: IntWithAggregatesFilter<"MemoirTag"> | number
    tagId?: IntWithAggregatesFilter<"MemoirTag"> | number
  }

  export type RepoCreateInput = {
    name?: string | null
    memoirs?: MemoirCreateNestedManyWithoutRepoInput
    user: UserCreateNestedOneWithoutReposInput
  }

  export type RepoUncheckedCreateInput = {
    id?: number
    name?: string | null
    userId: string
    memoirs?: MemoirUncheckedCreateNestedManyWithoutRepoInput
  }

  export type RepoUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    memoirs?: MemoirUpdateManyWithoutRepoNestedInput
    user?: UserUpdateOneRequiredWithoutReposNestedInput
  }

  export type RepoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUncheckedUpdateManyWithoutRepoNestedInput
  }

  export type RepoCreateManyInput = {
    id?: number
    name?: string | null
    userId: string
  }

  export type RepoUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RepoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirCreateInput = {
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    repo: RepoCreateNestedOneWithoutMemoirsInput
    type: MemoirTypeCreateNestedOneWithoutMemoirsInput
    user: UserCreateNestedOneWithoutMemoirsInput
    tags?: MemoirTagCreateNestedManyWithoutMemoirInput
  }

  export type MemoirUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    typeId: number
    repoId: number
    tags?: MemoirTagUncheckedCreateNestedManyWithoutMemoirInput
  }

  export type MemoirUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repo?: RepoUpdateOneRequiredWithoutMemoirsNestedInput
    type?: MemoirTypeUpdateOneRequiredWithoutMemoirsNestedInput
    user?: UserUpdateOneRequiredWithoutMemoirsNestedInput
    tags?: MemoirTagUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    repoId?: IntFieldUpdateOperationsInput | number
    tags?: MemoirTagUncheckedUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirCreateManyInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    typeId: number
    repoId: number
  }

  export type MemoirUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MemoirUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    repoId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
    memoirs?: MemoirCreateNestedManyWithoutUserInput
    repos?: RepoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
    memoirs?: MemoirUncheckedCreateNestedManyWithoutUserInput
    repos?: RepoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUpdateManyWithoutUserNestedInput
    repos?: RepoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUncheckedUpdateManyWithoutUserNestedInput
    repos?: RepoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirTypeCreateInput = {
    type: string
    memoirs?: MemoirCreateNestedManyWithoutTypeInput
  }

  export type MemoirTypeUncheckedCreateInput = {
    id?: number
    type: string
    memoirs?: MemoirUncheckedCreateNestedManyWithoutTypeInput
  }

  export type MemoirTypeUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUpdateManyWithoutTypeNestedInput
  }

  export type MemoirTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type MemoirTypeCreateManyInput = {
    id?: number
    type: string
  }

  export type MemoirTypeUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    name: string
    memoirTags?: MemoirTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    memoirTags?: MemoirTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    memoirTags?: MemoirTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    memoirTags?: MemoirTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirTagCreateInput = {
    memoir: MemoirCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutMemoirTagsInput
  }

  export type MemoirTagUncheckedCreateInput = {
    memoirId: number
    tagId: number
  }

  export type MemoirTagUpdateInput = {
    memoir?: MemoirUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutMemoirTagsNestedInput
  }

  export type MemoirTagUncheckedUpdateInput = {
    memoirId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoirTagCreateManyInput = {
    memoirId: number
    tagId: number
  }

  export type MemoirTagUpdateManyMutationInput = {

  }

  export type MemoirTagUncheckedUpdateManyInput = {
    memoirId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
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

  export type MemoirListRelationFilter = {
    every?: MemoirWhereInput
    some?: MemoirWhereInput
    none?: MemoirWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MemoirOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepoCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type RepoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RepoMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type RepoMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type RepoSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type RepoScalarRelationFilter = {
    is?: RepoWhereInput
    isNot?: RepoWhereInput
  }

  export type MemoirTypeScalarRelationFilter = {
    is?: MemoirTypeWhereInput
    isNot?: MemoirTypeWhereInput
  }

  export type MemoirTagListRelationFilter = {
    every?: MemoirTagWhereInput
    some?: MemoirTagWhereInput
    none?: MemoirTagWhereInput
  }

  export type MemoirTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemoirCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    aiSum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
  }

  export type MemoirAvgOrderByAggregateInput = {
    id?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
  }

  export type MemoirMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    aiSum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
  }

  export type MemoirMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    aiSum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
  }

  export type MemoirSumOrderByAggregateInput = {
    id?: SortOrder
    typeId?: SortOrder
    repoId?: SortOrder
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

  export type RepoListRelationFilter = {
    every?: RepoWhereInput
    some?: RepoWhereInput
    none?: RepoWhereInput
  }

  export type RepoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    profileUrl?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    githubId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    profileUrl?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    githubId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    profileUrl?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    githubId?: SortOrder
  }

  export type MemoirTypeCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
  }

  export type MemoirTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MemoirTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
  }

  export type MemoirTypeMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
  }

  export type MemoirTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MemoirScalarRelationFilter = {
    is?: MemoirWhereInput
    isNot?: MemoirWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type MemoirTagMemoirIdTagIdCompoundUniqueInput = {
    memoirId: number
    tagId: number
  }

  export type MemoirTagCountOrderByAggregateInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoirTagAvgOrderByAggregateInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoirTagMaxOrderByAggregateInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoirTagMinOrderByAggregateInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoirTagSumOrderByAggregateInput = {
    memoirId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoirCreateNestedManyWithoutRepoInput = {
    create?: XOR<MemoirCreateWithoutRepoInput, MemoirUncheckedCreateWithoutRepoInput> | MemoirCreateWithoutRepoInput[] | MemoirUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutRepoInput | MemoirCreateOrConnectWithoutRepoInput[]
    createMany?: MemoirCreateManyRepoInputEnvelope
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutReposInput = {
    create?: XOR<UserCreateWithoutReposInput, UserUncheckedCreateWithoutReposInput>
    connectOrCreate?: UserCreateOrConnectWithoutReposInput
    connect?: UserWhereUniqueInput
  }

  export type MemoirUncheckedCreateNestedManyWithoutRepoInput = {
    create?: XOR<MemoirCreateWithoutRepoInput, MemoirUncheckedCreateWithoutRepoInput> | MemoirCreateWithoutRepoInput[] | MemoirUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutRepoInput | MemoirCreateOrConnectWithoutRepoInput[]
    createMany?: MemoirCreateManyRepoInputEnvelope
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MemoirUpdateManyWithoutRepoNestedInput = {
    create?: XOR<MemoirCreateWithoutRepoInput, MemoirUncheckedCreateWithoutRepoInput> | MemoirCreateWithoutRepoInput[] | MemoirUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutRepoInput | MemoirCreateOrConnectWithoutRepoInput[]
    upsert?: MemoirUpsertWithWhereUniqueWithoutRepoInput | MemoirUpsertWithWhereUniqueWithoutRepoInput[]
    createMany?: MemoirCreateManyRepoInputEnvelope
    set?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    disconnect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    delete?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    update?: MemoirUpdateWithWhereUniqueWithoutRepoInput | MemoirUpdateWithWhereUniqueWithoutRepoInput[]
    updateMany?: MemoirUpdateManyWithWhereWithoutRepoInput | MemoirUpdateManyWithWhereWithoutRepoInput[]
    deleteMany?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutReposNestedInput = {
    create?: XOR<UserCreateWithoutReposInput, UserUncheckedCreateWithoutReposInput>
    connectOrCreate?: UserCreateOrConnectWithoutReposInput
    upsert?: UserUpsertWithoutReposInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReposInput, UserUpdateWithoutReposInput>, UserUncheckedUpdateWithoutReposInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type MemoirUncheckedUpdateManyWithoutRepoNestedInput = {
    create?: XOR<MemoirCreateWithoutRepoInput, MemoirUncheckedCreateWithoutRepoInput> | MemoirCreateWithoutRepoInput[] | MemoirUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutRepoInput | MemoirCreateOrConnectWithoutRepoInput[]
    upsert?: MemoirUpsertWithWhereUniqueWithoutRepoInput | MemoirUpsertWithWhereUniqueWithoutRepoInput[]
    createMany?: MemoirCreateManyRepoInputEnvelope
    set?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    disconnect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    delete?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    update?: MemoirUpdateWithWhereUniqueWithoutRepoInput | MemoirUpdateWithWhereUniqueWithoutRepoInput[]
    updateMany?: MemoirUpdateManyWithWhereWithoutRepoInput | MemoirUpdateManyWithWhereWithoutRepoInput[]
    deleteMany?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
  }

  export type RepoCreateNestedOneWithoutMemoirsInput = {
    create?: XOR<RepoCreateWithoutMemoirsInput, RepoUncheckedCreateWithoutMemoirsInput>
    connectOrCreate?: RepoCreateOrConnectWithoutMemoirsInput
    connect?: RepoWhereUniqueInput
  }

  export type MemoirTypeCreateNestedOneWithoutMemoirsInput = {
    create?: XOR<MemoirTypeCreateWithoutMemoirsInput, MemoirTypeUncheckedCreateWithoutMemoirsInput>
    connectOrCreate?: MemoirTypeCreateOrConnectWithoutMemoirsInput
    connect?: MemoirTypeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMemoirsInput = {
    create?: XOR<UserCreateWithoutMemoirsInput, UserUncheckedCreateWithoutMemoirsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemoirsInput
    connect?: UserWhereUniqueInput
  }

  export type MemoirTagCreateNestedManyWithoutMemoirInput = {
    create?: XOR<MemoirTagCreateWithoutMemoirInput, MemoirTagUncheckedCreateWithoutMemoirInput> | MemoirTagCreateWithoutMemoirInput[] | MemoirTagUncheckedCreateWithoutMemoirInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutMemoirInput | MemoirTagCreateOrConnectWithoutMemoirInput[]
    createMany?: MemoirTagCreateManyMemoirInputEnvelope
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
  }

  export type MemoirTagUncheckedCreateNestedManyWithoutMemoirInput = {
    create?: XOR<MemoirTagCreateWithoutMemoirInput, MemoirTagUncheckedCreateWithoutMemoirInput> | MemoirTagCreateWithoutMemoirInput[] | MemoirTagUncheckedCreateWithoutMemoirInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutMemoirInput | MemoirTagCreateOrConnectWithoutMemoirInput[]
    createMany?: MemoirTagCreateManyMemoirInputEnvelope
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RepoUpdateOneRequiredWithoutMemoirsNestedInput = {
    create?: XOR<RepoCreateWithoutMemoirsInput, RepoUncheckedCreateWithoutMemoirsInput>
    connectOrCreate?: RepoCreateOrConnectWithoutMemoirsInput
    upsert?: RepoUpsertWithoutMemoirsInput
    connect?: RepoWhereUniqueInput
    update?: XOR<XOR<RepoUpdateToOneWithWhereWithoutMemoirsInput, RepoUpdateWithoutMemoirsInput>, RepoUncheckedUpdateWithoutMemoirsInput>
  }

  export type MemoirTypeUpdateOneRequiredWithoutMemoirsNestedInput = {
    create?: XOR<MemoirTypeCreateWithoutMemoirsInput, MemoirTypeUncheckedCreateWithoutMemoirsInput>
    connectOrCreate?: MemoirTypeCreateOrConnectWithoutMemoirsInput
    upsert?: MemoirTypeUpsertWithoutMemoirsInput
    connect?: MemoirTypeWhereUniqueInput
    update?: XOR<XOR<MemoirTypeUpdateToOneWithWhereWithoutMemoirsInput, MemoirTypeUpdateWithoutMemoirsInput>, MemoirTypeUncheckedUpdateWithoutMemoirsInput>
  }

  export type UserUpdateOneRequiredWithoutMemoirsNestedInput = {
    create?: XOR<UserCreateWithoutMemoirsInput, UserUncheckedCreateWithoutMemoirsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemoirsInput
    upsert?: UserUpsertWithoutMemoirsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMemoirsInput, UserUpdateWithoutMemoirsInput>, UserUncheckedUpdateWithoutMemoirsInput>
  }

  export type MemoirTagUpdateManyWithoutMemoirNestedInput = {
    create?: XOR<MemoirTagCreateWithoutMemoirInput, MemoirTagUncheckedCreateWithoutMemoirInput> | MemoirTagCreateWithoutMemoirInput[] | MemoirTagUncheckedCreateWithoutMemoirInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutMemoirInput | MemoirTagCreateOrConnectWithoutMemoirInput[]
    upsert?: MemoirTagUpsertWithWhereUniqueWithoutMemoirInput | MemoirTagUpsertWithWhereUniqueWithoutMemoirInput[]
    createMany?: MemoirTagCreateManyMemoirInputEnvelope
    set?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    disconnect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    delete?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    update?: MemoirTagUpdateWithWhereUniqueWithoutMemoirInput | MemoirTagUpdateWithWhereUniqueWithoutMemoirInput[]
    updateMany?: MemoirTagUpdateManyWithWhereWithoutMemoirInput | MemoirTagUpdateManyWithWhereWithoutMemoirInput[]
    deleteMany?: MemoirTagScalarWhereInput | MemoirTagScalarWhereInput[]
  }

  export type MemoirTagUncheckedUpdateManyWithoutMemoirNestedInput = {
    create?: XOR<MemoirTagCreateWithoutMemoirInput, MemoirTagUncheckedCreateWithoutMemoirInput> | MemoirTagCreateWithoutMemoirInput[] | MemoirTagUncheckedCreateWithoutMemoirInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutMemoirInput | MemoirTagCreateOrConnectWithoutMemoirInput[]
    upsert?: MemoirTagUpsertWithWhereUniqueWithoutMemoirInput | MemoirTagUpsertWithWhereUniqueWithoutMemoirInput[]
    createMany?: MemoirTagCreateManyMemoirInputEnvelope
    set?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    disconnect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    delete?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    update?: MemoirTagUpdateWithWhereUniqueWithoutMemoirInput | MemoirTagUpdateWithWhereUniqueWithoutMemoirInput[]
    updateMany?: MemoirTagUpdateManyWithWhereWithoutMemoirInput | MemoirTagUpdateManyWithWhereWithoutMemoirInput[]
    deleteMany?: MemoirTagScalarWhereInput | MemoirTagScalarWhereInput[]
  }

  export type MemoirCreateNestedManyWithoutUserInput = {
    create?: XOR<MemoirCreateWithoutUserInput, MemoirUncheckedCreateWithoutUserInput> | MemoirCreateWithoutUserInput[] | MemoirUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutUserInput | MemoirCreateOrConnectWithoutUserInput[]
    createMany?: MemoirCreateManyUserInputEnvelope
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
  }

  export type RepoCreateNestedManyWithoutUserInput = {
    create?: XOR<RepoCreateWithoutUserInput, RepoUncheckedCreateWithoutUserInput> | RepoCreateWithoutUserInput[] | RepoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RepoCreateOrConnectWithoutUserInput | RepoCreateOrConnectWithoutUserInput[]
    createMany?: RepoCreateManyUserInputEnvelope
    connect?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
  }

  export type MemoirUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MemoirCreateWithoutUserInput, MemoirUncheckedCreateWithoutUserInput> | MemoirCreateWithoutUserInput[] | MemoirUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutUserInput | MemoirCreateOrConnectWithoutUserInput[]
    createMany?: MemoirCreateManyUserInputEnvelope
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
  }

  export type RepoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RepoCreateWithoutUserInput, RepoUncheckedCreateWithoutUserInput> | RepoCreateWithoutUserInput[] | RepoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RepoCreateOrConnectWithoutUserInput | RepoCreateOrConnectWithoutUserInput[]
    createMany?: RepoCreateManyUserInputEnvelope
    connect?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
  }

  export type MemoirUpdateManyWithoutUserNestedInput = {
    create?: XOR<MemoirCreateWithoutUserInput, MemoirUncheckedCreateWithoutUserInput> | MemoirCreateWithoutUserInput[] | MemoirUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutUserInput | MemoirCreateOrConnectWithoutUserInput[]
    upsert?: MemoirUpsertWithWhereUniqueWithoutUserInput | MemoirUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MemoirCreateManyUserInputEnvelope
    set?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    disconnect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    delete?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    update?: MemoirUpdateWithWhereUniqueWithoutUserInput | MemoirUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MemoirUpdateManyWithWhereWithoutUserInput | MemoirUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
  }

  export type RepoUpdateManyWithoutUserNestedInput = {
    create?: XOR<RepoCreateWithoutUserInput, RepoUncheckedCreateWithoutUserInput> | RepoCreateWithoutUserInput[] | RepoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RepoCreateOrConnectWithoutUserInput | RepoCreateOrConnectWithoutUserInput[]
    upsert?: RepoUpsertWithWhereUniqueWithoutUserInput | RepoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RepoCreateManyUserInputEnvelope
    set?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    disconnect?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    delete?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    connect?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    update?: RepoUpdateWithWhereUniqueWithoutUserInput | RepoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RepoUpdateManyWithWhereWithoutUserInput | RepoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RepoScalarWhereInput | RepoScalarWhereInput[]
  }

  export type MemoirUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MemoirCreateWithoutUserInput, MemoirUncheckedCreateWithoutUserInput> | MemoirCreateWithoutUserInput[] | MemoirUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutUserInput | MemoirCreateOrConnectWithoutUserInput[]
    upsert?: MemoirUpsertWithWhereUniqueWithoutUserInput | MemoirUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MemoirCreateManyUserInputEnvelope
    set?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    disconnect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    delete?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    update?: MemoirUpdateWithWhereUniqueWithoutUserInput | MemoirUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MemoirUpdateManyWithWhereWithoutUserInput | MemoirUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
  }

  export type RepoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RepoCreateWithoutUserInput, RepoUncheckedCreateWithoutUserInput> | RepoCreateWithoutUserInput[] | RepoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RepoCreateOrConnectWithoutUserInput | RepoCreateOrConnectWithoutUserInput[]
    upsert?: RepoUpsertWithWhereUniqueWithoutUserInput | RepoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RepoCreateManyUserInputEnvelope
    set?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    disconnect?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    delete?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    connect?: RepoWhereUniqueInput | RepoWhereUniqueInput[]
    update?: RepoUpdateWithWhereUniqueWithoutUserInput | RepoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RepoUpdateManyWithWhereWithoutUserInput | RepoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RepoScalarWhereInput | RepoScalarWhereInput[]
  }

  export type MemoirCreateNestedManyWithoutTypeInput = {
    create?: XOR<MemoirCreateWithoutTypeInput, MemoirUncheckedCreateWithoutTypeInput> | MemoirCreateWithoutTypeInput[] | MemoirUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutTypeInput | MemoirCreateOrConnectWithoutTypeInput[]
    createMany?: MemoirCreateManyTypeInputEnvelope
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
  }

  export type MemoirUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<MemoirCreateWithoutTypeInput, MemoirUncheckedCreateWithoutTypeInput> | MemoirCreateWithoutTypeInput[] | MemoirUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutTypeInput | MemoirCreateOrConnectWithoutTypeInput[]
    createMany?: MemoirCreateManyTypeInputEnvelope
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
  }

  export type MemoirUpdateManyWithoutTypeNestedInput = {
    create?: XOR<MemoirCreateWithoutTypeInput, MemoirUncheckedCreateWithoutTypeInput> | MemoirCreateWithoutTypeInput[] | MemoirUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutTypeInput | MemoirCreateOrConnectWithoutTypeInput[]
    upsert?: MemoirUpsertWithWhereUniqueWithoutTypeInput | MemoirUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: MemoirCreateManyTypeInputEnvelope
    set?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    disconnect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    delete?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    update?: MemoirUpdateWithWhereUniqueWithoutTypeInput | MemoirUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: MemoirUpdateManyWithWhereWithoutTypeInput | MemoirUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
  }

  export type MemoirUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<MemoirCreateWithoutTypeInput, MemoirUncheckedCreateWithoutTypeInput> | MemoirCreateWithoutTypeInput[] | MemoirUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MemoirCreateOrConnectWithoutTypeInput | MemoirCreateOrConnectWithoutTypeInput[]
    upsert?: MemoirUpsertWithWhereUniqueWithoutTypeInput | MemoirUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: MemoirCreateManyTypeInputEnvelope
    set?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    disconnect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    delete?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    connect?: MemoirWhereUniqueInput | MemoirWhereUniqueInput[]
    update?: MemoirUpdateWithWhereUniqueWithoutTypeInput | MemoirUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: MemoirUpdateManyWithWhereWithoutTypeInput | MemoirUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
  }

  export type MemoirTagCreateNestedManyWithoutTagInput = {
    create?: XOR<MemoirTagCreateWithoutTagInput, MemoirTagUncheckedCreateWithoutTagInput> | MemoirTagCreateWithoutTagInput[] | MemoirTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutTagInput | MemoirTagCreateOrConnectWithoutTagInput[]
    createMany?: MemoirTagCreateManyTagInputEnvelope
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
  }

  export type MemoirTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<MemoirTagCreateWithoutTagInput, MemoirTagUncheckedCreateWithoutTagInput> | MemoirTagCreateWithoutTagInput[] | MemoirTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutTagInput | MemoirTagCreateOrConnectWithoutTagInput[]
    createMany?: MemoirTagCreateManyTagInputEnvelope
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
  }

  export type MemoirTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<MemoirTagCreateWithoutTagInput, MemoirTagUncheckedCreateWithoutTagInput> | MemoirTagCreateWithoutTagInput[] | MemoirTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutTagInput | MemoirTagCreateOrConnectWithoutTagInput[]
    upsert?: MemoirTagUpsertWithWhereUniqueWithoutTagInput | MemoirTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MemoirTagCreateManyTagInputEnvelope
    set?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    disconnect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    delete?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    update?: MemoirTagUpdateWithWhereUniqueWithoutTagInput | MemoirTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MemoirTagUpdateManyWithWhereWithoutTagInput | MemoirTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MemoirTagScalarWhereInput | MemoirTagScalarWhereInput[]
  }

  export type MemoirTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<MemoirTagCreateWithoutTagInput, MemoirTagUncheckedCreateWithoutTagInput> | MemoirTagCreateWithoutTagInput[] | MemoirTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoirTagCreateOrConnectWithoutTagInput | MemoirTagCreateOrConnectWithoutTagInput[]
    upsert?: MemoirTagUpsertWithWhereUniqueWithoutTagInput | MemoirTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MemoirTagCreateManyTagInputEnvelope
    set?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    disconnect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    delete?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    connect?: MemoirTagWhereUniqueInput | MemoirTagWhereUniqueInput[]
    update?: MemoirTagUpdateWithWhereUniqueWithoutTagInput | MemoirTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MemoirTagUpdateManyWithWhereWithoutTagInput | MemoirTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MemoirTagScalarWhereInput | MemoirTagScalarWhereInput[]
  }

  export type MemoirCreateNestedOneWithoutTagsInput = {
    create?: XOR<MemoirCreateWithoutTagsInput, MemoirUncheckedCreateWithoutTagsInput>
    connectOrCreate?: MemoirCreateOrConnectWithoutTagsInput
    connect?: MemoirWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutMemoirTagsInput = {
    create?: XOR<TagCreateWithoutMemoirTagsInput, TagUncheckedCreateWithoutMemoirTagsInput>
    connectOrCreate?: TagCreateOrConnectWithoutMemoirTagsInput
    connect?: TagWhereUniqueInput
  }

  export type MemoirUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<MemoirCreateWithoutTagsInput, MemoirUncheckedCreateWithoutTagsInput>
    connectOrCreate?: MemoirCreateOrConnectWithoutTagsInput
    upsert?: MemoirUpsertWithoutTagsInput
    connect?: MemoirWhereUniqueInput
    update?: XOR<XOR<MemoirUpdateToOneWithWhereWithoutTagsInput, MemoirUpdateWithoutTagsInput>, MemoirUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutMemoirTagsNestedInput = {
    create?: XOR<TagCreateWithoutMemoirTagsInput, TagUncheckedCreateWithoutMemoirTagsInput>
    connectOrCreate?: TagCreateOrConnectWithoutMemoirTagsInput
    upsert?: TagUpsertWithoutMemoirTagsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutMemoirTagsInput, TagUpdateWithoutMemoirTagsInput>, TagUncheckedUpdateWithoutMemoirTagsInput>
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

  export type MemoirCreateWithoutRepoInput = {
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    type: MemoirTypeCreateNestedOneWithoutMemoirsInput
    user: UserCreateNestedOneWithoutMemoirsInput
    tags?: MemoirTagCreateNestedManyWithoutMemoirInput
  }

  export type MemoirUncheckedCreateWithoutRepoInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    typeId: number
    tags?: MemoirTagUncheckedCreateNestedManyWithoutMemoirInput
  }

  export type MemoirCreateOrConnectWithoutRepoInput = {
    where: MemoirWhereUniqueInput
    create: XOR<MemoirCreateWithoutRepoInput, MemoirUncheckedCreateWithoutRepoInput>
  }

  export type MemoirCreateManyRepoInputEnvelope = {
    data: MemoirCreateManyRepoInput | MemoirCreateManyRepoInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutReposInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
    memoirs?: MemoirCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReposInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
    memoirs?: MemoirUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReposInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReposInput, UserUncheckedCreateWithoutReposInput>
  }

  export type MemoirUpsertWithWhereUniqueWithoutRepoInput = {
    where: MemoirWhereUniqueInput
    update: XOR<MemoirUpdateWithoutRepoInput, MemoirUncheckedUpdateWithoutRepoInput>
    create: XOR<MemoirCreateWithoutRepoInput, MemoirUncheckedCreateWithoutRepoInput>
  }

  export type MemoirUpdateWithWhereUniqueWithoutRepoInput = {
    where: MemoirWhereUniqueInput
    data: XOR<MemoirUpdateWithoutRepoInput, MemoirUncheckedUpdateWithoutRepoInput>
  }

  export type MemoirUpdateManyWithWhereWithoutRepoInput = {
    where: MemoirScalarWhereInput
    data: XOR<MemoirUpdateManyMutationInput, MemoirUncheckedUpdateManyWithoutRepoInput>
  }

  export type MemoirScalarWhereInput = {
    AND?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
    OR?: MemoirScalarWhereInput[]
    NOT?: MemoirScalarWhereInput | MemoirScalarWhereInput[]
    id?: IntFilter<"Memoir"> | number
    title?: StringFilter<"Memoir"> | string
    content?: StringFilter<"Memoir"> | string
    source?: StringFilter<"Memoir"> | string
    aiSum?: StringNullableFilter<"Memoir"> | string | null
    createdAt?: DateTimeFilter<"Memoir"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Memoir"> | Date | string | null
    userId?: StringFilter<"Memoir"> | string
    typeId?: IntFilter<"Memoir"> | number
    repoId?: IntFilter<"Memoir"> | number
  }

  export type UserUpsertWithoutReposInput = {
    update: XOR<UserUpdateWithoutReposInput, UserUncheckedUpdateWithoutReposInput>
    create: XOR<UserCreateWithoutReposInput, UserUncheckedCreateWithoutReposInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReposInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReposInput, UserUncheckedUpdateWithoutReposInput>
  }

  export type UserUpdateWithoutReposInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReposInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
    memoirs?: MemoirUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RepoCreateWithoutMemoirsInput = {
    name?: string | null
    user: UserCreateNestedOneWithoutReposInput
  }

  export type RepoUncheckedCreateWithoutMemoirsInput = {
    id?: number
    name?: string | null
    userId: string
  }

  export type RepoCreateOrConnectWithoutMemoirsInput = {
    where: RepoWhereUniqueInput
    create: XOR<RepoCreateWithoutMemoirsInput, RepoUncheckedCreateWithoutMemoirsInput>
  }

  export type MemoirTypeCreateWithoutMemoirsInput = {
    type: string
  }

  export type MemoirTypeUncheckedCreateWithoutMemoirsInput = {
    id?: number
    type: string
  }

  export type MemoirTypeCreateOrConnectWithoutMemoirsInput = {
    where: MemoirTypeWhereUniqueInput
    create: XOR<MemoirTypeCreateWithoutMemoirsInput, MemoirTypeUncheckedCreateWithoutMemoirsInput>
  }

  export type UserCreateWithoutMemoirsInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
    repos?: RepoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMemoirsInput = {
    id?: string
    username: string
    profileUrl?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    githubId: string
    repos?: RepoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMemoirsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMemoirsInput, UserUncheckedCreateWithoutMemoirsInput>
  }

  export type MemoirTagCreateWithoutMemoirInput = {
    tag: TagCreateNestedOneWithoutMemoirTagsInput
  }

  export type MemoirTagUncheckedCreateWithoutMemoirInput = {
    tagId: number
  }

  export type MemoirTagCreateOrConnectWithoutMemoirInput = {
    where: MemoirTagWhereUniqueInput
    create: XOR<MemoirTagCreateWithoutMemoirInput, MemoirTagUncheckedCreateWithoutMemoirInput>
  }

  export type MemoirTagCreateManyMemoirInputEnvelope = {
    data: MemoirTagCreateManyMemoirInput | MemoirTagCreateManyMemoirInput[]
    skipDuplicates?: boolean
  }

  export type RepoUpsertWithoutMemoirsInput = {
    update: XOR<RepoUpdateWithoutMemoirsInput, RepoUncheckedUpdateWithoutMemoirsInput>
    create: XOR<RepoCreateWithoutMemoirsInput, RepoUncheckedCreateWithoutMemoirsInput>
    where?: RepoWhereInput
  }

  export type RepoUpdateToOneWithWhereWithoutMemoirsInput = {
    where?: RepoWhereInput
    data: XOR<RepoUpdateWithoutMemoirsInput, RepoUncheckedUpdateWithoutMemoirsInput>
  }

  export type RepoUpdateWithoutMemoirsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutReposNestedInput
  }

  export type RepoUncheckedUpdateWithoutMemoirsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirTypeUpsertWithoutMemoirsInput = {
    update: XOR<MemoirTypeUpdateWithoutMemoirsInput, MemoirTypeUncheckedUpdateWithoutMemoirsInput>
    create: XOR<MemoirTypeCreateWithoutMemoirsInput, MemoirTypeUncheckedCreateWithoutMemoirsInput>
    where?: MemoirTypeWhereInput
  }

  export type MemoirTypeUpdateToOneWithWhereWithoutMemoirsInput = {
    where?: MemoirTypeWhereInput
    data: XOR<MemoirTypeUpdateWithoutMemoirsInput, MemoirTypeUncheckedUpdateWithoutMemoirsInput>
  }

  export type MemoirTypeUpdateWithoutMemoirsInput = {
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirTypeUncheckedUpdateWithoutMemoirsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutMemoirsInput = {
    update: XOR<UserUpdateWithoutMemoirsInput, UserUncheckedUpdateWithoutMemoirsInput>
    create: XOR<UserCreateWithoutMemoirsInput, UserUncheckedCreateWithoutMemoirsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMemoirsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMemoirsInput, UserUncheckedUpdateWithoutMemoirsInput>
  }

  export type UserUpdateWithoutMemoirsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
    repos?: RepoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMemoirsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubId?: StringFieldUpdateOperationsInput | string
    repos?: RepoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MemoirTagUpsertWithWhereUniqueWithoutMemoirInput = {
    where: MemoirTagWhereUniqueInput
    update: XOR<MemoirTagUpdateWithoutMemoirInput, MemoirTagUncheckedUpdateWithoutMemoirInput>
    create: XOR<MemoirTagCreateWithoutMemoirInput, MemoirTagUncheckedCreateWithoutMemoirInput>
  }

  export type MemoirTagUpdateWithWhereUniqueWithoutMemoirInput = {
    where: MemoirTagWhereUniqueInput
    data: XOR<MemoirTagUpdateWithoutMemoirInput, MemoirTagUncheckedUpdateWithoutMemoirInput>
  }

  export type MemoirTagUpdateManyWithWhereWithoutMemoirInput = {
    where: MemoirTagScalarWhereInput
    data: XOR<MemoirTagUpdateManyMutationInput, MemoirTagUncheckedUpdateManyWithoutMemoirInput>
  }

  export type MemoirTagScalarWhereInput = {
    AND?: MemoirTagScalarWhereInput | MemoirTagScalarWhereInput[]
    OR?: MemoirTagScalarWhereInput[]
    NOT?: MemoirTagScalarWhereInput | MemoirTagScalarWhereInput[]
    memoirId?: IntFilter<"MemoirTag"> | number
    tagId?: IntFilter<"MemoirTag"> | number
  }

  export type MemoirCreateWithoutUserInput = {
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    repo: RepoCreateNestedOneWithoutMemoirsInput
    type: MemoirTypeCreateNestedOneWithoutMemoirsInput
    tags?: MemoirTagCreateNestedManyWithoutMemoirInput
  }

  export type MemoirUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    typeId: number
    repoId: number
    tags?: MemoirTagUncheckedCreateNestedManyWithoutMemoirInput
  }

  export type MemoirCreateOrConnectWithoutUserInput = {
    where: MemoirWhereUniqueInput
    create: XOR<MemoirCreateWithoutUserInput, MemoirUncheckedCreateWithoutUserInput>
  }

  export type MemoirCreateManyUserInputEnvelope = {
    data: MemoirCreateManyUserInput | MemoirCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RepoCreateWithoutUserInput = {
    name?: string | null
    memoirs?: MemoirCreateNestedManyWithoutRepoInput
  }

  export type RepoUncheckedCreateWithoutUserInput = {
    id?: number
    name?: string | null
    memoirs?: MemoirUncheckedCreateNestedManyWithoutRepoInput
  }

  export type RepoCreateOrConnectWithoutUserInput = {
    where: RepoWhereUniqueInput
    create: XOR<RepoCreateWithoutUserInput, RepoUncheckedCreateWithoutUserInput>
  }

  export type RepoCreateManyUserInputEnvelope = {
    data: RepoCreateManyUserInput | RepoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MemoirUpsertWithWhereUniqueWithoutUserInput = {
    where: MemoirWhereUniqueInput
    update: XOR<MemoirUpdateWithoutUserInput, MemoirUncheckedUpdateWithoutUserInput>
    create: XOR<MemoirCreateWithoutUserInput, MemoirUncheckedCreateWithoutUserInput>
  }

  export type MemoirUpdateWithWhereUniqueWithoutUserInput = {
    where: MemoirWhereUniqueInput
    data: XOR<MemoirUpdateWithoutUserInput, MemoirUncheckedUpdateWithoutUserInput>
  }

  export type MemoirUpdateManyWithWhereWithoutUserInput = {
    where: MemoirScalarWhereInput
    data: XOR<MemoirUpdateManyMutationInput, MemoirUncheckedUpdateManyWithoutUserInput>
  }

  export type RepoUpsertWithWhereUniqueWithoutUserInput = {
    where: RepoWhereUniqueInput
    update: XOR<RepoUpdateWithoutUserInput, RepoUncheckedUpdateWithoutUserInput>
    create: XOR<RepoCreateWithoutUserInput, RepoUncheckedCreateWithoutUserInput>
  }

  export type RepoUpdateWithWhereUniqueWithoutUserInput = {
    where: RepoWhereUniqueInput
    data: XOR<RepoUpdateWithoutUserInput, RepoUncheckedUpdateWithoutUserInput>
  }

  export type RepoUpdateManyWithWhereWithoutUserInput = {
    where: RepoScalarWhereInput
    data: XOR<RepoUpdateManyMutationInput, RepoUncheckedUpdateManyWithoutUserInput>
  }

  export type RepoScalarWhereInput = {
    AND?: RepoScalarWhereInput | RepoScalarWhereInput[]
    OR?: RepoScalarWhereInput[]
    NOT?: RepoScalarWhereInput | RepoScalarWhereInput[]
    id?: IntFilter<"Repo"> | number
    name?: StringNullableFilter<"Repo"> | string | null
    userId?: StringFilter<"Repo"> | string
  }

  export type MemoirCreateWithoutTypeInput = {
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    repo: RepoCreateNestedOneWithoutMemoirsInput
    user: UserCreateNestedOneWithoutMemoirsInput
    tags?: MemoirTagCreateNestedManyWithoutMemoirInput
  }

  export type MemoirUncheckedCreateWithoutTypeInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    repoId: number
    tags?: MemoirTagUncheckedCreateNestedManyWithoutMemoirInput
  }

  export type MemoirCreateOrConnectWithoutTypeInput = {
    where: MemoirWhereUniqueInput
    create: XOR<MemoirCreateWithoutTypeInput, MemoirUncheckedCreateWithoutTypeInput>
  }

  export type MemoirCreateManyTypeInputEnvelope = {
    data: MemoirCreateManyTypeInput | MemoirCreateManyTypeInput[]
    skipDuplicates?: boolean
  }

  export type MemoirUpsertWithWhereUniqueWithoutTypeInput = {
    where: MemoirWhereUniqueInput
    update: XOR<MemoirUpdateWithoutTypeInput, MemoirUncheckedUpdateWithoutTypeInput>
    create: XOR<MemoirCreateWithoutTypeInput, MemoirUncheckedCreateWithoutTypeInput>
  }

  export type MemoirUpdateWithWhereUniqueWithoutTypeInput = {
    where: MemoirWhereUniqueInput
    data: XOR<MemoirUpdateWithoutTypeInput, MemoirUncheckedUpdateWithoutTypeInput>
  }

  export type MemoirUpdateManyWithWhereWithoutTypeInput = {
    where: MemoirScalarWhereInput
    data: XOR<MemoirUpdateManyMutationInput, MemoirUncheckedUpdateManyWithoutTypeInput>
  }

  export type MemoirTagCreateWithoutTagInput = {
    memoir: MemoirCreateNestedOneWithoutTagsInput
  }

  export type MemoirTagUncheckedCreateWithoutTagInput = {
    memoirId: number
  }

  export type MemoirTagCreateOrConnectWithoutTagInput = {
    where: MemoirTagWhereUniqueInput
    create: XOR<MemoirTagCreateWithoutTagInput, MemoirTagUncheckedCreateWithoutTagInput>
  }

  export type MemoirTagCreateManyTagInputEnvelope = {
    data: MemoirTagCreateManyTagInput | MemoirTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type MemoirTagUpsertWithWhereUniqueWithoutTagInput = {
    where: MemoirTagWhereUniqueInput
    update: XOR<MemoirTagUpdateWithoutTagInput, MemoirTagUncheckedUpdateWithoutTagInput>
    create: XOR<MemoirTagCreateWithoutTagInput, MemoirTagUncheckedCreateWithoutTagInput>
  }

  export type MemoirTagUpdateWithWhereUniqueWithoutTagInput = {
    where: MemoirTagWhereUniqueInput
    data: XOR<MemoirTagUpdateWithoutTagInput, MemoirTagUncheckedUpdateWithoutTagInput>
  }

  export type MemoirTagUpdateManyWithWhereWithoutTagInput = {
    where: MemoirTagScalarWhereInput
    data: XOR<MemoirTagUpdateManyMutationInput, MemoirTagUncheckedUpdateManyWithoutTagInput>
  }

  export type MemoirCreateWithoutTagsInput = {
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    repo: RepoCreateNestedOneWithoutMemoirsInput
    type: MemoirTypeCreateNestedOneWithoutMemoirsInput
    user: UserCreateNestedOneWithoutMemoirsInput
  }

  export type MemoirUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    typeId: number
    repoId: number
  }

  export type MemoirCreateOrConnectWithoutTagsInput = {
    where: MemoirWhereUniqueInput
    create: XOR<MemoirCreateWithoutTagsInput, MemoirUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutMemoirTagsInput = {
    name: string
  }

  export type TagUncheckedCreateWithoutMemoirTagsInput = {
    id?: number
    name: string
  }

  export type TagCreateOrConnectWithoutMemoirTagsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutMemoirTagsInput, TagUncheckedCreateWithoutMemoirTagsInput>
  }

  export type MemoirUpsertWithoutTagsInput = {
    update: XOR<MemoirUpdateWithoutTagsInput, MemoirUncheckedUpdateWithoutTagsInput>
    create: XOR<MemoirCreateWithoutTagsInput, MemoirUncheckedCreateWithoutTagsInput>
    where?: MemoirWhereInput
  }

  export type MemoirUpdateToOneWithWhereWithoutTagsInput = {
    where?: MemoirWhereInput
    data: XOR<MemoirUpdateWithoutTagsInput, MemoirUncheckedUpdateWithoutTagsInput>
  }

  export type MemoirUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repo?: RepoUpdateOneRequiredWithoutMemoirsNestedInput
    type?: MemoirTypeUpdateOneRequiredWithoutMemoirsNestedInput
    user?: UserUpdateOneRequiredWithoutMemoirsNestedInput
  }

  export type MemoirUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    repoId?: IntFieldUpdateOperationsInput | number
  }

  export type TagUpsertWithoutMemoirTagsInput = {
    update: XOR<TagUpdateWithoutMemoirTagsInput, TagUncheckedUpdateWithoutMemoirTagsInput>
    create: XOR<TagCreateWithoutMemoirTagsInput, TagUncheckedCreateWithoutMemoirTagsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutMemoirTagsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutMemoirTagsInput, TagUncheckedUpdateWithoutMemoirTagsInput>
  }

  export type TagUpdateWithoutMemoirTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutMemoirTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MemoirCreateManyRepoInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    typeId: number
  }

  export type MemoirUpdateWithoutRepoInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: MemoirTypeUpdateOneRequiredWithoutMemoirsNestedInput
    user?: UserUpdateOneRequiredWithoutMemoirsNestedInput
    tags?: MemoirTagUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateWithoutRepoInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    tags?: MemoirTagUncheckedUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateManyWithoutRepoInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoirTagCreateManyMemoirInput = {
    tagId: number
  }

  export type MemoirTagUpdateWithoutMemoirInput = {
    tag?: TagUpdateOneRequiredWithoutMemoirTagsNestedInput
  }

  export type MemoirTagUncheckedUpdateWithoutMemoirInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoirTagUncheckedUpdateManyWithoutMemoirInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoirCreateManyUserInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    typeId: number
    repoId: number
  }

  export type RepoCreateManyUserInput = {
    id?: number
    name?: string | null
  }

  export type MemoirUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repo?: RepoUpdateOneRequiredWithoutMemoirsNestedInput
    type?: MemoirTypeUpdateOneRequiredWithoutMemoirsNestedInput
    tags?: MemoirTagUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    typeId?: IntFieldUpdateOperationsInput | number
    repoId?: IntFieldUpdateOperationsInput | number
    tags?: MemoirTagUncheckedUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    typeId?: IntFieldUpdateOperationsInput | number
    repoId?: IntFieldUpdateOperationsInput | number
  }

  export type RepoUpdateWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    memoirs?: MemoirUpdateManyWithoutRepoNestedInput
  }

  export type RepoUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    memoirs?: MemoirUncheckedUpdateManyWithoutRepoNestedInput
  }

  export type RepoUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MemoirCreateManyTypeInput = {
    id?: number
    title: string
    content: string
    source: string
    aiSum?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    userId: string
    repoId: number
  }

  export type MemoirUpdateWithoutTypeInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repo?: RepoUpdateOneRequiredWithoutMemoirsNestedInput
    user?: UserUpdateOneRequiredWithoutMemoirsNestedInput
    tags?: MemoirTagUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    repoId?: IntFieldUpdateOperationsInput | number
    tags?: MemoirTagUncheckedUpdateManyWithoutMemoirNestedInput
  }

  export type MemoirUncheckedUpdateManyWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    aiSum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    repoId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoirTagCreateManyTagInput = {
    memoirId: number
  }

  export type MemoirTagUpdateWithoutTagInput = {
    memoir?: MemoirUpdateOneRequiredWithoutTagsNestedInput
  }

  export type MemoirTagUncheckedUpdateWithoutTagInput = {
    memoirId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoirTagUncheckedUpdateManyWithoutTagInput = {
    memoirId?: IntFieldUpdateOperationsInput | number
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