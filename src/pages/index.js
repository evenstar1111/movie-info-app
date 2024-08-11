import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
   const router = useRouter();

   return (
      <div>
         <Head>
            <title>Movie Info Home</title>
            <meta
               name="description"
               content="Get information movies and tv shows, search and get details about movies, tv shows, people and view their profile on imdb."
               key="home-page"
            />
         </Head>
         <div>
            <h1>Explore & Search</h1>
            <h1>Your Favourite</h1>
            <h1> Movies & TV Shows</h1>
            <div>
               <button onClick={() => router.push('/movies')}>movies</button>
               <button onClick={() => router.push('/tvs')}>tvs</button>
               <button onClick={() => router.push('/search')}>search</button>
            </div>
         </div>
      </div>
   );
}
