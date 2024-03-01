import axios from "axios";
import React, { useState } from "react";
import { RegisterFormState } from "../../squashpoint";

type Props = {};

const RegisterPage = (props: Props) => {
  const [formData, setFormData] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    sex: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Account/register", formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="bg-red-400">
        <div>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <br />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <br />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input name="email" onChange={handleChange} value={formData.email} />
          <br />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
          <br />
        </div>

        <div>
          <label htmlFor="repeatPassword">Password</label>
          <br />
          <input
            name="repeatPassword"
            type="password"
            onChange={handleChange}
            value={formData.repeatPassword}
          />
          <br />
        </div>

        <div>
          <label htmlFor="sex">Sex</label>
          <label>
            <input
              name="sex"
              type="radio"
              value="male"
              checked={formData.sex === "male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input
              name="sex"
              type="radio"
              value="female"
              checked={formData.sex === "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <button className="bg-green-200 p-2">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
