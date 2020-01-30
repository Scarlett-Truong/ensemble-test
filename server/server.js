const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');
 
const typeDefs = gql`
  type Query {
    hello: String,
    getFilm(id: Int!) : Film
    getPerson(id: Int!) : Person
    getPlanet(id: Int!) : Planet
    getVehicle(id: Int!) : Vehicle
    getAllFilms: [Film]
  }

  type Film {
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
    producer: String
    release_date: String
    characters: [Person]
    planets: [Planet]
    starships: [Starship]
    vehicles: [Vehicle]
    url: String
  }

  type Planet {
    name: String
    orbital_period: String
    rotation_period: String
    diameter: String
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: String
    residents: [Person]
    films: [Film]
    url: String
  }

  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    homeworld: Planet
    films: [Film]
    url: String
  }

  type Starship {
    name: String
    model: String
    manufacturer: String
    cost_in_credits: String
    length: String
    max_atmosphering_speed: String
    crew: String
    passengers: String
    cargo_capacity: String
    consumables: String
    hyperdrive_rating: String
    MGLT: String
    starship_class: String
    films: [Film]
    url: String
  }

  type Vehicle {
    name: String
    model: String
    manufacturer: String
    cost_in_credits: String
    length: String
    max_atmosphering_speed: String
    crew: String
    passengers: String
    cargo_capacity: String
    consumables: String
    vehicle_class: String
    films: [Film]
    url: String
  }
`;

const resolveDetails = (parent, type) => {
  const promises = parent[type].map(async (url) => {
    const response = await axios.get(url);
    return response.data;
  })
  return Promise.all(promises);
}

const resolvers = {
  Film: {
    characters: async (parent) => {
      return await resolveDetails(parent, 'characters')
    },
    planets: async (parent) => {
      return await resolveDetails(parent, 'planets')
    },
    starships: async (parent) => {
      return await resolveDetails(parent, 'starships')
    },
    vehicles: async (parent) => {
      return await resolveDetails(parent, 'vehicles')
    }
  },
  Planet: {
    films: async (parent) => {
      return await resolveDetails(parent, 'films')
    },
    residents: async (parent) => {
      return await resolveDetails(parent, 'residents')
    },
  },
  Person: {
    homeworld: async parent => {
      const response = await axios.get(parent.homeworld)
      return response.data
    },
    films: async (parent) => {
      return await resolveDetails(parent, 'films')
    }
  },
  Starship:{
    films: async (parent) => {
      return await resolveDetails(parent, 'films')
    }
  },
  Vehicle:{
    films: async (parent) => {
      return await resolveDetails(parent, 'films')
    }
  },

  Query: {
    getFilm: async (_, {id}) => {
      const response = await axios.get(`https://swapi.co/api/films/${id}/`);
      return response.data;
    },
    getPerson: async (_, {id}) => {
      const response = await axios.get(`https://swapi.co/api/people/${id}/`);
      return response.data;
    },
    getPlanet: async (_, {id}) => {
      const response = await axios.get(`https://swapi.co/api/planets/${id}/`);
      return response.data;
    },
    getVehicle: async (_, {id}) => {
      const response = await axios.get(`https://swapi.co/api/vehicles/${id}/`);
      return response.data;
    },
    getAllFilms: async () => {
      const response = await axios.get(`https://swapi.co/api/films/`);
      return response.data.results;
    }
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
);