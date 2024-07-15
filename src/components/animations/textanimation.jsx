import  { useState, useEffect } from 'react';
import { Logo } from '../logo';
const TextAnimation = () => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing');
  const targetText = 'Welcome to FindSafe Security Provider';

  useEffect(() => {
    let currentIndex = 0;
    let timer;

    const animate = () => {
      if (phase === 'typing') {
        if (currentIndex <= targetText.length) {
          setText(targetText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setPhase('pausing');
          currentIndex = targetText.length;
        }
      } else if (phase === 'pausing') {
        setPhase('erasing');
      } else if (phase === 'erasing') {
        if (currentIndex > 0) {
          setText(targetText.slice(0, currentIndex - 1));
          currentIndex--;
        } else {
          setPhase('typing');
          currentIndex = 0;
        }
      }
    };

    timer = setInterval(() => {
      animate();
    }, phase === 'pausing' ? 2000 : 100);

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="text-center font-bold flex  flex-col w-screen justify-center items-center">
      <h1 className="text-4xl mb-2 text-blue-600 flex items-center gap-3"> <Logo height={40} width={40}/> FindSafe</h1>
      <div className="h-8"> {/* Fixed height container */}
        <span className="text-2xl text-gray-700">{text}</span>
        <span className={`text-2xl ${phase !== 'pausing' ? 'animate-blink' : 'opacity-0'}`}>|</span>
      </div>
    </div>
  );
};

export default TextAnimation;