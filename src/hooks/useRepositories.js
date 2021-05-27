import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortingPrinciple, filterString, first) => {
  var sortVariables = "";

  switch (sortingPrinciple) {
    case "latestRepositories":
      sortVariables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
    case "highestRatedRepositories":
      sortVariables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
    case "lowestRatedRepositories":
      sortVariables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    default:
      console.warn(
        "WARNING: Invalid sortingPrinciple, defaulting to 'latestRepository'"
      );
      sortVariables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
  }
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: sortVariables.orderBy,
      orderDirection: sortVariables.orderDirection,
      searchKeyword: filterString,
      first: first,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: sortVariables.orderBy,
        orderDirection: sortVariables.orderDirection,
        searchKeyword: filterString,
        first: first,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
