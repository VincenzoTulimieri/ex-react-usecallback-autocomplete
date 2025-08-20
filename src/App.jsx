import { useState, useEffect, useCallback } from 'react'


// funzione di debounce
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  // funzione chiamata api
  const fetchApi = (query) => {
    if (query.trim() === '') {
      setProducts([])
      return
    }
    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
    console.log('api')
  }

  // useCallback per il debounce
  const debounceApi = useCallback(debounce(fetchApi, 500), [])

  useEffect(() => {
    debounceApi(search)
  }, [search])

  function apiSelectedProduct(id) {
    fetch(`http://localhost:3333/products/${id}`)
      .then(res => res.json())
      .then(data => (
        setSelectedProduct(data),
        setSearch(''),
        setProducts([])
      ))
      .catch(err => console.error(err))
  }


  return (
    <>
      <h1>Ricerca Dinamica</h1>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='cerca' />
      <div className="container-dropdown">
        {products.length > 0 && (
          <div className='dropdown'>
            {products.map(product => {
              return (
                <p key={product.id} onClick={() => apiSelectedProduct(product.id)}>{product.name}</p>
              )
            })}
          </div>
        )}
      </div>
      <div className='container'>
        {selectedProduct && (
          <div className="card">
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt="" />
            <p>{selectedProduct.description}</p>
            <p><strong>Prezzo:</strong> {selectedProduct.price}€</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
