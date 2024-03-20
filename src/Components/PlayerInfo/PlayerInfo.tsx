import { followPlayerApi } from '../../Services/PlayerService'
import { PlayerProfileDetails } from '../../squashpoint'

type Props = {
    data: PlayerProfileDetails
}

const PlayerInfo = ({data : {fullName, followers, following, id}}: Props) => {

    const handlePlayerFollow = () => {
        followPlayerApi(id)
    }
  return (
    <div className='flex justify-between text-xl my-4 mx-2'>
        <h1>{fullName}</h1>
        <button onClick={handlePlayerFollow} className='bg-green-200 px-4 py-2'>Follow</button>
        <h1>Followers: {followers}</h1>
        <h1>Following: {following}</h1>
    </div>
  )
}

export default PlayerInfo