import React, { useState } from 'react';
import './App.css';
import { URL } from './Constants';
import Answers from './components/Answers';

const App = () => {
  const [question, setQuestiony] = useState("");
  const [result, setResult] = useState([]);

  const API_KEY = "AIzaSyC8wcPyp6i_VjkxK59boY3bQzHEoAFI56s";
  const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const payload = {
    contents: [
      {
        parts: [
          { text: question }
        ]
      }
    ]
  };

  const askQuestion = async () => {
    try {
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
      console.log("Gemini Response: data", data);

      let answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response text";
      answer = answer.split("* ");
      answer = answer.map((item) => item.trim());

      console.log("Gemini Response:", answer);
      setResult([...result, { type: "q", text: question }, { type: "a", text: answer }]);
    } catch (err) {
      console.error("Gemini API error:", err.message);
    }
  };

  return (
    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-zinc-800'>
          <h1 className='text-white text-3xl pt-2'>ReactAI Chat</h1>
        </div>
        <div className='col-span-4 p-10'>
          <div className='container h-110'>
            <h1 className='text-white text-3xl'>ReactAI Chat</h1>
            <div className='text-zinc-300 h-85 rounded-md overflow-scroll'>
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
              value={question} onChange={(e) => setQuestiony(e.target.value)} placeholder='Type your message here...' />
            <button onClick={askQuestion} className="">Ask</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

