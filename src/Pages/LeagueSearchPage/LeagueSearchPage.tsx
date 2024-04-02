import { useNavigate } from "react-router-dom";
import { leaguesGetApi } from "../../Services/LeagueService";
import { leaguesColumns } from "../../Helpers/TableColumns";
import { League } from "../../Models/League";
import { useQuery } from "react-query";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

type Props = {};

const LeagueSearchPage = (props: Props) => {
    const navigate = useNavigate();

    const handleLeagueClick = ({ id }: League) => {
        navigate(`/league/${id}`);
    };

    const { data: leagues, isLoading: isLeaguesLoading } = useQuery({
        queryFn: () => leaguesGetApi(),
        queryKey: ["leagues"],
    });

    return (
        <div className="flex w-full">
            <div className="flex-col w-full px-2">
                <DataTable
                    title="Leagues"
                    columns={leaguesColumns}
                    data={leagues?.data!}
                    progressPending={isLeaguesLoading}
                    progressComponent={<LoadingSpinner />}
                    onRowClicked={handleLeagueClick}
                    pagination
                    striped
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
};

export default LeagueSearchPage;
