import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.colors.white,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  flexTextContainer: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    flexGrow: 1,
    marginLeft: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatar: {
    width: 60,
    height: 60,
    flexGrow: 0,
  },
  description: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  languagePill: {
    display: "flex",
    backgroundColor: theme.colors.primary,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 6,
    borderRadius: 6,
    marginTop: 14,
  },
  languagePillText: {
    color: theme.colors.white,
  },
  dataShow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  dataShowDetail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    backgroundColor: theme.colors.primary,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.primary,
  },
  buttonText: {
    color: "white",
  },
});

const formatNumber = (number) => {
  return Number(number) > 1000
    ? `${Math.round(Number(number) / 100) / 10}k`
    : number;
};

const RepositoryItem = ({ item }) => {
  
  const metricsData = [
    {
      data: item.forksCount,
      descriptor: "Forks",
    },
    {
      data: item.stargazersCount,
      descriptor: "Stars",
    },
    {
      data: item.reviewCount,
      descriptor: "Reviews",
    },
    {
      data: item.ratingAverage,
      descriptor: "Rating",
    },
  ];

  const handlePress = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="RepositoryItem">
      <ItemContent item={item} />
      <DataShow metrics={metricsData} />
      {item.url && (
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Go to GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};
export default RepositoryItem;

const DataShow = ({ metrics }) => (
  <View style={styles.dataShow}>
    {metrics.map((metric) => (
      <DataShowDetail key={metric.descriptor} {...metric} />
    ))}
  </View>
);

const DataShowDetail = ({ data, descriptor }) => (
  <View style={styles.dataShowDetail}>
    <Text fontWeight="bold" testID="dataValue">
      {formatNumber(data)}
    </Text>
    <Text testID="dataDescriptor">{descriptor}</Text>
  </View>
);

const TextContent = ({ fullName, description, language }) => (
  <View style={styles.flexTextContainer}>
    <Text fontWeight="bold" testID="fullName">
      {fullName}
    </Text>
    <Text style={styles.description} testID="description">
      {description}
    </Text>
    <View style={styles.languagePill}>
      <Text style={styles.languagePillText} testID="language">
        {language}
      </Text>
    </View>
  </View>
);

const ItemContent = ({ item }) => (
  <View style={styles.flexContainer}>
    <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
    <TextContent
      fullName={item.fullName}
      description={item.description}
      language={item.language}
    ></TextContent>
  </View>
);
