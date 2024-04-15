import { useParams } from "react-router";
import { gameGetByIdApi } from "../../Services/GameService";
import GameInProgress from "../../Components/GameInProgress/GameInProgress";
import GameUnfinished from "../../Components/GameUnfinished/GameUnfinished";
import GameFinished from "../../Components/GameFinished/GameFinished";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useQuery } from "react-query";
import GamePlayerBar from "../../Components/GamePlayerBar/GamePlayerBar";

const GamePage = () => {
    const { id } = useParams();

    const {
        data: gameInfo,
        isLoading: isGameInfoLoading,
        refetch: refetchGameInfo,
    } = useQuery({
        queryFn: () => gameGetByIdApi(id!),
        queryKey: ["gameInfo"],
    });

    return (
        <div className="flex flex-col items-center">
            {isGameInfoLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <GamePlayerBar gameInfo={gameInfo!} />
                    {gameInfo!.status == "Unfinished" && (
                        <GameUnfinished
                            player1={gameInfo!.players[0]}
                            player2={gameInfo!.players[1]}
                            gameInfo={gameInfo!}
                            gameId={id!}
                        />
                    )}
                    {gameInfo!.status == "Started" && (
                        <GameInProgress gameInfo={gameInfo!} gameId={id!} refetchGameInfo={refetchGameInfo} />
                    )}
                    {gameInfo!.status == "Finished" && <GameFinished gameId={id!} players={gameInfo!.players} />}
                </>
            )}
        </div>
    );
};

export default GamePage;
