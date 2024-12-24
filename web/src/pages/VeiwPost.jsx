import React from 'react'
import { useParams } from 'react-router-dom'

function VeiwPost() {
  const { id } = useParams()

  return <div>viewing post id {id}</div>
}

export default VeiwPost
