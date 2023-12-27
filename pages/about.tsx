import { useEffect, useState } from 'react';
import {exampleCommands} from './api/syncCode';

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await exampleCommands();
      console.log(result);
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? `Data: ${data}` : 'Loading...'}
    </div>
  );
}