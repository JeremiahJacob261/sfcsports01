import { NextResponse } from 'next/server';
import { supabase } from './supabase';
import axios from 'axios';
export default function handler(req, res) {
    const getMR = async (id) => {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            params: {id: id},
            headers: {
              'X-RapidAPI-Key': 'f5b4ee9f21msh394dd2a731e6dbcp1f9a51jsncaf00161d00b',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
          
              const responses = await axios.request(options);
              const result = responses.data;
            let status  = result.response[0].fixture.status.short;
            let output = result.response[0].goals.home + ' - ' + result.response[0].goals.away;
            return { 'status': status, 'score': output };
    }
    // get all teams that have not yet been confirmed for today:
    try {
        const get = async () => { 
            const { data:bts, error:ker } = await supabase
            .from('bets')
            .select('*')
            .match({
                "verified": false
            })
            if (bts.length > 0) {
                bts.map((m) => {
                    getMR(m.match_id).then((matchResult)=>{
                        if(matchResult.status != 'FT') {
                            console.log('match not yet played')
                        
                        }else{
                            try{
                              const updater = async () =>{
                                console.log('updating...',matchResult.score)
                                const { error } = await supabase
                                .from('bets')
                                .update({ verified: true,results: matchResult.score })
                                .eq('match_id', m.match_id);
                              }
                              updater();
                            }catch(e){ 
                                console.log(e)
                            }
                        }
                    })
                       
                   
                   
                    //get match result fr0m api
                   
                    //update match result
                })
            }
            res.status(200).json({ 'status': "success" })
        }
        
        
get()
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'status': "failed" })
    }

}
