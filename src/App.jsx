import React, { useEffect, useState } from 'react';
import './App.css';
import { URL } from './Constants';
import Answers from './components/Answers';

const App = () => {
  const [question, setQuestiony] = useState("");
  const [result, setResult] = useState([]);
  const [resentHistory, setResentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSelectedHistory] = useState(null);

  // Gemini API details
  const API_KEY = "AIzaSyC8wcPyp6i_VjkxK59boY3bQzHEoAFI56s";
  const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const askQuestion = async () => {
    try {
      if (question.trim() === "" && !selectedHistory) return;

      // Save to localStorage history
      if (question) {
        if (localStorage.getItem('history')) {
          let history = JSON.parse(localStorage.getItem('history'));
          history = [question, ...history];
          localStorage.setItem('history', JSON.stringify(history));
          setResentHistory(history);
        } else {
          localStorage.setItem('history', JSON.stringify([question]));
          setResentHistory([question]);
        }
      }

      const questionToAsk = selectedHistory || question;
      const payload = {
        contents: [{
          parts: [{ text: questionToAsk }]
        }]
      };

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Gemini Response: data", data);

      let answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response text";
      answer = answer.split("* ");
      answer = answer.map((item) => item.trim());

      // console.log("Gemini Response:", answer);
      setResult([...result, { type: "q", text: question ? question : selectedHistory }, { type: "a", text: answer }]);
      setQuestiony("");
    } catch (err) {
      console.error("Gemini API error:", err.message);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('history');
    setResentHistory([]);
  }

  const isEnter = (e) => {
    if (e.key === 'Enter' && question.trim() !== "") {
      askQuestion();
      setQuestiony("");
    }
  }

  useEffect(() => {
    if (selectedHistory) {
      // setQuestiony(selectedHistory);
      askQuestion(selectedHistory);
      setSelectedHistory(null);
    }
  }, [selectedHistory]);

  return (
    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-zinc-800'>
          <h1 className='text-white text-2xl pt-2'>Recent Search
            <button onClick={clearHistory} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>
            </button>
          </h1>

          <ul className='text-left overflow-auto'>
            {resentHistory && resentHistory.map((item, index) => (
              <li key={index + Math.random()} className='p-3 pl-4 border-bs border-zinc-600 text-white hover:bg-zinc-700 cursor-pointer'
                onClick={() => setSelectedHistory(item)}>{item.length > 20 ? item.slice(0, 30) + "..." : item}</li>
              // onClick={() => setQuestiony(item)}>{item.length > 20 ? item.slice(0, 30) + "..." : item}</li>
            ))
            }
          </ul>
        </div>
        <div className='col-span-4 p-10'>
          <div className='container h-120'>
            <h1 className='text-white text-3xl'>ReactAI Chat</h1>
            <div className='text-zinc-300 h-100 rounded-md overflow-auto'>
              <ul>
                {
                  result.map((item, index) => (
                    <div key={index + Math.random()} className={item.type == "q" ? "flex justify-end" : ""}>
                      {
                        item.type == "q" ?
                          <li key={index + Math.random()} className='text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit ml-auto text-white'
                          ><Answers ans={item.text} index={index} totalResult={1} type={item.type} /></li>
                          : item.text.map((ansItem, ansIndex) => (
                            <li key={ansIndex + Math.random()} className='text-start'><Answers ans={ansItem} index={ansIndex} type={item.type} totalResult={item.length} /></li>
                          ))
                      }
                    </div>
                  ))
                }
                {/* {
                  result && result.map((item, index) => (
                    <li key={index + Math.rendom()}>
                      <Answers ans={item} index={index} totalResult={result.length} />
                    </li>
                  ))
                } */}
              </ul>
            </div>
          </div>
          <div className='bg-zinc-800 w-1/2 p-2 pr-5 text-white m-auto rounded-4xl border border-zinc-600 flex h-16'>
            <input type="text" className="w-full h-full p-3 outline-none"
              value={question} onKeyDown={isEnter} onChange={(e) => setQuestiony(e.target.value)} placeholder='Type your message here...' />
            <button onClick={askQuestion} className="">Ask</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

