import React, {useRef, useState,useEffect,useMemo,createRef} from 'react'
import UpperMenu from './UpperMenu';
import { generate as randomWords } from 'random-words';
import { useTestMode } from '../Context/TestModeContext';
import Stats from "./Stats"
const TypingBox = () => {
    
    const inputRef=useRef("null");
    //countdown for timer
    const { testTime } = useTestMode();

    const [countDown, setCountDown] = useState(testTime);
    const [intervalId, setIntervalId] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [wordsArray,setWordsArray]= useState(()=>{
        return randomWords(50)
    });
        //for matching the character need index
        const [currWordIndex, setCurrWordIndex] = useState(0);
        const [currCharIndex, setCurrCharIndex] = useState(0);
        const [graphData, setGraphData] = useState([]);
    

      //use usememo, and createref to create the reference of each  span word in wordsArray
      const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray]);

    console.log(wordsSpanRef)


    //code for setting timer
    const startTimer = () => {

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);

        function timer() {
            setCountDown((latestCountDown) => {

                setCorrectChars((correctChars)=>{

                    setGraphData((graphData)=>{
                        return [...graphData, [testTime-latestCountDown+1, (correctChars/5)/((testTime-latestCountDown+1)/60)]];
                    })
                    return correctChars;
                })

                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }

                return (latestCountDown - 1);
            });
        }
    }

    function resetTest(){
        clearInterval(intervalId);
        setCountDown(testTime)
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomWords(50)); 
        
           
    //     setGraphData([]);
    // setCorrectChars(0);
    // setCorrectWords(0);
    // setExtraChars(0);
    // setIncorrectChars(0)
    // setMissedChars(0);

        focusInput();
        resetWordsSpanRefClassname();
    }
    const resetWordsSpanRefClassname = () => {
        wordsSpanRef.map(i => {
            Array.from(i.current.childNodes).map(j => {
                j.className = '';
            })
        });
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }

//handling typing box

    function handleUserInput(e){
    //start timer when user start typing
        if(!testStart){
            startTimer();
            setTestStart(true);
        }
        if(wordsSpanRef[currWordIndex].current){

        let allCurrChars=wordsSpanRef[currWordIndex].current.childNodes;
   
        //space functionality=> jump to new word(32 is key code for space key in keyboard)
         if(e.keyCode === 32){
             
            //logic for space
          

            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if (correctCharsInWord.length === allCurrChars.length) {
                setCorrectWords(correctWords + 1);
            }
            console.log("sahi hai :" + correctWords)
            console.log("sramm:" + correctCharsInWord)
 
            if (allCurrChars.length <= currCharIndex) {
                //remove cursor from last place in a word
                allCurrChars[currCharIndex - 1].classList.remove('current-right');
            }
            else {
                //calculate the missed chars
                 setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                //remove cursor in between the words
                allCurrChars[currCharIndex].classList.remove('current');
            }
            //cursor is blinking starting of character of next word
            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';

            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;

         }

             //logic for backspace
        if (e.keyCode === 8) {

            if (currCharIndex !== 0) {

                if (allCurrChars.length === currCharIndex) {

                    if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += ' current-right';
                    }
                    else {
                        allCurrChars[currCharIndex - 1].className = 'current';
                    }

                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }

            return;

        }

// handling for when we press any text in place of space means extra charachter
if (currCharIndex === allCurrChars.length) {

    let newSpan = document.createElement('span');
    newSpan.innerText = e.key;
    newSpan.className = 'incorrect extra current-right';
    allCurrChars[currCharIndex - 1].classList.remove('current-right');
    wordsSpanRef[currWordIndex].current.append(newSpan);
    setCurrCharIndex(currCharIndex + 1);

    //count extra chars
    setExtraChars(extraChars + 1);
    return;
}



        if(e.key === allCurrChars[currCharIndex].innerText){
             //change the color of char

            allCurrChars[currCharIndex].className='correct';

            // counting correct characters
            setCorrectChars(correctChars+1);
        }
        else{
            allCurrChars[currCharIndex].className='incorrect';

            //counting incorrect characters
            setIncorrectChars(incorrectChars+1);
        }
        // if index at last char of word change the cursor from left to right

        if(currCharIndex+1 === allCurrChars.length){
            allCurrChars[currCharIndex].className+=" current-right";
        }
        else{
        //for blinking cursor is moving along typing
         
            allCurrChars[currCharIndex+1].className="current";
        }
        setCurrCharIndex(currCharIndex+1);

         

    }
}

             //calculate the WPM

                const calculateWPM = () => {
      
                return Math.round((correctChars/5)/(testTime/60));
           }; 

           // calculating accuracy
           
           const calculateAcc = () => {
            return Math.round((correctWords/currWordIndex)*100);
         }

         
      //on page load the focus on inputbox
      const focusInput = () => {
        inputRef.current.focus();
    }
     


   
      
    useEffect(() => {
        resetTest()
    }, [testTime])

    useEffect(() => {
        focusInput();
        // startTimer();
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    },[])

  return (
    <div>
        <UpperMenu countDown={countDown}/>
        {
            (testEnd) ?(
                <Stats wpm={calculateWPM()}
                    accuracy={calculateAcc()}
                    correctChars={correctChars}
                    incorrectChars={incorrectChars}
                    missedChars={missedChars}
                    extraChars={extraChars}
                    graphData={graphData}
                    resetTest={resetTest}
                />)   : (
    <div className='type-box' onClick={focusInput}>
        <div className="words">
            {
                wordsArray.map((word,index)=>(
                    <span className='word' ref={wordsSpanRef[index]}>{
                        word.split("").map((char)=>(
                            <span >{char}</span>
                        ))
                    }</span>
                ))
            }
        </div>
    </div>)
            
        }
    <input type="text" className="hidden-input"
    ref={inputRef} 
    onKeyDown={handleUserInput}/>
    </div>
  )
}

export default TypingBox
