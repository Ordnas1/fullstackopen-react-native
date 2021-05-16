import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem item={item} />;

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return ( !error ? !loading &&
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    /> : <View>{error.message}</View>
  );
};

export default RepositoryList;
