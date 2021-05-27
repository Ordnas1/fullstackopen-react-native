import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

import useReviews from "../hooks/useReviews";

import { GET_REPOSITORY } from "../graphql/queries";

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  reviewItemHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  reviewItemHeaderText: {
    display: "flex",
    flexDirection: "column",
  },
  reviewItemRatingCircle: {
    height: theme.components.rating.width,
    width: theme.components.rating.width,
    margin: 12,
    borderRadius: theme.components.rating.width / 2,
    borderColor: theme.colors.primary,
    borderStyle: "solid",
    borderWidth: theme.components.rating.borderWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewItemRatingText: {
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  reviewItemUsername: {
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    color: "black",
  },
  reviewItemCreatedAt: {
    color: theme.colors.textSecondary,
  },
  reviewItemText: {
    marginLeft: 72,
    marginRight: 12,
    marginBottom: 12,
  },
  separator: {
    height: 8,
  },
  repositoryItem: {
    marginBottom: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewItemHeader}>
        <View style={styles.reviewItemRatingCircle}>
          <Text style={styles.reviewItemRatingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewItemHeaderText}>
          <Text style={styles.reviewItemUsername}>{review.user.username}</Text>
          <Text style={styles.reviewItemCreatedAt}>
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewItemText}>{review.text}</Text>
    </View>
  );
};

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { loading, error, reviews, repository, fetchMore } = useReviews({
    id: repositoryId,
    first: 2,
  });

  const onEndReach = () => {
    console.log("end reached")
    fetchMore();
  };

  return (
    <>
      {error && (
        <Text>
          Error: {error.message} repository {repositoryId}
        </Text>
      )}

      {!error && (
        <FlatList
          data={reviews?.edges}
          renderItem={({ item }) => <ReviewItem review={item.node} />}
          ListHeaderComponent={() => <RepositoryItem item={repository} />}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponentStyle={styles.repositoryItem}
          style={styles.flatList}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};

export default SingleRepository;
