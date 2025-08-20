import { useState } from 'react'


function App() {
  const [search, setSearch] = useState([])

  return (
    <>
      <div className='container'>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
    </>
  )
}

export default App
