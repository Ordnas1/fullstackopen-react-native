import React from "react";
import { View, StyleSheet, Image } from "react-native";

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

  return (
    <View style={styles.container}>
      <ItemContent item={item} />
      <DataShow metrics={metricsData} />
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
    <Text fontWeight="bold">{formatNumber(data)}</Text>
    <Text>{descriptor}</Text>
  </View>
);

const TextContent = ({ fullName, description, language }) => (
  <View style={styles.flexTextContainer}>
    <Text fontWeight="bold">{fullName}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.languagePill}>
      <Text style={styles.languagePillText}>{language}</Text>
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
