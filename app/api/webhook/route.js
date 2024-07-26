import Stripe from "stripe";
import {headers} from "next/headers"
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";



export async function POST(req){
    const body = await req.text()

    const signature = headers().get("Stripe-Signature") 

    let event;

    try {
        event = stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return new NextResponse(`Webhook Error: ${error.message}`,{status:400})
    }

     const session = event.data.object;

     if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        if(!session.metadata.userId) {
            return new NextResponse("User Id is Required",{status:400})
        }

        await prismadb.userSubcription.create({
            data:{userId:session.metadata.userId,
                stripeSubcriptionId:subscription.id,
                stripeCustomerId:subscription.customer,
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
            }
        })
     }

     if(event.type === "invoice.payment.suceeded"){
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        await prismadb.userSubcription.update({
            where:{
                stripeSubcriptionId:subscription.id
            },
            data:{
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
            }
        })
     }

     return new NextResponse(null,{status:200})
}