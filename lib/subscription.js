import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async()=>{
    const {userId} = auth()

    if(!userId){
        return false
    }

    const userSubscription = await prismadb.userSubcription.findUnique({
        where:{userId},
        select:{
            stripeSubcriptionId:true,
            stripeCustomerId:true,
            stripePriceId:true,
            stripeCurrentPeriodEnd: true
        }
    })

    if(!userSubscription){
        return false
    }

    const isValid  = userSubscription.stripePriceId && 
    userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS> Date.now()

    return !!isValid
}