import { NextResponse } from "next/server";
import Midtrans from "midtrans-client"

function splitName(fullName : string) {
    const [first_name, ...lastNameParts] = fullName.split(" ");
    const last_name = lastNameParts.join(" ");
    return { first_name, last_name };
  }

export async function POST(req : Request){
    const snap = new Midtrans.Snap({
        isProduction : false,
        serverKey : process.env.SECRET_MIDTRANS,
        clientKey : process.env.NEXT_PUBLIC_CLIENT
    })
    try {
        const {paymentId, name, category, price,username,email, } = await req.json()
        const {first_name, last_name} = splitName(username)
        const parameter = {
            item_details:{
                name : name ,
                category: category,
                price: price,
                quantity : 1
            },
            transaction_details :{
                order_id : paymentId,
                gross_amount : price 
            },
            customer_details: {
                first_name : first_name,
                last_name : last_name,
                email : email
            }
        }

        const token = await snap.createTransactionToken(parameter)
        return NextResponse.json({token})

    } catch (error) {
        console.log(error);
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}