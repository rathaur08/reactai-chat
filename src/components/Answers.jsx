import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../Helper';

const Answers = ({ ans, index, totalResult }) => {
  console.log("data-3", totalResult, ans, index);
  // replaceHeadingStars
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);


  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, [ans]);

  // function checkHeading(str) {
  //   return /^(\*)(\*)(.*)\*$/.test(str);
  // }

  return (
    <>
      <div className=''>
        {
          index == 0 && totalResult > 1 ? <span className='text-2xl font-bold'>{answer}</span>
            : heading ? <span className='text-1xl font-bold'>{answer}</span> : <span>{answer}</span>
        }
      </div>
    </>
  )
}

export default Answers
