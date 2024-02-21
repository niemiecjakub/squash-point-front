import axios from "axios";
import React, { useState } from "react";
import { SignUpFormState } from "../../squashpoint";


interface Props {
  className?: string;
}

const NewPlayerForm: React.FC<Props> = ({ className }: Props): JSX.Element => {
  const [formData, setFormData] = useState<SignUpFormState>({
    firstName: "",
    lastName: "",
    email: "",
    sex: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      const { firstName, lastName, email, sex } = formData;
      const response = await axios.post("/Player", null, {
        params: {
          firstName,
          lastName,
          email,
          sex,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-red-400 ${className}`}>
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
        <label htmlFor="sex">Sex</label>
        <br />
        <input name="sex" onChange={handleChange} value={formData.sex} />
        <br />
      </div>

      <button className="bg-green-200 p-2">Add player</button>
    </form>
  );
};

export default NewPlayerForm;
