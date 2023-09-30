import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";

//Todo Application with API Integration

function Todohome() {
  const [myarray, setmyarray] = useState([]);
  const [task, settask] = useState("");
  const[comtask,setcomtask]=useState("All")
  
  const [refresh, setRefresh] = useState(false);
  

  useEffect(() => {
    // step 1 -> using axios to get the initial list from this api
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => {
        console.log(res);
        // step 2 -> collect api data and set it into a new state called myarray
      setmyarray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const submitfn = (e) => {
    e.preventDefault()
    setRefresh(prevRefresh => !prevRefresh);
    setmyarray([...myarray, { title: task, completed: false,id:myarray.length+1 }]);
     //    ... obj name  = spread operator
  };

  const changestatus = (id)=>{
    // alert(id)
    setRefresh(prevRefresh => !prevRefresh);
    const x = myarray[id]
    // if(x.completed==true){
    //   x.completed=false
    // }
    // else{
    //   x.completed=true
    // }
    x.completed=true
    const y = myarray
    y.splice(id,1,x)
    setmyarray(y)
  } 

const edittitle = (id)=>{
  const x = myarray[id]
  setRefresh(prevRefresh => !prevRefresh);
    x.title=prompt("Enter the new task")
    console.log(x);
    const y = myarray
    y.splice(id,1,x)
    setmyarray(y)
}


const deletefn = (id)=>{
  setRefresh(prevRefresh => !prevRefresh);
      const x = myarray
      x.splice(id, 1)
      console.log(x);
      setmyarray(x)
      // alert("deleted")
}


  return (
    <div className="todo" class="header">
      <form className="Form1" onSubmit={submitfn}>
        <h2 className="headerh2">TODO APP</h2>

        <select onChange={(e)=>{setcomtask(e.target.value)}}>
          <option> All</option>
          <option> Completed</option>
          <option> Not Completed</option>
        </select><br/><br/>


        
        <input className="input"
          type="text"
          placeholder="add here..."
          name="addtodo"
          onChange={(e) => {
            settask(e.target.value);
          }}
          required
        />
        <br /><br/>

        <button class="btn btn-danger">
          Add
        </button>
      </form>

      {myarray.map((a,index) => {
        let status;
        let color
        if (a.completed) {
          status = "completed";
          color='green'
        } else {
          status = "not completed";
          color='red'
        }


        if(comtask=="All"){
          return (
            <div key={index}>
            <p onClick={()=>{changestatus(index)}} style={{color:color}}  >
              {a.title}, {status} 
            </p>
            <button onClick={()=>{edittitle(index)}} class="btn btn-light" style={{margin:"10px"}}> Edit</button>
             <button onClick={()=>{deletefn(index)}}class="btn btn-light"> Delete</button>
             <hr/></div>
          );
        }
        else if(comtask=="Completed"){
          if(a.completed==true){
            return (<div  key={index}>
              <p onClick={()=>{changestatus(a.id)}} style={{color:color}}  >
                {a.title}, {status}
              </p>
              <button onClick={()=>{edittitle(a.id)}} class="btn btn-light"> Edit</button>
               <button onClick={()=>{deletefn(index)}} class="btn btn-light"> Delete</button> <hr/></div>
            )
          }
        }
        else if(comtask=="Not Completed"){
          if(a.completed==false){
            return (<div  key={index}>
              <p onClick={()=>{changestatus(a.id)}}  style={{color:color}}>
                {a.title}, {status} 
              </p>
              <button onClick={()=>{edittitle(a.id)}} class="btn btn-light"> Edit</button>
               <button onClick={()=>{deletefn(index)}} class="btn btn-light"> Delete</button><hr/></div>
            )
          }
        }
        
      })}

    </div>
  );
}

export default Todohome;
