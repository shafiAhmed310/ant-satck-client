import React, { useState, useEffect } from 'react';
import { getAllCoupons } from '../service/coupon'
import { Table } from 'react-bootstrap'

function CouponList() {
    const [coupons, setCoupons] = useState([])

    const getCoupons = async () => {
        try {
            const data = await getAllCoupons();
            setCoupons(data.response);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCoupons()
    }, [])




    return (
        <div className="col-md-10 m-auto">
            <Table striped bordered hover variant="dark" className='mt-5 pt-5'>
                <thead>
                    <tr>
                        <th>Coupon Code</th>
                        <th>Coupon Type</th>
                        <th>Discount Percentage</th>
                        <th>Minimun Discout Amount</th>
                        <th>Maximum Discount Amount</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coupons.map((ele) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{ele.couponCode}</td>
                                    <td>{ele.couponType}</td>
                                    <td>{ele.discountPercentage}</td>
                                    <td>{ele.minimunDiscoutAmount}</td>
                                    <td>{ele.maxDiscountAmount}</td>
                                    <td>{ele.expiredAt}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default CouponList