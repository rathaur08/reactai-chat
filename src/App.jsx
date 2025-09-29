import React from 'react';
import './App.css';

const App = () => {
  return (
    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-amber-500'>
          <h1 className='text-white text-3xl pt-2'>ReactAI Chat</h1>
        </div>
        <div className='col-span-4 p-10'>
          <div className='container h-120'>
            <h1 className='text-white text-3xl'>ReactAI Chat</h1>
          </div>
          <div className='bg-orange-600 w-1/2 p-1 pr-5 text-white'>
            <input type="text" placeholder='Type your message here...' className='bg-transparent w-full outline-none border-none' />
            <button className='bg-amber-500 px-3 py-1 rounded-md hover:bg-amber-600'>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

