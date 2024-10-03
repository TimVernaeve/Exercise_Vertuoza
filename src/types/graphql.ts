import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Company = Entity & {
  __typename?: 'Company';
  contactEmail?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  industry: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Contact = Entity & {
  __typename?: 'Contact';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type CreateEntityInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  entityType: EntityType;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Entity = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum EntityType {
  Company = 'COMPANY',
  Contact = 'CONTACT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createEntity?: Maybe<Entity>;
  updateEntity?: Maybe<Entity>;
};


export type MutationCreateEntityArgs = {
  input?: InputMaybe<CreateEntityInput>;
};


export type MutationUpdateEntityArgs = {
  input?: InputMaybe<UpdateEntityInput>;
};

export type Query = {
  __typename?: 'Query';
  getEntities?: Maybe<Array<Maybe<Entity>>>;
  getEntity?: Maybe<Entity>;
};


export type QueryGetEntityArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateEntityInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  entityType: EntityType;
  id: Scalars['ID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntitiesQuery = { __typename?: 'Query', getEntities?: Array<{ __typename?: 'Company', industry: string, contactEmail?: string | null, id: string, name: string } | { __typename?: 'Contact', email: string, phone?: string | null, id: string, name: string } | null> | null };

export type CreateEntityMutationVariables = Exact<{
  input: CreateEntityInput;
}>;


export type CreateEntityMutation = { __typename?: 'Mutation', createEntity?: { __typename?: 'Company', industry: string, contactEmail?: string | null, id: string, name: string } | { __typename?: 'Contact', email: string, phone?: string | null, id: string, name: string } | null };

export type UpdateEntityMutationVariables = Exact<{
  input: UpdateEntityInput;
}>;


export type UpdateEntityMutation = { __typename?: 'Mutation', updateEntity?: { __typename?: 'Company', industry: string, contactEmail?: string | null, id: string, name: string } | { __typename?: 'Contact', email: string, phone?: string | null, id: string, name: string } | null };


export const GetEntitiesDocument = gql`
    query GetEntities {
  getEntities {
    id
    name
    ... on Company {
      industry
      contactEmail
    }
    ... on Contact {
      email
      phone
    }
  }
}
    `;

/**
 * __useGetEntitiesQuery__
 *
 * To run a query within a React component, call `useGetEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEntitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetEntitiesQuery, GetEntitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEntitiesQuery, GetEntitiesQueryVariables>(GetEntitiesDocument, options);
      }
export function useGetEntitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEntitiesQuery, GetEntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEntitiesQuery, GetEntitiesQueryVariables>(GetEntitiesDocument, options);
        }
export function useGetEntitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEntitiesQuery, GetEntitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEntitiesQuery, GetEntitiesQueryVariables>(GetEntitiesDocument, options);
        }
export type GetEntitiesQueryHookResult = ReturnType<typeof useGetEntitiesQuery>;
export type GetEntitiesLazyQueryHookResult = ReturnType<typeof useGetEntitiesLazyQuery>;
export type GetEntitiesSuspenseQueryHookResult = ReturnType<typeof useGetEntitiesSuspenseQuery>;
export type GetEntitiesQueryResult = Apollo.QueryResult<GetEntitiesQuery, GetEntitiesQueryVariables>;
export const CreateEntityDocument = gql`
    mutation CreateEntity($input: CreateEntityInput!) {
  createEntity(input: $input) {
    id
    name
    ... on Company {
      industry
      contactEmail
    }
    ... on Contact {
      email
      phone
    }
  }
}
    `;
export type CreateEntityMutationFn = Apollo.MutationFunction<CreateEntityMutation, CreateEntityMutationVariables>;

/**
 * __useCreateEntityMutation__
 *
 * To run a mutation, you first call `useCreateEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntityMutation, { data, loading, error }] = useCreateEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEntityMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntityMutation, CreateEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEntityMutation, CreateEntityMutationVariables>(CreateEntityDocument, options);
      }
export type CreateEntityMutationHookResult = ReturnType<typeof useCreateEntityMutation>;
export type CreateEntityMutationResult = Apollo.MutationResult<CreateEntityMutation>;
export type CreateEntityMutationOptions = Apollo.BaseMutationOptions<CreateEntityMutation, CreateEntityMutationVariables>;
export const UpdateEntityDocument = gql`
    mutation updateEntity($input: UpdateEntityInput!) {
  updateEntity(input: $input) {
    id
    name
    ... on Company {
      industry
      contactEmail
    }
    ... on Contact {
      email
      phone
    }
  }
}
    `;
export type UpdateEntityMutationFn = Apollo.MutationFunction<UpdateEntityMutation, UpdateEntityMutationVariables>;

/**
 * __useUpdateEntityMutation__
 *
 * To run a mutation, you first call `useUpdateEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntityMutation, { data, loading, error }] = useUpdateEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEntityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntityMutation, UpdateEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEntityMutation, UpdateEntityMutationVariables>(UpdateEntityDocument, options);
      }
export type UpdateEntityMutationHookResult = ReturnType<typeof useUpdateEntityMutation>;
export type UpdateEntityMutationResult = Apollo.MutationResult<UpdateEntityMutation>;
export type UpdateEntityMutationOptions = Apollo.BaseMutationOptions<UpdateEntityMutation, UpdateEntityMutationVariables>;