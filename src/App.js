
import React,{ useContext, useEffect, useState ,useReducer } from 'react';
import initialState,{storeContext} from "./StoreContext"
import Reducer from "./Reducer"

import logo from './logo.svg';
import menu from './menu.png';
import cart from './cart.png';
import user from './user.png';
import search from './search.png';
import loading from './loading.gif';
import './App.css';



function App(){

  const [items,setItems]=useState([]);
  const [category,setCategory]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);

  const store =useContext(storeContext)

  const [state, dispatch] = useReducer(Reducer, store);


  useEffect(()=>{
    
    fetchAllProduct();
    fetchCategoryList();
    
  },[])

  async function fetchAllProduct(item){
    setItems([]);
    setItems(await fetch('https://fakestoreapi.com/products').then(res=>res.json()));
    console.log(items)
  }

  async function fetchCategoryList(item){
    setCategory(await fetch('https://fakestoreapi.com/products/categories').then(res=>res.json()))
  }

  async function fetchSelectedCategoryProducts(item){
    setItems([]);
    setItems(await fetch(`https://fakestoreapi.com/products/category/${item}`).then(res=>res.json()))
  }

  const Footer=()=>{
    return(
      <><footer className="App-footer">
      footer
    </footer></>
    )
  }

  const Cart=()=>{
      return(
          <div className={`Cart-dropdown ${cartOpen?"":"Close"}`}>
            {
              state.cart.length >0 && 
              <div className='Cart-item-container' >
          <div className='Cart-item'>
            <div></div>
            <div>Title</div>
            <div>Price</div>
            <div></div>
          </div>
          { 
          state.cart.map((item,key)=>{
            return(
            <div className='Cart-item' key={key}>
            <div><img style={{height: "50px",width: "50px"}} src={item.image} alt="logo" /></div>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <div></div>
          </div>
            )
          })
        }
          
          <div className='Cart-item'>
            <div>TotalPrice</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          </div> || <div style={{height:"100%",color:"black"}}>Empty</div>
            }
        </div>    
      )
  }

  const Header=()=>{
    return(
    <header className="App-header">
      <div style={{padding:"5px"}}>
      <img className="App-logo" src={logo} />
      <img className="App-menu" src={menu} />
      </div>
      <div className='Search-bar-container'>
       <div className="Search-bar">
       <img className='Search-logo' src={search} alt="logo" />
       </div>
      </div>
      <div className='Cart-user-container'>
      <img style={{height: "30px",width: "30px",}} src={user} alt="logo" />
      <div style={{height: "30px",width: "30px",marginLeft:"10px",cursor: "pointer" }} onClick={()=>{setCartOpen(!cartOpen)}}>
      <div className="Cart-notification">
        {state.count}
      </div> 
      <img className='Cart-logo'  src={cart} alt="logo" />
      </div>
      </div>
      <Cart/>
    </header>
    )
  }

  const Card=({item})=>{
    return(
      <div className="Card">
      <div className="Display-image">
      <img style={{height: "150px",width: "180px"}} src={item.image} alt="logo" />
      </div>
      <div className="Card-display-content">
        <div className="Card-display-name">{item.title}</div>
        <div className="Card-display-discription">Dummy description</div>
        <div className="Card-display-price">RS {item.price}/-</div>
        <div></div>
        <div></div>
      </div>
      <div style={{display:"flex",flexDirection:"row"}}>
        <button className="Card-buy-button" onClick={() => console.log("state",state)}>
          Buy Now
        </button>
        <button className="Card-cart-button" onClick={() => dispatch({type: 'increment',data:item})}>
          Add to Cart <img style={{height: "20px",width: "20px"}} src={cart} alt="logo" />
        </button>
      </div>

    </div>
    )
  }

  return (
    <div className="App-container">
      <Header/>
      { category.length > 0 && 
      <div className="App-body">
      <div className="Category-container">
      <div className="Category-tab" onClick={()=>{fetchAllProduct()}}>
         All
      </div>
      { 
        category.map((item,key)=>{
          return(
            <div className="Category-tab" key={key} onClick={()=>{fetchSelectedCategoryProducts(item)}}>
              {item}
            </div>
          )
        })
      }
      </div>
      {items.length > 0 && 
      <div className="Card-container">
      { 
        items.map((item,key)=>{
          return(
          <Card item={item}  key={key}/>
          )
        })
      }
      </div> || <img  src={loading} alt="logo" />}
      <Footer/>
      </div> || <img  src={loading} alt="logo" />
      }
    </div>
  );
}
export default App;