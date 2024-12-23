import { useEffect, useState, type EffectCallback } from 'react'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/v1/posts/')
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div>{posts}</div>
    </div>
  )
}

export default App
