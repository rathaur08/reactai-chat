import React, { useState } from 'react';
import './App.css';
import { URL } from './Constants';
import Answers from './components/Answers';

const App = () => {
  const [question, setQuestiony] = useState("");
  const [result, setResult] = useState(undefined);

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
      setResult(answer);
    } catch (err) {
      console.error("Gemini API error:", err.message);
    }
  };

  return (
    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-amber-500'>
          <h1 className='text-white text-3xl pt-2'>ReactAI Chat</h1>
        </div>
        <div className='col-span-4 p-10'>
          <div className='container h-120'>
            <h1 className='text-white text-3xl'>ReactAI Chat</h1>
            <div className='bg-slate-200 h-96 mt-5 p-5 rounded-md overflow-y-scroll'>
              {/* {result ? <p className='text-left text-black'>{result}</p> : <p className='text-left text-black'>No response yet</p>} */}
              <ul>
                {
                  result && result.map((item, index) => (
                    <li key={index}>
                      <Answers ans={item} index={index} totalResult={result.length} />
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className='bg-orange-600 w-1/2 p-1 pr-5 text-white'>
            <input type="text" value={question} onChange={(e) => setQuestiony(e.target.value)} placeholder='Type your message here...' className='bg-transparent w-full outline-none border-none' />
            <button onClick={askQuestion} className='bg-amber-500 px-3 py-1 rounded-md hover:bg-amber-600'>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

