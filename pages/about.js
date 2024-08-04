import { useRouter } from 'next/router';
import Head from 'next/head';

export default function About() {
   const router = useRouter();
   return (
      <div className="container-fluid mt-5 d-flex justify-content-center">
         <Head>
            <title>About</title>
            <meta name="description" content="credits and attribution page" key="about page" />
         </Head>
         <div className="card mb-3" style={{ width: 400 }}>
            <div className="card-header text-center">CREDITS</div>
            <div className="card-body">
               <div className="row">
                  <div className="col-md-4">
                     <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                        className="card-img"
                        alt="..."
                     />
                  </div>
                  <div className="col-md-8">
                     <p className="card-text">
                        This product uses the TMDb API but is not endorsed or certified by TMDb.
                     </p>
                  </div>
               </div>
            </div>
            <div className="card-footer text-center">
               <button className="btn btn-secondary btn-sm" onClick={() => router.back()}>
                  {' '}
                  back{' '}
               </button>
            </div>
         </div>
      </div>
   );
}
