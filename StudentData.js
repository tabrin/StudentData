import React, { useRef, useState } from "react";
import Data from "../data.json";

const StudentData = () => {
  const [data, setData] = useState(Data);
  const [editState, setEditState] = useState(-1);
  return (
    <>
      <div className="tableWarap">
        <div>
          <AddStudent setData={setData} />
          <form onSubmit={handleUpdate}></form>
          <table>
            <thead>
              <th>Name</th>
              <th>Roll no</th>
              <th>Class</th>
              <th>Action</th>
            </thead>
            {data.map((current) =>(
              editState === current.id ? 
                <EditStudent current={current} data={data} setData={setData} />
               : 
                <tr>
                  <td>{current.name}</td>
                  <td>{current.rollno}</td>
                  <td>{current.clas}</td>
                  <td>
                    <button type="button" className="edit"  onClick={() => handleEdit(current.id)}> Edit </button>
                    <button type="button" className="delete" onClick={()=>handleDelete(current.id)}>Delete</button>
                  </td>
                </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
  //to update the data
  function handleUpdate(e){
    e.preventDefault()
const name = e.target.elements.name.value;
const rollno = e.target.elements.rollno.value;
const clas = e.target.elements.clas.value;
const updateData = data.map((d=> d.id === editState ? {...d, name :name, rollno:rollno, clas:clas}: d))
setEditState(-1)
setData(updateData)   
  }

  let handleEdit=(id)=> {
    setEditState(id);
  }

  function handleDelete(id){
    const updatedData = data.filter((d)=> id!== d.id)
    setData(updatedData)

  }
};
//Component to EditStudent
function EditStudent({current, data, setData}) {
  function handleName(e){
    const name = e.target.value;
    const updatedData = data.map((d)=>d.id===current.id ? {...d, name:name} : d)
    setData(updatedData)
  }
  function handleRollno(e){
    const rollno = e.target.value;
    const updatedData = data.map((d)=>d.id===current.id ? {...d, rollno:rollno} : d)
    setData(updatedData)
  }
  function handleClas(e){
    const clas = e.target.value;
    const updatedData = data.map((d)=>d.id===current.id ? {...d, clas:clas} : d)
    setData(updatedData)
  }
  return (
    <>
      <tr>
        <td>
          <input type="text" onChange={handleName} autoComplete="off"  name="name" value={current.name} placeholder="Enter Name"/>
        </td> <br /><br />
        <td> 
          <input type="number" onChange={handleRollno} name="rollno" value={current.rollno}  placeholder="RollNo"  /> 
          </td> <br /> <br />
        <td>
          <input type="number" onChange={handleClas} name="clas" value={current.clas}  placeholder="class" />
        </td> <br />  <br />
        <button type="Submit">Update</button>
      </tr>
    </>
  );
}
// Component to Add Student Data
function AddStudent({ setData }) {

  const nameRef = useRef();
  const rollRef = useRef();
  const clasRef = useRef();
  function handleValue(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const rollno = e.target.elements.rollno.value;
    const clas = e.target.elements.clas.value;
    console.log(clas)
    const newMember = {
      id: 5,
      name,
      rollno,
      clas,
    };
    setData((preData) => preData.concat(newMember));
    nameRef.current.value = "";
    rollRef.current.value = 0;
    clasRef.current.value = 0;
  }
  return (
    <>
      <div className="addForm" onSubmit={handleValue}>
        <form>
          <label htmlFor="name">Full Name :</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            ref={nameRef}
          />
          <br />
          <br />
          <label htmlFor="rollno">Roll No :</label>
          <input
            type="number"
            name="rollno"
            ref={rollRef}
            placeholder="RollNo"
          />
          <br />
          <br />
          <label htmlFor="clas">Class :</label>
          <input
            type="number"
            name="clas"
            ref={clasRef}
            placeholder="class"
          />
          <br />
          <br />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}
export default StudentData;
