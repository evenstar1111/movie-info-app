import styles from '../styles/home.module.scss';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.home_background_n_wrapper}>
      <div className={styles.inner_wrapper}>
        <h1 className={styles.sub_txt}>Explore & Search</h1>
        <h1 className={styles.sub_txt}>Your Favourite</h1>
        <h1 className={styles.sub_txt}> Movies & TV Shows</h1>
        <div className={styles.btn_container}>
          <button onClick={() => router.push('/movies')}>movies</button>
          <button onClick={() => router.push('/tvs')}>tvs</button>
          <button onClick={() => router.push('/search')}>search</button>
        </div>
      </div>
    </div>
  );
}
