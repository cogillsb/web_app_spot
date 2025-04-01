
"use client";

import { useState, useEffect} from 'react';
import { getCookie } from '../actions/userSettings';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

interface props {
  disable: boolean;
  onStateChange: (value: number) => void;
}

function Counter({ onStateChange, disable }: props) {
  const [count, setCount] = useState(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = (dir: 'up' | 'down') => {
    const id = setInterval(() => {
      if (dir === 'up') {
        setCount((prevCount) => prevCount < 100 ? prevCount + 1 : prevCount);
      }
      if (dir === 'down') {
        setCount((prevCount) => prevCount > 1 ? prevCount - 1 : prevCount);
      }
    }, 200);
    setIntervalId(id);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId as NodeJS.Timeout);
  };

  useEffect(() => {
    const getReps = async () => {
      const result = await getCookie('reps');
      const numberValue = result ? parseInt(result, 10) : 10;
      setCount(numberValue);
      onStateChange(numberValue);
    };
    getReps();   
  }, []);

  useEffect(() => {
    console.log("count:" + count)
    onStateChange(count);
  }, [count]);

  return (
    <div className="flex flex-row items-center space-x-2">
      <label>Reps:</label>
      <div className="flex flex-row justify around">
        <Button variant="outline" size="icon" onMouseDown={() => handleMouseDown('down')}
          onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} disabled={disable}>
          <ChevronLeft />
        </Button>
        <p className="m-2">{count}</p>
        <Button variant="outline" size="icon" onMouseDown={() => handleMouseDown('up')}
          onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} disabled={disable}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}


export default Counter;
