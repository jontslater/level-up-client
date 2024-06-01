import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { getGames } from '../../../utils/data/gameData';

export default function EditGame() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState({});

  useEffect(() => {
    getGames(id).then(setGame);
  }, [id]);

  return <GameForm gameObj={game} />;
}
