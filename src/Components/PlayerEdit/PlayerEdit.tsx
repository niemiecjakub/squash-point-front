import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlayerEditInputs, UserProfile } from "../../Models/User";
import { useForm } from "react-hook-form";
import { playerEditApi } from "../../Services/AccountService";

type Props = {
    playeInfo: UserProfile;
};

const validation = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name name is required"),
    email: Yup.number().required("Email is required"),
});

const PlayerEdit = ({ playeInfo: { fullName, id, email } }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlayerEditInputs>({});

    const handlePlayerEdit = async (formState: PlayerEditInputs) => {
        await playerEditApi(id, formState)
            .then((res) => {
                window.location.reload();
                toast.success("League updated");
            })
            .catch((e) => toast.error(e));
    };

    return (
        <form className="flex-col" onSubmit={handleSubmit(handlePlayerEdit)}>
            <div className="flex justify-between w-full">
                <label htmlFor="firstName">First name: </label>
                <input
                    className="px-4 py-1 bg-slate-300 my-2"
                    placeholder={`${fullName}`}
                    defaultValue={fullName}
                    {...register("firstName")}
                />
            </div>

            <div className="flex justify-between w-full">
                <label htmlFor="email">Email: </label>
                <input
                    className="px-4 py-1 bg-slate-300 my-2"
                    placeholder={`${email}`}
                    defaultValue={email}
                    {...register("email")}
                />
            </div>

            <div className="flex justify-between w-full">
                <label htmlFor="leaguePublic">Photo: </label>
                <input className="px-4 py-1 bg-slate-300 my-2" type="file" {...register("image")} />
            </div>
            <button className="px-4 py-2 bg-green-400 w-full" type="submit">
                Submit
            </button>
        </form>
    );
};

export default PlayerEdit;
