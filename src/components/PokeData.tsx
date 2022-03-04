import type { VFC } from 'react';
import useSWR, { Key, Fetcher } from 'swr';

type PokeDataProps = {
  name: string;
};

type P = {
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

const fetcher: Fetcher<P> = (url) => fetch(url).then((res) => res.json());

const PokeData: VFC<PokeDataProps> = ({ name }) => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  const { height, weight, sprites } = data;

  return (
    <div>
      <img src={sprites.front_default} width="96" height="96" />
      <dl>
        <dt>height</dt>
        <dd>{height * 10}cm</dd>
        <dt>weight</dt>
        <dd>{weight / 10}kg</dd>
      </dl>
    </div>
  );
};

export default PokeData;
