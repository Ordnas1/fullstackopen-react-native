import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import { useHistory } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const RepositoryHeader = ({
  sortState,
  setSortState,
  filterState,
  setFilterState,
}) => {
  return (
    <>
      <Picker
        selectedValue={sortState}
        onValueChange={(itemValue, itemindex) => setSortState(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latestRepositories" />
        <Picker.Item
          label="Highest rated repositories"
          value="highestRatedRepositories"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="lowestRatedRepositories"
        />
      </Picker>
      <Searchbar
        placeholder="Filter repository"
        onChangeText={(query) => setFilterState(query)}
        value={filterState}
      />
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;
const RenderItem = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export const RepositoryListContainer = ({
  repositories,
  loading,
  error,
  sortState,
  setSortState,
  filterState,
  setFilterState,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const history = useHistory();

  const redirectToItem = (id) => {
    history.push(`/${id}`);
  };

  return (
    <>
      {error && <Text>{error.message}</Text>}
      {!error && !loading && (
        <FlatList
          data={repositoryNodes}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <RenderItem item={item} onPress={() => redirectToItem(item.id)} />
          )}
          ListHeaderComponent={
            <RepositoryHeader
              sortState={sortState}
              setSortState={setSortState}
              filterState={filterState}
              setFilterState={setFilterState}
            />
          }
        />
      )}
    </>
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState("latestRepositories");
  const [filterNonDebounced, setFilter] = useState("");
  const [filter] = useDebounce(filterNonDebounced, 500);
  const { repositories, error, fetchMore } = useRepositories(
    sort,
    filter,
    5
  );

  const onEndReach = () => {
    fetchMore();
  };
  return (
    <RepositoryListContainer
      repositories={repositories}
      
      error={error}
      sortState={sort}
      setSortState={setSort}
      filterState={filter}
      setFilterState={setFilter}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
