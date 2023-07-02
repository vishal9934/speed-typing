import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
   

  return (
    <div>
      <h1>Page not found</h1>
      <Link to={"/"} style={{textDecoration:"none",color:"white"}}>Go to Home Page</Link>
    </div>
  )
}

export default Error
