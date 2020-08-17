import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
  __typename?: 'Client';
  _id: Scalars['ID'];
  client_id: Scalars['String'];
  client_secret: Scalars['String'];
  redirect_uris: Maybe<Scalars['String']>[];
};

export type ClientInput = {
  client_id: Scalars['String'];
  client_secret: Scalars['String'];
  redirect_uris: Maybe<Scalars['String']>[];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient: SaveClientResponse;
  updateClient: SaveClientResponse;
  deleteClient: SaveClientResponse;
};


export type MutationAddClientArgs = {
  clientInput: ClientInput;
};


export type MutationUpdateClientArgs = {
  client_id: Scalars['String'];
  updateInput: UpdateInput;
};


export type MutationDeleteClientArgs = {
  client_id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  clients: Maybe<Client>[];
  client?: Maybe<Client>;
};


export type QueryClientArgs = {
  client_id: Scalars['String'];
};

export type SaveClientResponse = {
  __typename?: 'SaveClientResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  client?: Maybe<Client>;
};

export type UpdateInput = {
  client_secret: Scalars['String'];
  redirect_uris: Maybe<Scalars['String']>[];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Client: ResolverTypeWrapper<Client>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  ClientInput: ClientInput;
  SaveClientResponse: ResolverTypeWrapper<SaveClientResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UpdateInput: UpdateInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Client: Client;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Mutation: {};
  ClientInput: ClientInput;
  SaveClientResponse: SaveClientResponse;
  Boolean: Scalars['Boolean'];
  UpdateInput: UpdateInput;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  client_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client_secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redirect_uris?: Resolver<Maybe<ResolversTypes['String']>[], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addClient?: Resolver<ResolversTypes['SaveClientResponse'], ParentType, ContextType, RequireFields<MutationAddClientArgs, 'clientInput'>>;
  updateClient?: Resolver<ResolversTypes['SaveClientResponse'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'client_id' | 'updateInput'>>;
  deleteClient?: Resolver<ResolversTypes['SaveClientResponse'], ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'client_id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  clients?: Resolver<Maybe<ResolversTypes['Client']>[], ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'client_id'>>;
};

export type SaveClientResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaveClientResponse'] = ResolversParentTypes['SaveClientResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Client?: ClientResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SaveClientResponse?: SaveClientResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
