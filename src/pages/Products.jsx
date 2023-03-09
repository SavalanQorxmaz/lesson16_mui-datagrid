

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
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
  const [selected, setSelected] = useState([])
  let [flag, setFlag] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {

    fetch(`https://fakestoreapi.com/products`).then(val => val.json()).then(val => {
      setData(val)
    })

  }, [flag])



  const selectedRows = (val) => {

    const tempArray = [...selected]
    let tempId;

    tempId = tempArray.indexOf(val.id)
    if (tempId < 0) { tempArray.push(val.id) } else { tempArray.splice(tempId, 1) }
    setSelected([...tempArray])
    console.log(val.id)
    console.log(tempArray)
    if (tempArray.length > 0) {
      document.querySelector('.delete-rows').classList.remove("hide");
      document.querySelector('.delete-rows').classList.add('show')
    }
    else {
      document.querySelector('.delete-rows').classList.add("hide");
      document.querySelector('.delete-rows').classList.remove('show')
    }

  }



  const deleteSelectedRows = () => {
    console.log(selected.length)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          return new Promise(resolve => {
            while (selected.length > 0) {
              fetch(`https://fakestoreapi.com/products/${selected.pop()}`, {
                method: "delete"
              })
                .then(res => console.log(res))
            }
          })
            .then(swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            }))
        } else {
          swal("Your imaginary file is safe!");
        }
      })
    // checkbox temizlenme usulunu arasdir
  }

  // details product function
  const detailsProduct = (row) => {
    navigate(`/product/${row.row.id}`)
    setFlag(!flag)
  }
  // search product function

  const searcProduct = () => {
    const e = document.getElementById('search')
    let str = e.value;
    if (e.value !== '') {
      const el = []
      let ss = new RegExp(str, 'gi');
      let endData = []

      data.map((val, index) => {
        if (val.title.search(ss) > -1) {
          el.push(index)
        }

      })
      fetch(`https://fakestoreapi.com/products`).then(valu => valu.json()).then(valu => {
        valu.map(((row, ind) => {
          el.map(elValue => {
            if (ind === elValue) {
              endData.push(row)
            }
          })
        }))

      }).then(res => setData(endData))

    }
    else {
      fetch(`https://fakestoreapi.com/products`).then(val => val.json()).then(val => {
        setData(val)
      })
    }
  }

  return (
    <div className='products'>
      <div className="container">
        <Box sx={{ height: 700, width: '100%' }}>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField id="search" label="Search" variant="outlined" sx={{ width: '70%' }} />
            <Button onClick={searcProduct} sx={{ height: '100%' }} variant="contained">Axtar</Button></div>

          <Button onClick={deleteSelectedRows} className='hide delete-rows' variant="contained" sx={{ width: '100%' }}>Delete Selected</Button>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            checkboxSelection
            // disableRowSelectionOnClick
            // disableSelectionOnClick
            onCellClick={selectedRows}
            onCellDoubleClick={detailsProduct}



          />
        </Box>

      </div>




    </div>
  )
}

export { Products }
