import React from 'react'
import Graph from './Graph'
 import { useEffect } from 'react';
 import{ auth, db} from '../firebaseConfig';
 import {toast} from 'react-toastify'


const Stats = (
    {   wpm,
        accuracy,
        correctChars,
        incorrectChars,
        missedChars,
        extraChars,
        graphData }
) => {

    const timeSet = new Set();
    const newGraph = graphData.filter(i=>{
       if(!timeSet.has(i[0])){
           timeSet.add(i[0]);
           return i;
       }
   })

   
 

    //   if(isNaN(accuracy)){
    //     accuracy=0;
    //   }

   const pushDataToDB = ()=>{
    
    if(isNaN(accuracy)){
        toast.error('invalid test', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
     const resultRef = db.collection('Results');  // if database have result collection s give a refernce other wise create a result collection
    const {uid} = auth.currentUser;
    resultRef.add({
        wpm: wpm,
        accuracy: accuracy,
        timeStamp: new Date(),
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        userId: uid
    }).then((res)=>{
        toast.success('Data save to DB', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }).catch((err)=>{
        toast.error('not able to save result', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    });
   }

   //if user is not login dont save the data in db
   useEffect(()=>{
    if(auth.currentUser){
        pushDataToDB();
    }
    else{
        toast.warning('Log in to save result', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
   })


    return (
        <div className="stats-box">
            <div className="left-stats">
                <div className="title">WPM</div>
                <div className="subtitle">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="subtitle">{accuracy}</div>
                <div className="title">Characters</div>
                <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
                {/* <button onClick={handleClick}>Restart</button> */}
            </div>
            <div className="right-stats">
                <Graph  graphData={newGraph}/>

            </div>
        </div>
    )
}

export default Stats