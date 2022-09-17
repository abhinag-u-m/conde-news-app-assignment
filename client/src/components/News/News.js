import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "../NewsItem/NewsItem";
import Skeleton from "../Skeleton/Skeleton";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Nullimage from "../../components/Images/nullimage.png";
import { Row, Col } from "react-bootstrap";
import { Header, Container, card } from "./index";
import { header } from "../../config/config";
import { API_KEY } from '../../config/config';


function News(props) {
  const { queryValue } = props;
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${capitaLize(props.category)} - News App`;

  const updatenews = async () => {
    try {
      props.setProgress(15);
      // server data fetch
      const response = await axios.get(
          'http://localhost:8000/getTopHeadlinesOnCategory',
          {
              params: {country: props.country, apiKey: API_KEY, category: props.category, page: page, pageSize: props.pageSize}
          }
        )

      setLoading(true);
      props.setProgress(70);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updatenews();
  }, []);

  const fetchMoreData = async () => {
    let url = queryValue && queryValue.length > 0 ? 'http://localhost:8000/getTopHeadlinesOnSearchQuery' : 'http://localhost:8000/getTopHeadlinesOnCategory';
    let paramsData =  queryValue && queryValue.length > 0 ?
    {country: props.country, apiKey: API_KEY, category: props.category, page: page + 1, pageSize: props.pageSize, queryValue: queryValue } :
    {country: props.country, apiKey: API_KEY, category: props.category, page: page + 1, pageSize: props.pageSize}
    const response = await axios.get(
      url,
      {
          params: paramsData
      }
    )
    setPage(page + 1);
    const parsedData = response.data;
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


  const searchQueryHandler = async () => {
    let queryValueExist = queryValue && queryValue.length > 0;
    if(queryValueExist) {
      try {
        props.setProgress(15);
        // server data fetch
        const response = await axios.get(
            'http://localhost:8000/getTopHeadlinesOnSearchQuery',
            {
                params: {country: props.country, apiKey: API_KEY, category: props.category, page: page, pageSize: props.pageSize, queryValue: queryValue }
            }
          )
  
        setLoading(true);
        props.setProgress(70);
        const parsedData = response.data;
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  const callLimit = () => {
    let timer = 0;
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchQueryHandler();
    }, 1000);
  }

  useEffect(() => {
    callLimit();
  }, [queryValue])

  return (
    <>
      <Header>
        {header(capitaLize(props.category))}
      </Header>
      {loading && <Skeleton />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <Container>
          <Row>
            {articles.map((element) => {
              return (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={card}
                  key={element.url}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    author={element.author}
                    date={element.publishedAt}
                    channel={element.source.name}
                    alt="Card image"
                    publishedAt={element.publishedAt}
                    imageUrl={
                      element.urlToImage === null
                        ? Nullimage
                        : element.urlToImage
                    }
                    urlNews={element.url}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "us",
  pageSize: 7,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
