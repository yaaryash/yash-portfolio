import { useState, useEffect } from "react";
import { PROFILE } from "@/lib/profile";

interface BootSequenceProps {
  onBootComplete: () => void;
}

const ASCII_ART = `
██╗   ██╗ █████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║
 ╚████╔╝ ███████║███████╗███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║
   ██║   ██║  ██║███████║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

const BOOT_MESSAGES = [
  "Initializing terminal...",
  "Loading user profile...",
  "Mounting portfolio filesystem...",
  "Starting shell session...",
  "Connecting to portfolio server...",
  "Loading project database...",
  "Initializing command interface...",
  "Ready.",
];

export const BootSequence = ({ onBootComplete }: BootSequenceProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < BOOT_MESSAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setShowWelcome(true);
          setTimeout(() => {
            onBootComplete();
          }, 1000);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(timer);
  }, [onBootComplete]);

  return (
    <div className="h-screen bg-background text-foreground font-mono flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full">
        {!showWelcome ? (
          <div className="space-y-2">
            {BOOT_MESSAGES.slice(0, currentMessage + 1).map(
              (message, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span
                    className={index === currentMessage ? "type-animation" : ""}
                  >
                    {message}
                  </span>
                </div>
              ),
            )}
            <div className="flex items-center mt-4">
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        ) : (
          <div className="boot-animation text-center">
            <pre className="text-green-500 text-xs md:text-sm mb-6 overflow-x-auto">
              {ASCII_ART}
            </pre>
            <div className="text-lg md:text-xl mb-4">
              Welcome to{" "}
              <span className="text-yellow-500">{PROFILE.firstName}'s</span>{" "}
              Portfolio Terminal
            </div>
            <div className="text-sm md:text-base mb-6 text-gray-400">
              <div>
                {PROFILE.role} • {PROFILE.location} • {PROFILE.tagline}
              </div>
              <div>{PROFILE.goal}</div>
            </div>
            <div className="text-sm text-blue-400">
              Type <span className="text-yellow-500">'help'</span> to get
              started
            </div>
            <div className="mt-8 text-xs text-gray-400">
              Portfolio v2.0.1 - Built with React & TypeScript
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
