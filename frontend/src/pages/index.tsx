import { Inter, Itim } from '@next/font/google'
import 'bulma/css/bulma.min.css';
import { ImCross } from "react-icons/im";
import { ImPencil } from "react-icons/im";
import { FaTelegramPlane } from "react-icons/fa";
import { useState } from 'react';





export default function Home( {data ,error }:{data:any,error:any} ) {

  
  const [val,setVal]=useState(data)
  const [charge,setCharge]=useState('')
  const [amountVal,setAmount]=useState(0)

  const handleCharge = (e:any) =>{
    setCharge(e.target.value)
  }
  const handleAmount = (e:any) =>{
    setAmount(e.target.value)
  }

  const handleSubmit = async() => {
    if (charge !== "" && amountVal > 0) {
      const response = await fetch('https://wassim69.pythonanywhere.com/playground/set' ,{
        method:'POST',
        body : JSON.stringify({expense:charge,amount:amountVal}),
        headers:{
          'content-type':'application/json',
        },}) 
    } else{
      alert('Empty input field !!')
    }
  }

  const centerStyle={
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
  }
  const pageSize={
    width:"60%",
    margin:"50px auto ",
    justifyContent:"center",
    alignItems:"center"
  }

  return (
    <>
      <div style={pageSize}>
        <div className="box " >
         <div className="form" >
          <div className="columns">
              <div className="column is-half">
                <label htmlFor="expenseValue">Expense</label>
                <div className="control">
                  <input className='input' type="text" placeholder='e.g car' value={charge} onChange={handleCharge}/>
                </div>
              </div>
              <div className="column is-half">
                <label htmlFor="amountValue">Amount</label>
                <div className="control">
                  <input className='input' type="number" placeholder='100' value={amountVal} onChange={handleAmount} />
                </div>
              </div>
            </div>
            <div  style={centerStyle}>
              <button className='button is-danger' type='submit' onClick={handleSubmit}>Submit <FaTelegramPlane/> </button>
            </div>
         </div>
         
          <div className="columns">
            <div className="column">
              <ul>
                  { val.map( (expenses : any)=> 
                    <li key={expenses.id}>
                      <div>
                        <span>{expenses.expense}</span>  
                        <span>${expenses.amount}</span>   
                        <button className='button is-small is-primary is-inverted'><ImPencil/></button>
                        <button className='button is-danger is-small is-inverted'><ImCross/></button>
                      </div>
                    </li>
                  ) }
              </ul>
            </div>
          </div>


        </div>
        <div className="box" style={{textAlign:"center"}}>
          <h1>total: <span>${data.reduce((acc: any,curr: { amount: any; }) =>   acc + curr.amount , 0 )}</span></h1>
        </div>
      </div>
      
    
    </>
  )
}

export async function getStaticProps() {
  let data =[]
  let error=null
  try{
    const response = await fetch("https://wassim69.pythonanywhere.com/playground/list")
    data = await response.json()
    return {
      props:{
        data:data,
        error:error,
      }
    }
  }catch(err){
    error=err
  }
  if(!data.length){
    return {
      notFound:true,
    }
  }
}
