import React from "react";
import {ListGroup} from 'react-bootstrap';
import { Link } from "gatsby"
import { Query } from 'react-apollo'
import { GET_PERSON } from "../queries/index";
import Layout from '../components/layout';

const CharacterDetails = ({pageContext}) => {
    const character = pageContext.character
    const arrStr = character.url.split('/');
    const id = Number(arrStr[5])
    return (
      <Layout>
        <Query query={GET_PERSON} variables={ {id} }>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>
            if (error)   {
              console.log(error)
              return <h1>Error</h1>
            }
            const more = data.getPerson;
            return (
              <>
                <div><b>Name: </b>{character.name}</div>
                <div><b>Height: </b>{character.height}</div>
                <div><b>Mass: </b>{character.mass}</div>
                <div><b>Hair color: </b>{character.hair_color}</div>
                <div><b>Skin color: </b>{character.skin_color}</div>
                <div><b>Eye color: </b>{character.eye_color}</div>
                <div><b>Birth year: </b>{character.birth_year}</div>
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
                <div><b>Planets:</b>
                  <div>
                    <ListGroup>
                      <ListGroup.Item>
                        <Link to={`/planets/${more.homeworld.name.toLowerCase().replace(/\s+/g, '-')}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {more.homeworld.name}
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>
            </>
            )
          }}
        </Query>
        <Link to="/">Go back to homepage</Link>
      </Layout>
    )
}

export default CharacterDetails;