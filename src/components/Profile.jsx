import React from 'react'
import useUser from '../hooks/useUser'

function Profile() {
  const {username} = useUser();
  return (
    <div>
      <h6 className='text text-muted'> Welcome {username}</h6>
    </div>
  )
}

export default Profile