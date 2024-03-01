import React, { useState } from "react";
import { LoginFormState } from "../../squashpoint";
import axios from "axios";


const LoginPage = () : JSX.Element  => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data: {token}} = await axios.post("/Account/login", formData);
      console.log(token);
    } catch (error) {
      console.error(error);
      console.error("something wrpong");
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="bg-red-400">
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <br />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input name="password" type="password" onChange={handleChange} value={formData.password} />
        <br />
      </div>

      <button className="bg-green-200 p-2">Login</button>
    </form>
    </div>
  );
};

export default LoginPage;
