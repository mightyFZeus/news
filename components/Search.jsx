import React, { useContext, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { NewsContext } from "../API/Context";import {
   Entypo
} from "@expo/vector-icons";
import SingleNews from "./SingleNews";
import { MaterialIcons } from "@expo/vector-icons";

const Search = () => {
    const {
        news: { articles }, darkTheme
    } = useContext(NewsContext);
    const [searchResults, setsearchResults] = useState([]);
    const [modal, setModal] = useState(false);
    const [currentNews, setCurrentNews] = useState();
    const [showResult, setShowResult] = useState(true)

    const handleSearch = (text) => {
        if (!text) {
            setsearchResults([]);
            return;
        }
         

        setsearchResults(
            articles.filter((query) => query.title.includes(text))
        );
        setShowResult(true)
       
    };

    const handleModal = (n) => {
        setModal(true);
        setCurrentNews(n);
    };
    return (
        <View style={{ width: "100%", position: "relative" }}>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={{
                        ...styles.search,
                        backgroundColor: darkTheme ? "black" : "lightgrey",
                        color: darkTheme ? "white" : "black",
                        width: "90%",
                    }}
                    placeholder="Search for news"
                    placeholderTextColor="#fff"
                    onChangeText={(text) => handleSearch(text)}
                />
                <MaterialIcons
                    name="cancel"
                    size={40}
                    color={darkTheme ? "white" : "black"}
                    onPress={() => setShowResult(false)}
                />
            </View>
            {showResult && (
                <View style={styles.searchresults}>
                    {searchResults.slice(0, 10).map((n) => (
                        <TouchableOpacity
                            key={n.title}
                            activeOpacity={0.7}
                            onPress={() => handleModal(n)}
                        >
                            <Text
                                style={{
                                    ...styles.singleResult,
                                    backgroundColor: darkTheme ? "black" : "white",
                                    color: darkTheme ? "white" : "black",
                                }}
                            >
                                {n.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        right: 0,
                        margin: 20,
                        marginTop: 50,
                    }}
                >
                    <Entypo
                        name="circle-with-cross"
                        size={30}
                        color="white"
                        onPress={() => setModal(!modal)}
                    />
                </TouchableOpacity>
                <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
                    <SingleNews item={currentNews} />
                </View>
            </Modal>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    search: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 15,
    },
    searchresults: {
        position: "absolute",
        zIndex: 1,
        top: 50,
    },
});
