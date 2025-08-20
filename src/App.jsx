import { useState, useEffect, useCallback } from 'react'


// funzione di debounce
function debounce(callback, delay){
  let timer;
  return (value)=>{
    clearTimeout(timer);
    timer= setTimeout(()=>{
      callback(value);
    },delay);
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  // funzione chiamata api
  const fetchApi = (query) =>{
    if(query.trim() === ''){
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
  const debounceApi = useCallback(debounce(fetchApi, 500),[])

  useEffect(() => {
    debounceApi(search)
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
