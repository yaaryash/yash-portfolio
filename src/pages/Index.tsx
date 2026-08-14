import { useState } from "react";
import { BootSequence } from "../components/BootSequence";

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return <BootSequence onBootComplete={() => setIsBooted(true)} />;
  }

  return <div className="h-screen flex items-center justify-center">Terminal goes here (Day 2)</div>;
};

export default Index;