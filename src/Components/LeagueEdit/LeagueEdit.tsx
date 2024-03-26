import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { leagueEditApi } from "../../Services/LeagueService";
import { LeagueProfileDetails } from "../../squashpoint";
import { LeagueEditInputs } from "../../Models/League";

type Props = {
    leagueInfo: LeagueProfileDetails;
    leagueId: string;
};

const validation = Yup.object().shape({
    name: Yup.string().required("League name is required"),
    description: Yup.string().required("description name is required"),
    maxPlayers: Yup.number().required("maxPlayers name is required"),
    public: Yup.boolean().required("public name is required"),
});

const LeagueEdit = ({ leagueId, leagueInfo }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LeagueEditInputs>({});

    const handleLeagueEdit = async (formState: LeagueEditInputs) => {
        await leagueEditApi(leagueId, formState)
            .then((res) => {
                window.location.reload();
                toast.success("League updated");
            })
            .catch((e) => toast.error(e));
    };

    return (
        <form className="flex-col" onSubmit={handleSubmit(handleLeagueEdit)}>
            <div className="flex justify-between w-full">
                <label htmlFor="leagueName">League name</label>
                <input
                    className="px-4 py-1 bg-slate-300 my-2"
                    placeholder={`${leagueInfo.name}`}
                    defaultValue={leagueInfo.name}
                    {...register("name")}
                />
            </div>

            <div className="flex justify-between w-full">
                <label htmlFor="leagueDescription">League description: </label>
                <input
                    className="px-4 py-1 bg-slate-300 my-2"
                    placeholder={`${leagueInfo.description}`}
                    defaultValue={leagueInfo.description}
                    {...register("description")}
                />
            </div>

            <div className="flex justify-between w-full">
                <label htmlFor="leagueMaxPlayers">League max players: </label>
                <input
                    className="px-4 py-1 bg-slate-300 my-2"
                    type="number"
                    placeholder={`${leagueInfo.maxPlayers}`}
                    defaultValue={leagueInfo.maxPlayers}
                    {...register("maxPlayers")}
                />
            </div>

            <div className="flex justify-between w-full">
                <label htmlFor="leaguePublic">League public status: </label>
                <input
                    className="px-4 py-1 bg-slate-300 my-2"
                    placeholder={`${leagueInfo.public}`}
                    defaultValue={leagueInfo.public.toString()}
                    {...register("public")}
                />
            </div>

            <div className="flex justify-between w-full">
                <label htmlFor="leaguePublic">League image: </label>
                <input className="px-4 py-1 bg-slate-300 my-2" type="file" {...register("image")} />
            </div>
            <button className="px-4 py-2 bg-green-400 w-full" type="submit">
                Submit
            </button>
        </form>
    );
};

export default LeagueEdit;
