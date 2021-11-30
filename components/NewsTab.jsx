import React, { useState, useContext } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { NewsContext } from "../API/Context";
import DiscoverScreen from "../screens/DiscoverScreen";
import NewsScreen from "../screens/NewsScreen";
import TopNavigation from "./TopNavigation";

const NewsTab = () => {
    const layout = useWindowDimensions();
    // const [index, setIndex] = useState(1);

    const {index, setIndex}= useContext(NewsContext)

    const [routes] = useState([
        {
            key: "first",
            title: "Discover",
        },
        {
            key: "second",
            title: "News",
        },
    ]);

    const renderScene = SceneMap({
        first: DiscoverScreen,
        second: NewsScreen,
    });
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={() => <TopNavigation index={index} setIndex={ setIndex}/>}
        />
    );
};

export default NewsTab;

const styles = StyleSheet.create({});
