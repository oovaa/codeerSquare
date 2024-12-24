import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([])

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/v1/posts/')
    const data = await res.json()
    setPosts(data.posts)
  }

  useEffect(() => {
    console.log('use effect ran')
    fetchData()
    console.log(posts)
  }, [])

  return (
    <div>
      <div>{posts.length}</div>
    </div>
  )
}

export default App
