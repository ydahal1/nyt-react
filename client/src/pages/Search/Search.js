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

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  searchArticles = (event) => {
    event.preventDefault();
    API.findArticles(this.state.topic, this.state.startYear, this.state.endYear)
      .then(res => 
          {
          this.setState({articles: res.data.response.docs});
          console.log(this.state.articles);
        }
        )
        .catch( err => console.log(err));
  };

  saveArticleSubmit = (headline, link, date) => {
    console.log("Working");
      API.saveArticle({
        headline: headline,
        link: link,
        date: date
      })
        .then(res => console.log("saved article"))
        .catch(err => console.log(err));
  };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

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
          <div className="panel panel-primary">
          <div className="panel-heading"><h4>Query</h4></div>
          <div className="panel-body"> 
            <form>
              <h4>Topic</h4>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="topic"
              />
              <h4>Start Year</h4>
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="startYear"
              />
              <h4>End Year</h4>
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="endYear"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                onClick={this.searchArticles}
              >
                Submit
              </FormBtn>
            </form>
            </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.articles.length ? (
              <div className="panel panel-primary">
                <div className="panel-heading"><h4>Results</h4></div>
                <div className="panel-body">
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem
                        key={article._id}
                        headline={article.headline.main}
                        link={article.web_url}
                        date={article.pub_date}
                      >
                        <SaveBtn onClick={() => this.saveArticleSubmit(article.headline.main, article.web_url, article.pub_date)} />
                      </ListItem>))}
                  </List>
                </div>
              </div>
              ) : (
              <ul className="list-group">
                <li className="list-group-item"><h3><em>Enter Search Term to Begin</em></h3></li>
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
