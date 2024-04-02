import { useNavigate } from "react-router-dom";
import { playersColumns } from "../../Helpers/TableColumns";
import { playersGetApi } from "../../Services/PlayerService";
import { Player } from "../../Models/Player";
import { useQuery } from "react-query";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

type Props = {};

const PlayerSearchPage = (props: Props) => {
    const navigate = useNavigate();

    const handlePlayerClick = ({ id }: Player) => {
        navigate(`/player/${id}`);
    };

    const { data: players, isLoading: isPlayersLoading } = useQuery({
        queryFn: () => playersGetApi(),
        queryKey: ["players"],
    });

    return (
        <div className="flex w-full">
            <div className="flex-col w-full px-2">
                <DataTable
                    title="Players"
                    columns={playersColumns}
                    data={players?.data!}
                    progressPending={isPlayersLoading}
                    progressComponent={<LoadingSpinner />}
                    onRowClicked={handlePlayerClick}
                    pagination
                    striped
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
};

export default PlayerSearchPage;
