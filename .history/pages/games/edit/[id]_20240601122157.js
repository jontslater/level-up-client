import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { getGameById } from '../../../utils/data/gameData'; // Assuming you have

export default function EditGame() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null); // Initialize as null

  useEffect(() => {
    if (id) {
      getGameById(id).then((data) => {
        setGame(data);
      });
    }
  }, [id]);

  if (!game) {
    return <div>Loading...</div>; // Handle loading state
  }

  return <GameForm initialGame={game} />;
}
