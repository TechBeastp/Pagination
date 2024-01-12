import React, { useEffect , useState } from 'react'

const App = () => {

  const [products , setProducts] = useState([])
  const [Page , setPage] = useState(1)

  const fetchProducts = async() => {
    try {   
    const res = await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()
    
 setProducts(data.products)
  } 
    catch (error) {
      console.error('Error fetching products:', error);   
    }
  }
 console.log(products);


  useEffect(() => {
    fetchProducts()
  },[])


  const selectPagehandler =  (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== Page){
setPage(selectedPage)

    }

  }


  return (
    <>
    <h1 className='header'>Pagination shoping cart</h1>

    <div className='product_container'>
      {
        products.slice(Page * 10 - 10 ,Page * 10).map((prod)=> {
          return(
            <>
            <div className='product_inner' >
          <img className='prod_img' src={prod.thumbnail} alt= {prod.title}></img>
          <span>{prod.title}</span>
            </div>
          </>  )
})
      } </div>

      {products.length > 0 && <div className='pagination'> 
        <span onClick={(()=>selectPagehandler(i - 1))} className={(Page > 1 ) ? "" : "pagination__disable"}>⏮️</span>
{

[...Array(products.length / 10)].map((_, i)=> {
return (
<span  key={i} className={Page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPagehandler(i + 1)}>{i+1}</span>
)
})

}     
<span onClick={(()=>selectPagehandler(i + 1))} className={(Page < products.length/10 ) ? "" : "pagination__disable"}>⏭️</span>
        </div>}

    </>

  )
}

export default App;
