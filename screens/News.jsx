import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, TextInput } from "react-native";
import NewsItem from "./NewsItem";
import { Feather } from '@expo/vector-icons';
import Spinner from "./Spinner";
import { useRoute } from "@react-navigation/native";

const News = () => {
  const route = useRoute();
  const { country, pagesize, category } = route.params;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(38);

  const capitalize = (str) => {
    if (str) {
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
      return capitalized;
    } else {
      console.log("str is undefined");
    }
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=75c7fbc663db4439b83cdadb0ddf531c&page=${page + 1}&pagesize=${pagesize}`;
    setPage(page + 1);
    let data = await fetch(url);
    if(data){
    let parseData = await data.json();
    setArticles([...articles, ...parseData.articles]);
    }else{
      console.log("fetch more data me hai :",data)
    }
  };

  const renderItem = ({ item }) => (
    // Include conditions here to filter out unwanted items
    item.title != "[Removed]" &&
    item.title != null &&
    item.description != "[Removed]" &&
    item.description != null &&
    item.author != null && (
      <View style={{ marginBottom: 16 ,alignItems:"center",justifyContent:"center"}} key={item.url}>
        <NewsItem
          title={item.title ? item.title.slice(0, 60) : ""}
          description={
            item.description ? item.description.slice(0, 100) : "Not Available..."
          }
          imageurl={item.urlToImage}
          newsurl={item.url}
          author={item.author}
          date={item.publishedAt}
        />
      </View>
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=75c7fbc663db4439b83cdadb0ddf531c&page=${page}&pagesize=${pagesize}`;
      setLoading(true);
      let data = await fetch(url);
      let parseData = await data.json();
      setLoading(false);
      setArticles(parseData.articles);
      setTotal(parseData.totalResults);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={{paddingLeft:20,display:"flex",flexDirection:"row"}}>
      <Text style={{ textAlign: 'start',marginTop:60,marginBottom:20 ,fontSize:24, fontWeight:"bold" }}>
          News<Text style={{color:"#6C44E9"}} >Monkey</Text>
      </Text>
      <View style={{borderWidth:2, borderColor:"#6C44E9",borderRadius:20,paddingHorizontal:5,width:160,display:"flex",alignItems:"center",gap:5,flexDirection:"row",marginTop:60,marginBottom:20,marginLeft:20, fontSize:24, fontWeight:"bold" }}>
       <Feather name="search" size={20} color="#6C44E9" /> 
       <TextInput placeholder="search..." />
      </View>
      </View>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.url} 
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

export default News;
