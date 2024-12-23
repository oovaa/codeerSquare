const fetchData = async () => {
  const res = await fetch('http://localhost:3000/api/v1/posts/')
  const data = await res.json()
  console.log(data.posts)
}

fetchData()
