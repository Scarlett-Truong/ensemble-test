import React from "react"
import Layout from "../components/layout"
import FilmsList from "../components/filmsList"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

const IndexPage = ({pageContext}) => (
  <Layout >
    <FilmsList films={pageContext.filmsList}/>
  </Layout>
)

export default IndexPage