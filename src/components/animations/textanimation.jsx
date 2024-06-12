import  { useState, useEffect } from 'react';

const TextAnimation = () => {
  const [text, setText] = useState('');
  const targetText = 'Welcome to FindSafe Security Provider';

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      setText(targetText.slice(0, currentIndex));
      currentIndex = (currentIndex + 1) % (targetText.length + 1);
    }, 300);

    return () => clearInterval(timer);
  }, [targetText]);

  return (
    <div className="text-center text-3xl font-bold">
      <span>{text}</span>
      <span className="animate-blink">|</span>
    </div>
  );
};

export default TextAnimation;