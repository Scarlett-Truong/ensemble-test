import React from "react";
import {ListGroup} from 'react-bootstrap';
import { Link } from "gatsby"
import { Query } from 'react-apollo'
import { GET_FILM } from "../queries/index";
import Layout from '../components/layout';

const FilmDetails = ({pageContext}) => {
    const film = pageContext.film
    const arrStr = film.url.split('/');
    const id = Number(arrStr[5])
    return (
      <Layout>
        <Query query={GET_FILM} variables={ {id} }>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>
            if (error)   {
              console.log(error)
              return <h1>Error</h1>
            }
            const more = data.getFilm;
            return (
              <>
                <div><b>Title:</b> {film.title}</div>
                <div><b>Episode Id:</b>{film.episode_id}</div>
                <div><b>Opening crawl:</b> {film.opening_crawl}</div>
                <div><b>Director:</b> {film.director}</div>
                <div><b>Producer:</b> {film.producer}</div>
                <div><b>Release date:</b> {film.release_date}</div>
                <div><b>Characters:</b>
                  {more.characters.length === 0 ? 0 :
                  more.characters.map(ele => {
                    return <ListGroup key={ele.name}> 
                      <ListGroup.Item>
                        <Link to={`/characters/${ele.name.toLowerCase().replace(/\s+/g, '-')}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {ele.name}
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  })}
                </div>
                <div><b>Planets:</b>
                  {(more.planets.length === 0)? 0 :
                  more.planets.map(ele => {
                    return <ListGroup key={ele.name}> 
                      <ListGroup.Item>
                        <Link to={`/planets/${ele.name.toLowerCase().replace(/\s+/g, '-')}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {ele.name}
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  })}
                </div>
                <div><b>Vehicles:</b>
                  {(more.vehicles.length === 0)? 0 :
                  more.vehicles.map(ele => {
                    return <ListGroup key={ele.name}> 
                      <ListGroup.Item>
                        <Link to={`/vehicles/${ele.name.toLowerCase().replace(/\s+/g, '-')}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {ele.name}
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  })}
                </div>
            </>
            )
          }}
        </Query>
        <Link to="/">Go back to homepage</Link>
      </Layout>
    )
}

export default FilmDetails;
