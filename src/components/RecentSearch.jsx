import React from 'react'

const RecentSearch = ({ resentHistory, setResentHistory, setSelectedHistory }) => {


  const clearHistory = () => {
    localStorage.removeItem('history');
    setResentHistory([]);
  }

  return (
    <>
      <div className='col-span-1 bg-zinc-800 pt-3'>
        <h1 className='text-white text-2xl'>Recent Search
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
    </>
  )
}

export default RecentSearch
