import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';






const Product = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const {id} = useParams()
  

useEffect(() => {
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(val => val.json())
  .then(val => {
    setProduct(val)
  })
},[])

const deleteProduct = () => {
  fetch(`https://fakestoreapi.com/products/${id}`,{
    metod: "delete"
  }).then(res => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
       
        return new Promise((res=>{
        res(  swal(`${product.id} nomreli mehsul silindi, status: ${res.status}`, {
          icon: "success",
          
        }))
        }))
        .then(()=>{
          navigate('/products')
        })
      
      
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  })

}

  return (
    <div className='product'>
      <div className='container'>
        <div className='product-card'>
          
         <Box sx={{ width: 500 }}>
      <Card variant="outlined"> 
    <CardContent>
       
      
      <Typography variant="h5" component="div" style={{display: 'flex', justifyContent: 'center'}}>
      <img src={product.image} alt="image" style={{height: '300px'}} />
      </Typography>
      <Typography sx={{ fontSize: 24, color: 'blue' }} color="text.secondary" gutterBottom>
      {product.title}
      </Typography>
      <Typography sx={{ mb: 1.5, color: 'red' }} color="text.secondary">
       {'Price  ' + product.price}
      </Typography>
      <Typography variant="body2">
        {product.description}
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={deleteProduct}>Delete Product</Button>
    </CardActions>
  </Card>
    </Box>
        </div>
      </div>
    </div>
  )
}


export {Product}