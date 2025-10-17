import React from 'react'
import Answers from './Answers'

const QuestionAnswer = ({ item, index }) => {

  return (
    <>
      <div key={index + Math.random()} className={item.type == "q" ? "flex justify-end" : ""}>
        {
          item.type == "q" ?
            <li key={index + Math.random()} className='text-right p-1 border-8 dark:bg-zinc-700 bg-red-100 dark:border-zinc-700 border-red-100 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit ml-auto dark:text-white text-zinc-800'
            ><Answers ans={item.text} index={index} totalResult={1} type={item.type} /></li>
            : item.text.map((ansItem, ansIndex) => (
              <li key={ansIndex + Math.random()} className='text-start'><Answers ans={ansItem} index={ansIndex} type={item.type} totalResult={item.length} /></li>
            ))
        }
      </div>
    </>
  )
}

export default QuestionAnswer
