import React, {useContext} from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
} from "react-native";
import { NewsContext } from "../API/Context";
   const width = Dimensions.get("window").width;
   const height = Dimensions.get("window").height;
const SingleNews = ({ item, index }) => {
    const { loading, darkTheme } = useContext(NewsContext)
   
 
    return (
        <View style={{ width, height, transform: [{ scaleY: -1 }] }}>
            <Image
                source={{ uri: item.urlToImage }}
                style={{ height: "45%", resizeMode: "cover", width }}
            />
            <View style={{ ...styles.description, backgroundColor: "#282c35" }}>
                <Text style={{ ...styles.title, color: "white" }}>
                    {item.title}
                </Text>
                <Text style={{ ...styles.content, color: "white" }}>
                    {item.description}
                </Text>
                <Text style={{ color: darkTheme ? "white" : "black" }}>
                    Short by:
                    <Text> {item.author ?? "unknown"}</Text>
                </Text>
                <ImageBackground
                    source={{ uri: item.urlToImage }}
                    blurRadius={30}
                    style={styles.footer}
                >
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                        <Text
                            style={{
                                fontSize: 15,
                                color: darkTheme ? "white" : "black",
                            }}
                        >
                            {item.content?.slice(0, 45)}...
                        </Text>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "bold",
                                color: darkTheme ? "white" : "black",
                            }}
                        >
                            Read More
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>
    );
};

export default SingleNews;

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    content: {
        fontSize: 18,
        paddingBottom: 10,
    },
    footer: {
        height: 80,
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#d7be68",
        justifyContent: "center",
        paddingHorizontal:20
    }, 
    description: {
        padding: 15,
        flex:1,
    }
});
