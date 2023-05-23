import { useEffect, useState } from 'react'
import CatCard from './components/CatCard';

function App() {
  const [cats, setCats] = useState([]);

  async function getCats() {
    try {
      const response = await fetch('http://localhost:8888/api/allcats');
      const data = await response.json();
      console.log(await data);
      setCats(await data);
    }
    catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    getCats()
  }, []);

  return (
    <>
      <header>
        <h1>Katthemmet Lil El Gato</h1>
      </header>
      <main>
        {cats ? cats.map(
          (cat, i) =>
            <CatCard key={i} cat={cat} />
        ) : null}
      </main>
    </>
  )
};

export default App
