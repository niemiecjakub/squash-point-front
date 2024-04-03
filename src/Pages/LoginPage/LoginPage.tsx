import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { loginApi } from "../../Services/AccountService";
import { useNavigate } from "react-router";
import { useUserStore } from "../../Context/userStore";

type LoginFormInputs = {
    email: string;
    password: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) });

    const { mutateAsync: handleLogin, isLoading } = useMutation({
        mutationFn: ({ email, password }: LoginFormInputs) => loginApi(email, password),
        onSuccess: (response) => {
            const userObj = {
                email: response?.data.email,
                id: response?.data.id,
                fullName: response?.data.fullName,
                photo: response?.data.photo,
                token: response?.data.token,
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(response?.data!, true);
            navigate("/");
            toast.success(`Log in successful`);
        },
        onError: () => {
            toast.warning("Server error occured");
        },
    });

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit((values) => handleLogin(values))} className="bg-red-400">
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input placeholder="email" {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" placeholder="•••••••••" {...register("password")} />
                    {errors.password && <p>{errors.password.message}</p>}
                    <br />
                </div>

                <button className="bg-green-200 p-2" disabled={isLoading}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
