import React from "react";
import {ListGroup} from 'react-bootstrap';
import { Link } from "gatsby"
import { Query } from 'react-apollo'
import { GET_VEHICLE } from "../queries/index";
import Layout from '../components/layout';

const VehicleDetails = ({pageContext}) => {
    const vehicle = pageContext.vehicle
    const arrStr = vehicle.url.split('/');
    const id = Number(arrStr[5])
    return (
      <Layout>
        <Query query={GET_VEHICLE} variables={ {id} }>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>
            if (error)   {
              console.log(error)
              return <h1>Error</h1>
            }
            const more = data.getVehicle;
            return (
              <>
                <div><b>Name: </b>{vehicle.name}</div>
                <div><b>Model: </b>{vehicle.model}</div>
                <div><b>Manufacturer: </b>{vehicle.manufacturer}</div>
                <div><b>Cost in credit: </b>${vehicle.cost_in_credits}</div>
                <div><b>Max atmosphering speed: </b>{vehicle.max_atmosphering_speed}</div>
                <div><b>Crew: </b>{vehicle.crew}</div>
                <div><b>Passengers: </b>{vehicle.passengers}</div>
                <div><b>Cargo capacity: </b>{vehicle.name}</div>
                <div><b>Consumables: </b>{vehicle.consumables}</div>
                <div><b>Vehicle class: </b>{vehicle.vehicle_class}</div>
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

export default VehicleDetails;