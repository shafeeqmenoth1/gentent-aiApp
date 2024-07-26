import  { auth,currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl('/settings')

export async function GET(){
    try {
       const {userId} = auth()
       const user = await currentUser()

       if(!userId || !user){
        return new NextResponse("Unauthorized",{status:401})
       }

       const userSubcription = await prismadb.userSubcription.findUnique({where:{userId}})

       if(userSubcription && userSubcription.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer:userSubcription.stripeCustomerId,
            return_url:settingsUrl
        })
        return NextResponse.json({url:stripeSession.url})
       }

       const stripeSession = await stripe.checkout.sessions.create({
        success_url:settingsUrl,
        cancel_url:settingsUrl,
        payment_method_types:["card"],
        mode:"subscription",
        billing_address_collection:"auto",
        customer_email:user.emailAddresses[0].emailAddress,
        line_items:[
            {
                price_data:{
                    currency:"INR",
                    product_data:{
                        name:"Gentent",
                        description:"Unlimited"
                    },
                    unit_amount:20000,
                    recurring:{
                        interval:"month"
                    }
                },
                quantity:1
            }
        ],
        metadata:{
            userId
        }
       })
       return  NextResponse.json({url:stripeSession.url})
    } catch (error) {
        console.log("[STRIPE_ERROR]",error);
        return new NextResponse("internal error",{status:500})
    }
}
