import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
  }),
  connectToDevTools: true,
});

const query = gql`
  {
    people {
      url
      homeworld
      height
      skin_color
      birth_year
      eye_color
      hair_color
      gender
      name
      mass
    }
  }
`;

const PeopleContainer = graphql(query);


import React, { Component } from 'react';
import './App.css';

function Person({ url, gender, name, homeworld, height, mass, eye_color, hair_color, skin_color }) {
  return (
    <div style={{ flex: '1 0 300px' }}>
      <div style={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '24px'
      }}>
        <h1 style={{
          fontSize: '14px',
          margin: '8px 0'
        }}>{name} -  {gender}</h1>
        <p>
          Height: {height}, Mass: {mass}, Skin: {skin_color}
        </p>
        <p>
          Eye Color: {eye_color}, Hair: {hair_color}
        </p>
        <p>
          <a href={homeworld}>View Homeworld</a>
        </p>
        <p>
          <a href={url}>View More</a>
        </p>
      </div>
    </div>
  );
}

let PeopleList = function PeopleList({ data }) {
  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
        }}
      >
        {
          data.loading ? (
            <p>People will be here soon</p>

          ) : (
            data.people.map((person, index) => {
              return <Person key={index} {...person} />
            })
          )
        }
      </div>
    </div>
  );
};

PeopleList = PeopleContainer(PeopleList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src="https://cdn-images-1.medium.com/fit/t/1600/480/1*sxMljQ8wgso4cG3PxufTmQ.png" className="App-logo"
                 alt="logo"/>
            <h2>Your first GraphQL Component</h2>
          </div>
          <PeopleList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
