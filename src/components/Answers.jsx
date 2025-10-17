import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../Helper';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

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

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          // style={dark} // dark style not working properly
          language={match[1]}
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    }
  };

  return (
    <>
      {
        index == 0 && totalResult > 1 ? <span className='text-xl block text-white'>{answer}</span> :
          heading ? <span className='pt-2 text-lg block dark:text-white text-zinc-800'>{answer}</span>
            : <span className={type == 'q' ? "pl-1" : "pl-5"}>
              <ReactMarkdown components={renderer}>
                {answer}
              </ReactMarkdown>
            </span>
      }
    </>
  )
}

export default Answers
