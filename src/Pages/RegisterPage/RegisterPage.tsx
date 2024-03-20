import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";

type RegisterFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    sex: string;
};

const validation = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    repeatPassword: Yup.string().required("Repeat password is required"),
    sex: Yup.string().required("Sex is required"),
});

const RegisterPage = () => {
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({ resolver: yupResolver(validation) });

    const handleRegister = ({ email, password, firstName, lastName, sex }: RegisterFormInputs) => {
        registerUser(email, password, firstName, lastName, sex);
    };

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit(handleRegister)} className="bg-red-400">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <br />
                    <input {...register("firstName")} placeholder="First name" />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <br />
                    <input {...register("lastName")} placeholder="Last name" />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input {...register("email")} placeholder="Email" />
                    {errors.email && <p>{errors.email.message}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input {...register("password")} type="password" placeholder="•••••••••" />
                    {errors.password && <p>{errors.password.message}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="repeatPassword">Password</label>
                    <br />
                    <input {...register("repeatPassword")} type="password" placeholder="•••••••••" />
                    {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="sex">Sex</label>
                    <label>
                        <input {...register("sex")} type="radio" value="male" />
                        Male
                    </label>

                    <label>
                        <input {...register("sex")} type="radio" value="female" />
                        Female
                    </label>
                    {errors.sex && <p>{errors.sex.message}</p>}
                </div>

                <button className="bg-green-200 p-2">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
