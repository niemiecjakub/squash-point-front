import React, { useState } from 'react'
import LeagueList from '../../Components/LeagueList/LeagueList'
import PlayerList from '../../Components/PlayerList/PlayerList'
import axios from 'axios'

interface SignUpFormState  {
  firstname: string;
  lastname: string;
  email: string;
  sex: string
}

const HomePage: React.FC = () => {
  
  const [formData, setFormData] = useState<SignUpFormState> ({
    firstname: '',
    lastname: '',
    email: '',
    sex: ''
  })

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5110/api/Player', formData);
      console.log(response);
    }catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  return (
    <>
      <LeagueList />
      <PlayerList />
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor='firstName'>First Name</label>'
          <br/>
          <input onChange={handleChange} value={formData.firstname} />
          <br/>
        </div>

        <div>
          <label htmlFor='lastName'>Last Name</label>'
          <br/>
          <input onChange={handleChange} value={formData.lastname} />
          <br/>
        </div>

        <div>
          <label htmlFor='email'>Email</label>'
          <br/>
          <input onChange={handleChange} value={formData.email} />
          <br/>
        </div>

        <div>
          <label htmlFor='sex'>Sex</label>'
          <br/>
          <input onChange={handleChange} value={formData.sex} />
          <br/>
        </div>

        <button>Add player</button>
      </form>
    </>

  )
}

export default HomePage