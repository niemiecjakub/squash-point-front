import { leagueCreateApi } from "../../Services/LeagueService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface Props {
    close: () => void;
}
type NewLeagueFormInputs = {
    leagueName: string;
};

const validation = Yup.object().shape({
    leagueName: Yup.string().required("League name is required"),
});

const NewLeagueForm = ({ close }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewLeagueFormInputs>({ resolver: yupResolver(validation) });

    const handleLeagueCreate = ({ leagueName }: NewLeagueFormInputs) => {
        leagueCreateApi(leagueName)
            .then(() => {
                toast.success(`League "${leagueName}" successfully created`);
                close();
            })
            .catch(() => toast.error("Error occurred"));
    };
    return (
        <form onSubmit={handleSubmit(handleLeagueCreate)}>
            <div>
                <label htmlFor="leagueName">League name</label>
                <input {...register("leagueName")} placeholder="..." />
                {errors.leagueName && <p>{errors.leagueName.message}</p>}
                <br />
            </div>
            <button className="bg-green-200 p-2">Create league</button>
        </form>
    );
};

export default NewLeagueForm;
