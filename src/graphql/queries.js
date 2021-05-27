import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          createdAt
          description
          forksCount
          fullName
          id
          language
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const IS_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      createdAt
      description
      forksCount
      fullName
      id
      url
      language
      name
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      stargazersCount
      reviews(first: $first, after: $after) {
        edges {
          node {
            createdAt
            id
            text
            rating
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
