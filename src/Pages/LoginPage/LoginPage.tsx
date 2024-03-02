import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = (): JSX.Element => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) });

  const handleLogin = ({ email, password }: LoginFormInputs) => {
    loginUser(email, password);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(handleLogin)} className="bg-red-400">
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
          <input
            type="password"
            placeholder="•••••••••"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
        </div>

        <button className="bg-green-200 p-2">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
