import { useState, useEffect } from 'react'


function App() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])



  const filteredProducts = products.filter(product => {
    const isInBrand = product.brand.toLowerCase().includes(search.toLowerCase())
    const isInConnect = product.connectivity.toLowerCase().includes(search.toLowerCase())
    const isInDes = product.description.toLowerCase().includes(search.toLowerCase())
    const isInColor = product.color.toLowerCase().includes(search.toLowerCase())
    const isInName = product.name.toLowerCase().includes(search.toLowerCase())
    return isInBrand || isInConnect || isInDes || isInColor || isInName
  })
  


  return (
    <>
      <div className='container'>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='cerca' list='suggerimenti'/>
        <datalist id='suggerimenti'>
          {filteredProducts && filteredProducts.map((product) => {
            return (
              <option key={product.id} value={product.name}></option>
            )
          })}
        </datalist>
        <ul>
          {filteredProducts && filteredProducts.map((product) => {
            return (
              <li key={product.id}>{product.name}</li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
