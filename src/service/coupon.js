import http from './http';

 export const  getAllCoupons = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const coupons = await http.get('/coupon/get-all-coupons');
            if (!coupons.data?.error) {
                resolve(coupons.data)
            } else {
                reject(coupons.data)
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const addCoupon = (data) =>{
    return new Promise( async(resolve,reject)=>{
        try {
            const coupons =  await http.post('/coupon/add',data);
            if (!coupons.data?.error) {
                resolve(coupons.data)
            } else {
                reject(coupons.data)
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const redeemCoupon = (data)=>{
 return   new Promise( async(resolve,reject)=>{
        try {
            const coupons =  await http.post('/coupon/redeem',data);
            if (!coupons.data?.error) {
                resolve(coupons.data)
            } else {
                reject(coupons.data)
            }
        } catch (err) {
            reject(err)
        }
    })
}