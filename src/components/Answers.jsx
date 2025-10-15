import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../Helper';

const Answers = ({ ans, index, totalResult, type }) => {
  console.log("data-3", totalResult, ans, index, type);
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
      {
        index == 0 && totalResult > 1 ? <span className='text-xl block text-white'>{answer}</span> :
          heading ? <span className='pt-2 text-lg block text-white'>{answer}</span>
            : <span className={type == 'q' ? "pl-1" : "pl-5"}>{answer}</span>
      }
    </>
  )
}

export default Answers
