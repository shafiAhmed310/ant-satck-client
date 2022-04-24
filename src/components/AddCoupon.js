import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addCoupon } from '../service/coupon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCoupon() {
    let date = new Date();

    let today = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    const [couponType, setCouponType] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [minimunDiscoutAmount, setMinimunDiscoutAmount] = useState("");
    const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
    const [expiredAt, setExpiredAt] = useState(today);
    const [couponCode, setCouponCode] = useState("");
    const [response, setResponse] = useState("");
    

    function generateCouponCode() {
        let coupon = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++) {
            coupon += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        setCouponCode(coupon)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        generateCouponCode()
        let coupon = {
            couponType: couponType,
            discountPercentage: discountPercentage,
            minimunDiscoutAmount: minimunDiscoutAmount,
            maxDiscountAmount: maxDiscountAmount,
            expiredAt: expiredAt,
            couponCode: couponCode
        }

        try {
            const data = await addCoupon(coupon);
            setResponse(data.response)
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCouponType("");
            setDiscountPercentage("");
            setMinimunDiscoutAmount("");
            setMaxDiscountAmount("");
            setExpiredAt("");
            setCouponCode("");

        } catch (err) {
           console.log(err)
        }

    }

    useEffect(() => {
        generateCouponCode()
    }, [])
    return (
        <>

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
            <div className='col-md-4 m-auto pt-5'>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Select name="couponType" required value={couponType} onChange={(event) => { setCouponType(event.target.value) }} aria-label="Select coupon type">
                        <option>Open this select menu</option>
                        <option value="Flat discount">Flat discount</option>
                        <option value="Maximum discount">Maximum discount</option>
                    </Form.Select>
                    <Form.Group className="mb-3">
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control type="number"  min={0} required name='discountPercentage' value={discountPercentage} onChange={(event) => { setDiscountPercentage(event.target.value) }} placeholder="10" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Minimun Cart Amount</Form.Label>
                        <Form.Control type="number"  min={0} required name='minimunDiscoutAmount' value={minimunDiscoutAmount} onChange={(event) => { setMinimunDiscoutAmount(event.target.value) }} placeholder="500" />
                    </Form.Group>
                    {couponType === 'Maximum discount' ?
                        <Form.Group className="mb-3">
                            <Form.Label>Maximum Discount Amount</Form.Label>
                            <Form.Control type="number"  min={0} required={couponType === 'Maximum discount'} name='maxDiscountAmount' value={maxDiscountAmount} onChange={(event) => { setMaxDiscountAmount(event.target.value) }} placeholder="1000" />
                        </Form.Group> : ""
                    }
                    <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="date"  min={today} required name='expiredAt' value={expiredAt} onChange={(event) => { setExpiredAt(event.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <div className="col-md-12 mt-5">
                    {response !== '' ? <h1>Coupon Code : {response}</h1> : ''}
                </div>
            </div>
        </>
    )
}

export default AddCoupon