import React, { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Layout from '../src/app/components/Layout'

// add in the layout of the title
export default function Home(){
    return (
        <Layout title="My Pokedex">
            <h1>My Pokedex</h1>
        </Layout>
    );
}
