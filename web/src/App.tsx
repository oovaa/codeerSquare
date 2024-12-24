import ListPosts from './pages/ListPosts'
import ViewPost from './pages/VeiwPost'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPosts />} />
        <Route path="/p/:id" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
