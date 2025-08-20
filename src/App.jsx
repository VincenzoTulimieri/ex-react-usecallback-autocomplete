import { useState, useEffect } from 'react'


function App() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    if(search.trim() === ''){
      setProducts([])
      return
    }
    fetch(`http://localhost:3333/products?search=${search}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [search])



  return (
    <>
      <h1>Ricerca Dinamica</h1>
      <div className='container'>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='cerca'/>
        {products.length > 0 && (
          <div className='dropdown'>
            {products.map(product=>{
              return(
                <p key={product.id}>{product.name}</p>
              )
            })}
          </div>
        )}

      </div>
    </>
  )
}

export default App
