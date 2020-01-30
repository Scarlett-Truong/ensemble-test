import React from "react"
import PropTypes from "prop-types"
import { ApolloProvider } from 'react-apollo'
import { client } from "../../config";
import "./layout.css"

const Layout = ({ children }) => {
  return(
    <ApolloProvider client={client}>
      <main>
        {children}
      </main>
    </ApolloProvider>

  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
