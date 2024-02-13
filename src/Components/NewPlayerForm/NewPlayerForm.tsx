import axios from 'axios';
import React, { useState } from 'react'
import { SignUpFormState } from '../../squashpoint';

const NewPlayerForm: React.FC = () => {

  const [formData, setFormData] = useState<SignUpFormState>({
    firstName: "",
    lastName: "",
    email: "",
    sex: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5110/api/Player",
        formData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-red-400">
        <div>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            name="firstname"
            onChange={handleChange}
            value={formData.firstName}
          />
          <br />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            name="lastname"
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
  )
}

export default NewPlayerForm