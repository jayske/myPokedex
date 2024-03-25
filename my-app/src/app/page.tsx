import Image from "next/image";
import Layout from './components/Layout';
import React, { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { gql, useLazyQuery } from '@apollo/client'
import { initializeApollo } from '@apollo/client'
import { PokeAPI } from '../apollo/datasources/pokeApi'

export default function Home({pokemon}) {
  // log in the pokemon
  // console.log(pokemon);
  return (
      <Layout title="My Pokedex">
          <h1 className="text-4xl mb-8 text-center" style={{ color: 'black' ,fontWeight: 'bold'}}>My Pokedex</h1>
          <ul>
            {pokemon}.map((aPokemon, index) =  (
              <li key={index}>
                  <Link href={`/pokemon?id=${index+1}`}>
                    <a>
                      <img src={src={aPokemon.image} alt={aPokemon.name}}/>
                      <span>{index + 1}</span>
                      {aPokemon.name}
                    </a>
                  </Link>
              </li>
              )
            )
          </ul>
      </Layout>
  );
}

/*
    Define a static page for run-time
*/
export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { InMemoryLRUCache } = require('apollo-server-caching')
  const pokeAPI = new PokeAPI()
  pokeAPI.initialize({ context, cache: new InMemoryLRUCache() })
  const apolloClient = initializeApollo(null, { dataSources: { pokeAPI } })

  interface PokemonQueryResult {
    pokemon: IPokemon[]
  }

  try {
    const { data } = await apolloClient.query<PokemonQueryResult, null>({
      query: PokemonQuery,
    })

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        pokemon: data.pokemon,
      },
    }
  } catch (err) {
    return {
      props: { pokemon: [] },
    }
  }
}
