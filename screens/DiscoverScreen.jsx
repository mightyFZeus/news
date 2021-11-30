import React, {useContext} from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NewsContext } from '../API/Context'
import { categories, sources } from "../API/api";
import Carousel from "react-native-snap-carousel";
import Search from '../components/Search';


const width = Dimensions.get("window").width
const SLIDE_WIDTH = Math.round(width/ 3.5)
const DiscoverScreen = () => {
     const { setCategory, loading, setSources, darkTheme } = useContext(NewsContext);
    return (
        <View style={styles.discover}>
            {/* search */}
            <Search />

            {/* categories */}
            <Text
                style={{
                    ...styles.subtitle,
                    color: darkTheme ? "white" : "black",
                }}
            >
                Categories
            </Text>
            <Carousel
                layout={"default"}
                data={categories}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => setCategory(item.name)}
                    >
                        <Image
                            source={{ uri: item.pic }}
                            style={styles.categoryImage}
                        />
                        <Text
                            style={{
                                ...styles.name,
                                color: darkTheme ? "white" : "black",
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                sliderWidth={width}
                itemWidth={SLIDE_WIDTH}
                activeSlideAlignment={"start"}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
            />
            {/* sources */}
            <Text
                style={{
                    ...styles.subtitle,
                    color: darkTheme ? "white" : "black",
                }}
            >
                Sources
            </Text>
            <View style={styles.source}>
                {sources.map((s) => (
                    <TouchableOpacity
                        onPress={() => setSources(s.id)}
                        key={s.id}
                        style={styles.sourceContainer}
                    >
                        <Image
                            source={{ uri: s.pic }}
                            style={styles.sourceImage}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default DiscoverScreen

const styles = StyleSheet.create({
    discover: {
        padding: 10,
        alignItems: "center",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 8,
        marginHorizontal: 5,
        borderBottomColor: "#007fff",
        borderBottomWidth: 5,
        alignSelf: "flex-start",
        borderRadius: 10,
    },
    categoryImage: {
        height: "60%",
        width: "100%",
        resizeMode: "contain",
    },
    name: {
        fontSize: 14,
        textTransform: "capitalize",
    },
    category: {
        height: 130,
        margin: 10,
        alignItems: "center",
        justifyContent:"space-evenly"
        
    },
    sourceImage: {
        height: "100%",
        borderRadius: 10,
        resizeMode:"cover"
    },
    source: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingVertical:15
    },
    sourceContainer: {
        height: 150,
        width: "40%",
        borderRadius: 10,
        backgroundColor: "#cc313d",
        margin:15
    }
});
