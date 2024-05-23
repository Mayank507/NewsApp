import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     page: 1,
  //     loading: true,
  //     totalResults: 0,
  //     hasMore: true,
  //   };
  //   document.title = `News -${this.props.category}`;
  // }

  //   async componentDidMount() {
  //     try {
  //       const url =
  //         "https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={process.env.API_KEY}";
  //       const respe = await fetch(url);
  //       const data = await respe.json();
  //       this.setState({ articles: data.articles });
  //     } catch (error) {
  //       console.log(error, "error");
  //     }
  //   }
  const handleRequest = useCallback(() => {
    props.setProgress(20);
    setLoading({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={process.env.API_KEY}&pageSize=${props.calculatePageSize}`;
    fetch(url)
      .then((response) => {
        // console.log(response);
        // this.props.setProgress(30);
        return response.json();
      })
      .then((data) => {
        // console.log(data.articles);
        setLoading({ loading: false });
        setArticles(data.articles);
        setTotalResults(data.totalResults);

        props.setProgress(100);
        // this.props.setProgress(50);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [props]);
  useEffect(() => {
    document.title = `News - ${props.category}`;
    handleRequest();
  }, [handleRequest, props.category]);

  // handleNextClick = () => {
  //   if (
  //     page + 1 >
  //     Math.ceil(totalResults / this.props.pageSize)
  //   ) {
  //   } else {
  //     this.setState({
  //       loading: false,
  //       page: page + 1,
  //     });
  //     this.handleRequest();
  //   }
  // };

  // handlePrevClick = () => {
  //   this.setState({
  //     loading: false,
  //     page: page - 1,
  //   });
  //   this.handleRequest();
  // };

  const fetchData = () => {
    setPage({ page: page + 1 });

    setLoading({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={process.env.API_KEY}&pageSize=${props.pageSize}&page=${page}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setLoading(false);
          setArticles(articles.concat(data.articles));
          setTotalResults(data.totalResults);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <div className="container" style={{ marginTop: "65px" }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1 className="text-center">{props.category} News</h1>
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div
            className="row"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            {/* {loading && <Spinner />} */}
            {articles.map(
              (article, index) =>
                (article.title || article.description || article.imgUrl) && (
                  <NewsItem
                    key={index}
                    title={article.title}
                    description={article.description}
                    imgUrl={article.urlToImage}
                    postUrl={article.url}
                    index={index}
                    author={article.author}
                    publishedAt={article.publishedAt}
                  />
                )
            )}
          </div>
        </InfiniteScroll>
      </div>
      {/* <div className="container d-flex justify-content-between">
          <button
            onClick={this.handlePrevClick}
            type="button"
            className="btn btn-dark"
            disabled={page <= 1}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
            type="button"
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};
News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 5,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
