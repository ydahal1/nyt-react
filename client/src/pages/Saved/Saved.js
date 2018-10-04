import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import SaveBtn from "../../components/SaveBtn";

class Search extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  componentDidMount() {
    this.loadArticles();
  }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  loadArticles = () => {
    API.getArticles()
      .then(res =>
          this.setState({articles: res.data})
        )
      .catch(err => console.log(err));
  };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  deleteArticleSubmit = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {this.state.articles.length ? (
              <div className="panel panel-primary">
                <div className="panel-heading"><h4>Saved Articles</h4></div>
                <div className="panel-body">
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem
                        key={article._id}
                        headline={article.headline}
                        link={article.link}
                        date={article.date}
                      >
                        <DeleteBtn onClick={() => this.deleteArticleSubmit(article._id)} />
                      </ListItem>))}
                  </List>
                </div>
              </div>
              ) : (
              <ul className="list-group">
                <li className="list-group-item"><h3><em>No Saved Articles</em></h3></li>
              </ul>)
            }
          </Col>
        </Row>
      </Container>
          // <Col size="md-6">
          //   <Jumbotron>
          //     <h1>Books On My List</h1>
          //   </Jumbotron>
          //   {this.state.books.length ? (
          //     <List>
          //       {this.state.books.map(book => (
          //         <ListItem key={book._id}>
          //           <Link to={"/books/" + book._id}>
          //             <strong>
          //               {book.title} by {book.author}
          //             </strong>
          //           </Link>
          //           <DeleteBtn onClick={() => this.deleteBook(book._id)} />
          //         </ListItem>
          //       ))}
          //     </List>
          //   ) : (
          //     <h3>No Results to Display</h3>
          //   )}
          // </Col>
    );
  }
}

export default Search;
