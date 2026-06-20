import {supabase} from "@/lib/supabase";
import Link from "next/link";

export default async function Plans(){
    // console.log("this is working");
    //async: fetch database-> wait-> render
    const {data,error}= await supabase.from("study_plans").select("*");
    // console.log(error);
    //data is a list of dictionary/map
    return(
        
        <div className="min-h-screen bg-[#Df7] p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">MY PLANS</h1>
                <Link href="/" className="bg-[#D4AF37] px-5 py-3 rounded-3xl text black">
                Home
                </Link>
            </div>
            <div className="grid gap-6">
        {
            data?.map((plan)=>(
                // <h1>PLANS</h1>
                <div key={plan.id} className="text-xs m-4 p-4 h-100 w-90 bg-white shadow-lg">
                <h2>{plan.subject}</h2>
                <p> {plan.topics}</p>
                <pre className="m-1 bg-gray-100 p-3 rounded-lg whitespace-pre-wrap break-words overflow-y-auto max-h-82">{plan.plans}</pre>
                </div>
            ))
        }
        </div>
        </div>
    )
}

