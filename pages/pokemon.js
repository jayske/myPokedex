import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';
export default function pokemon({ aPokemon }) {
    return (
        <Layout title={aPokemon.name}>
            <h1 className="text-4xl mb-2 text-center capitalize">
                {aPokemon.id}. {aPokemon.name}
            </h1>
            <img className="mx-auto" src={aPokemon.image} alt={aPokemon.name} />
            <p>
                <span className="font-bold mr-2">Weight:</span> {aPokemon.weight}
            </p>
            <p>
                <span className="font-bold mr-2">Height:</span>
                {aPokemon.height}
            </p>
            <h2 className="text-2xl mt-6 mb-2">Types</h2>
            {aPokemon.types.map((type, index) => (
                <p key="index">{type.type.name}</p>
            ))}
            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl underline">Home</a>
                </Link>
            </p>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const aPokemon = await res.json();
        const paddedId = ('00' + id).slice(-3);
        aPokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { aPokemon },
        };
    } catch (err) {
        console.error(err);
    }
}
