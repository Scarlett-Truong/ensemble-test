import React, { Component } from 'react'
import { Link } from "gatsby";
import {Form} from 'react-bootstrap';

export default class FilmsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      filteredSearchData: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({filter: event.target.value});
    if(this.state.filter){
      const lowercasedFilter = this.state.filter.toLowerCase();
      const filteredSearchData = this.props.films.filter(item => {
        return Object.keys(item).some(key => {
          if(key === 'title' || key === 'opening_crawl'){
            if(item[key].toString().toLowerCase().includes(lowercasedFilter) && lowercasedFilter !== null) {
              return item[key];
            }
          }
        });
      });
      this.setState({ filteredSearchData });
    }
    else this.setState({ filteredSearchData: [] });
  }

  render() {
    const films = (this.state.filteredSearchData && this.state.filteredSearchData.length > 0) ? this.state.filteredSearchData : this.props.films
    return (
      <>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Search</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter movie title" 
              value={this.state.filter} 
              onChange={this.handleChange}/>
          </Form.Group>
        </Form>

        <div>
          {films.map((film, index) => {
              return (
                <div key={index} className="main">
                  <div className="card-body">
                    <h3>
                      <Link to={`/films/${film.title.toLowerCase().replace(/\s+/g, '-')}`} className="links">{film.title}</Link>
                    </h3>
                    <p>{film.opening_crawl}</p>
                  </div>
                </div>
              )
          })}
        </div>
      </>
    )
  }
}