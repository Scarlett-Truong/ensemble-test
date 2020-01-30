

import React from "react";
import {ListGroup} from 'react-bootstrap';
import { Link } from "gatsby"
import { Query } from 'react-apollo'
import { GET_PLANET } from "../queries/index";
import Layout from '../components/layout';

const PlanetDetails = ({pageContext}) => {
    const planet = pageContext.planet
    const arrStr = planet.url.split('/');
    const id = Number(arrStr[5])
    console.log(id)
    return (
      <Layout>
        <Query query={GET_PLANET} variables={ {id} }>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>
            if (error)   {
              console.log(error)
              return <h1>Error</h1>
            }
            const more = data.getPlanet;
            console.log(more)
            return (
              <>
                <div><b>Name: </b>{planet.name}</div>
                <div><b>Rotation period: </b>{planet.rotation_period}</div>
                <div><b>Orbital period: </b>{planet.orbital_period}</div>
                <div><b>Diameter: </b>{planet.diameter}</div>
                <div><b>Climate: </b>{planet.climate}</div>
                <div><b>Gravity: </b>{planet.gravity}</div>
                <div><b>Surface water: </b>{planet.surface_water}</div>
                <div><b>Population: </b>{planet.population}</div>
                <div><b>Characters:</b>
                  {more.residents.length === 0
                  ? 0 
                  : more.residents.map(ele => {
                    return <ListGroup key={ele.name}> 
                      <ListGroup.Item>
                        <Link to={`/characters/${ele.name.toLowerCase().replace(/\s+/g, '-')}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {ele.name}
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  })}
                </div>
                <div><b>Films: </b>
                  {more.films.length === 0 
                  ? 0
                  : more.films.map(ele => {
                    return <ListGroup key={ele.title}> 
                      <ListGroup.Item>
                        <Link to={`/films/${ele.title.toLowerCase().replace(/\s+/g, '-')}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {ele.title}
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

export default PlanetDetails;