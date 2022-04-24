import React,{useState} from 'react';
import { redeemCoupon } from '../service/coupon';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';


function RedeemCoupon() {
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState("");
  const [response, setResponse] = useState("");
  const [cartValue,setCartValue] = useState("");
  const [loading,setLoading] = useState(false);

const handleSubmit = async (e)=>{
  e.preventDefault();
  let coupon = {
    couponCode:couponCode,
    amount:amount
  }
   try {
    setLoading(true)
     const couponResponse  = await redeemCoupon(coupon);
     toast.success(couponResponse.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
      setResponse(couponResponse?.response?.discount);
      setCartValue(couponResponse?.response?.CartValue)
      setLoading(false)
       setCouponCode("");
       setAmount("");
   } catch (err) {
    setCouponCode("");
    setAmount("");
    setLoading(false)
    console.log(err)
    toast.success('Coupon expired', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
   }

}

  return (
    <>
      {loading===true?<Loading /> : ""}
    <div className='col-md-4 m-auto pt-5'>
       <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pause />
    <Form onSubmit={(e) => handleSubmit(e)}>
    <Form.Group className="mb-3">
            <Form.Label>Coupon Code</Form.Label>
            <Form.Control type="text" required name='couponCode' value={couponCode} onChange={(event) => { setCouponCode(event.target.value) }} placeholder="Coupon code" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" required name='amount' min={0} value={amount} onChange={(event) => { setAmount(event.target.value) }} placeholder="100" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>

    <div className="col-md-12 mt-5">
    {cartValue !== '' ? <h1>Cart Value : {cartValue}</h1> : ''}
        {response !== '' ? <h1>Coupon Discount : {response}</h1> : ''}
       
    </div>
</div>
</>
  )
}

export default RedeemCoupon