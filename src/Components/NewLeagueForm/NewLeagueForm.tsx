import { leagueCreateApi } from "../../Services/LeagueService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface Props {
    close: () => void;
}
type NewLeagueFormInputs = {
    name: string;
    description: string;
    maxPlayers: number;
    isPublic: boolean;
};

const validation = Yup.object().shape({
    name: Yup.string().required("League name is required"),
    description: Yup.string().required("League description is required"),
    maxPlayers: Yup.number().required("Max player number is required"),
    isPublic: Yup.boolean().required("Public status is required"),
});

const NewLeagueForm = ({ close }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewLeagueFormInputs>({ resolver: yupResolver(validation) });

    const handleLeagueCreate = async ({ name, description, maxPlayers, isPublic }: NewLeagueFormInputs) => {
        leagueCreateApi(name, description, maxPlayers, isPublic)
            .then(() => {
                toast.success(`League "${name}" successfully created`);
                close();
            })
            .catch(() => toast.error("Error occurred"));
    };

    return (
        <form onSubmit={handleSubmit(handleLeagueCreate)}>
            <div>
                <label htmlFor="name">League name</label>
                <input {...register("name")} placeholder="..." />
                {errors.name && <p>{errors.name.message}</p>}
                <br />
                <label htmlFor="description">League description</label>
                <input {...register("description")} placeholder="..." />
                {errors.description && <p>{errors.description.message}</p>}
                <br />
                <label htmlFor="maxPlayers">League max players</label>
                <input {...register("maxPlayers")} placeholder="..." type="number" />
                {errors.maxPlayers && <p>{errors.maxPlayers.message}</p>}
                <br />
                <div className="flex justify-between w-full">
                    <label htmlFor="leaguePublic">League public status: </label>
                    <div>
                        <input type="radio" id="huey" value="true" defaultChecked={true} {...register("isPublic")} />
                        <label htmlFor="huey">Public</label>
                    </div>
                    <div>
                        <input type="radio" id="dewey" value="false" defaultChecked={false} {...register("isPublic")} />
                        <label htmlFor="dewey">Private</label>
                    </div>
                    {errors.isPublic && <p>{errors.isPublic.message}</p>}
                </div>
                <br />
            </div>
            <button className="bg-green-200 p-2">Create league</button>
        </form>
    );
};

export default NewLeagueForm;
