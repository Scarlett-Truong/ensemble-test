import gql from 'graphql-tag'

const GET_ALL_FILMS = gql`
  query GetAllFilmsQuery{
    getAllFilms {
      title
      url
    }
  }
`;

const GET_FILM = gql`
  query GetFilmQuery($id: Int!){
    getFilm(id: $id) {
      title
      planets{
        name
      }
      characters{
        name
      }
      vehicles{
        name
      }
    }
  }
`;

const GET_PLANET = gql`
  query GetPlanetQuery($id: Int!){
    getPlanet(id: $id) {
      name
      films{
        title
      }
      residents{
        name
      }
    }
  }
`;

const GET_PERSON = gql`
  query GetPersonQuery($id: Int!){
    getPerson(id: $id) {
      name
      homeworld{
        name
      }
      films{
        title
      }
    }
  }
`;

const GET_VEHICLE = gql`
  query GetVehicleQuery($id: Int!){
    getVehicle(id: $id) {
      name
      films{
        title
      }
    }
  }
`;

export { GET_FILM, GET_ALL_FILMS, GET_PERSON, GET_PLANET, GET_VEHICLE }