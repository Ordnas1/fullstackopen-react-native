import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  console.log("[User Review Hooks]", data)
  return {
    repository: data?.repository,
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
