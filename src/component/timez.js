import React, { useState, useEffect } from 'react';

const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(10000);
  }, []);

  return (
    
        <h5>{seconds}</h5>
    
  )
}

export default IntervalExample