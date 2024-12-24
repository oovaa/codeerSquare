import { listPosts } from '../client.ts'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ListPosts = () => {
  const { data , error, isLoading } = useQuery(['listpossts'], listPosts)

  if (isLoading) return <div>Is Loading</div>

  if (error) return <div>Error</div>

  return (
    <div>
      <div>{JSON.stringify(data?.posts)}</div>
    </div>
  )
}

export default ListPosts
