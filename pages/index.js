import Link from 'next/Link';
import Layout from '../components/Layout';
export default function Home({ pokemon }) {
    return (
        <Layout title="NextJS Pokedex">
            <h1 className="text-4xl mb-8 text-center ">The Nextjs Pokedex</h1>
            <ul>
                {pokemon.map((aPokemon, index) => (
                    <li key={index}>
                        <Link href={`/pokemon?id=${index + 1}`}>
                            <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
                                <img
                                    src={aPokemon.image}
                                    alt={aPokemon.name}
                                    className="w-20 h-20 mr-3"
                                />
                                <span className="mr-2 font-bold">
                                    {index + 1}.
                                </span>
                                {aPokemon.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export async function getStaticProps(context) {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const { results } = await res.json();
        const pokemon = results.map((aPokemon, index) => {
            const paddedId = ('00' + (index + 1)).slice(-3);

            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
            return { ...aPokemon, image };
        });
        return {
            props: { pokemon },
        };
    } catch (err) {
        console.error(err);
    }
}
