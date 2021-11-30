import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import Carousel from "react-native-snap-carousel";
import { NewsContext } from '../API/Context'
import SingleNews from "../components/SingleNews";

const NewsScreen = () => {
    const windowHeight = Dimensions.get("screen").height
    const [activeIndex, setActiveindex] = useState()

    const { loading, news: { articles }, darkTheme } = useContext(NewsContext)
    

    
    console.log(articles)

     if (loading) {
         return (
             <View
                 style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center",
                 }}
             >
                 <ActivityIndicator size="large"   color={ darkTheme ? "white" : "black"} />
             </View>
         );
     }
    return (
        <View style={styles.carousel}>
            {articles && (
                <Carousel
                    layout={"stack"}
                    data={articles}
                    sliderHeight={300}
                    itemHeight={windowHeight}
                    vertical={true}
                    renderItem={({ item, index }) => (
                        <SingleNews item={item} index={index} />
                    )}
                    onSnapToItem={(index) => setActiveindex(index)}
                />
            )}
            {/* <ActivityIndicator size="large" color="#fff" /> */}
        </View>
    );
}

export default NewsScreen

const styles = StyleSheet.create({
    carousel:{
        flex: 1,
        transform: [{ scaleY: -1 }],
        backgroundColor:"black"
    }
});
