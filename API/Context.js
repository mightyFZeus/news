import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { getNewsAPI, getSourceAPI } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState("general");
    const [index, setIndex] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sources, setSources] = useState();
    const [darkTheme, setDarkTheme] = useState(true)

    const fetchNews = async (reset = category) => {
        setLoading(true);
        const { data } = await axios.get(getNewsAPI(reset));

        setNews(data);

        setIndex(1);
        setLoading(false);
    };

    const fetchNewsFromSource = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(getSourceAPI(sources));
            setNews(data);
            setIndex(1);
        setLoading(false);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [category]);

     useEffect(() => {
         
         fetchNewsFromSource();
     }, [sources]);

    const value = {
        news,
        index,
        setIndex,
        fetchNews,
        loading,
        setCategory,
        setSources,
        darkTheme,
        setDarkTheme,
    };
    return (
        <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
    );
};

export default Context;
