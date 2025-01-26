import { useEffect, useState, useRef } from 'react';

const Counter = () => {
  const [clicks, setClicks] = useState(0);
  const [step, setStep] = useState(1);

  const handleClick = () => {
    setClicks(clicks + step);
  };

  const handleChange = (e) => {
    setStep(+e.target.value);
  };

  const currentValue = useRef(0);

  const showValue = () => {
    currentValue.current = clicks;
    console.log(currentValue); //
    debugger;
    setTimeout(() => {
      alert(currentValue.current);
    }, 3000);
  };

  useEffect(() => {
    console.log('render useEFFECT', clicks);
    document.title = `Component rendered. Clicked ${clicks} times`;
    console.log(document.title);
    setStep((prevValue) => prevValue + 1);
  }, [clicks, setStep]);

  useEffect(() => {
    console.log(`Step: `, step);
  }, [step]);

  return (
    <>
      <div className="">Clicked:{clicks}</div>
      <button className="" onClick={handleClick}>
        Click:
      </button>
      <br />{' '}
      <button className="" onClick={showValue}>
        Show Value:
      </button>
      <br />
      <input
        ref={currentValue}
        type="number"
        value={step}
        name="step"
        onChange={handleChange}
      />
    </>
  );
};

export default Counter;
