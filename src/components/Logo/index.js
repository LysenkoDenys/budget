import ErrorSimulation from '../ErrorSimulation';

const Logo = () => (
  <>
    {/* simulate an Error to test ErrorBoundary on <Logo/> */}
    {/* <ErrorSimulation /> */}
    <img src="/assets/dollar.png" alt="logo" className="h-12 cursor-pointer" />
  </>
);

export default Logo;
