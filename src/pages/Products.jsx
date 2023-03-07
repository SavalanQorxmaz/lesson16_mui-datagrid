

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
      },
      {
        field: 'category',
        headerName: 'Category',
        width: 150,
        editable: true,
      },
  
      {
        field: 'price',
        headerName: 'Price',
        width: 110,
        editable: true,
      },

  ];
  



const Products = () => {

    const [data, setData] = useState([])
    let [id, setId] = useState(-1)
    const [selected, setSelected] = useState([0])
    let [flag, setFlag] = useState(true)
  
    const navigate = useNavigate()
 

  useEffect(() => {
   
     fetch(`https://fakestoreapi.com/products`).then( val =>  val.json()).then(val=>{
        setData(val)
     })

  }, [flag])



  const selectedRows = (val) => {

    const tempArray = [...selected]
  let tempId;
    tempId = tempArray.indexOf(val.id)
   if( tempId < 0) {tempArray.push(val.id)}else{tempArray.splice(tempId,1)}
    setSelected([...tempArray])
    console.log(val.id)
    console.log(tempArray)
    if(tempArray.length>1){
        document.querySelector('.delete-rows').classList.remove("hide");
        document.querySelector('.delete-rows').classList.add('show')
    }
    else{
        document.querySelector('.delete-rows').classList.add("hide");
        document.querySelector('.delete-rows').classList.remove('show')
    }

  }

//   promise variantinda yaz
  const deleteSelectedRows = ()=> {
console.log(selected.length)
    while(selected.length >1){
       data.map( async(rowData) =>{
            if(selected.pop() == rowData.id){
             await  fetch(`https://fakestoreapi.com/products/${rowData.id}`,{
                method: "delete"
               }).then(res=>console.log(res))
            }
        }
       
            )
    }
 
  }


  const detailsProduct = (row)=> {
    navigate(`/product/${row.row.id}`)
    setFlag(!flag)
  }

    return (
        <div className='products'>


            <div className="container">
            <Box sx={{ height: 700, width: '100%' }}>
            <Button onClick={deleteSelectedRows} className='hide delete-rows' variant="contained" sx={{width: '100%'}}>Delete Selected</Button>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
        disableSelectionOnClick
        onCellClick={selectedRows}
        onCellDoubleClick = {detailsProduct}
       
        
        
      />
    </Box>
      
            </div>




        </div>
    )
}

export { Products }
