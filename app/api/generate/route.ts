import Groq from "groq-sdk";
import {supabase} from "@/lib/supabase";

const groq=new Groq({
    apiKey: process.env.GROQ_API_KEY
})

export async function POST(req:Request){
    //using async fxn kyuki we waiting for response too.
    console.log("API HIT")
    const body=await req.json();
    console.log(body)

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",

          content: `
          Create a study plan.
          Subject: ${body.subject}
          Topics: ${body.topics}
          Exam Date: ${body.examDate}

          Return:
          Day 1
          - topic
          - topic
          Day 2 
          - topic 
          - topic
          `,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });
    console.log("Groq finished")

    const plan =completion.choices[0].message.content;
    //use table "study_plans"
    const {data,error}=await supabase.from("study_plans").insert([{
        subject:body.subject,
        topics:body.topics,
        exam_date:body.examDate,
        plans:plan
    }]);
    console.log(data);
    console.log(error);


    return Response.json({
        plan
    });
}
