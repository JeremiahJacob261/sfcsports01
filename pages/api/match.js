// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
let apiKey = 'akpomoshi18+'; // your api key
export default async  function handler(req, res) {
    const body = req.body;
    const defTime = (data) => {
        let dateString = data.date;
        let timeString = data.time;
        let dateParts = dateString.split("-");
        let timeParts = timeString.split(":");
    
        // Create a new Date object
        let date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);

        // Get the timestamp
        let timestamp = date.getTime();
        return timestamp;
      }
    const { data,error } = await supabase
    .from('bets')
    .select()
    .eq('verified', false)
    .order('id', { ascending: false });
    // console.log(Math.floor(new Date().getTime()/1000.0))
    // console.log(defTime(data[2])/1000.0)
//   data.map((data)=>{ 
//     if(defTime(data)/1000.0 > Math.floor(new Date().getTime()/1000.0)){
//         console.log('yes')
        
//     }else{
//         console.log('no')
//     }
//   });
let bts = data.filter(i => defTime(i)/1000.0 > Math.floor(new Date().getTime()/1000.0));
                res.status(200).json({
                    status: 'success',
                    data: bts
            });
            
}