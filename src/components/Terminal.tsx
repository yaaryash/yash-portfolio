import { useState, useRef, useEffect, useCallback } from "react";
import { BootSequence } from "./BootSequence";
import { PROFILE } from "@/lib/profile";
import { TerminalOutput } from "./TerminalOutput";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

const ASCII_ART = `
██╗   ██╗ █████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║
 ╚████╔╝ ███████║███████╗███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║
   ██║   ██║  ██║███████║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

const COMMANDS: Record<string, () => React.ReactNode> = {
  help: () => {
    const commandList = [
      ["about", "Learn more about me"],
      ["skills", "Technical skills"],
      ["projects", "Things I've built"],
      ["experience", "Work history"],
      ["contact", "Get in touch"],
      ["resume", "Download resume"],
      ["theme", "Switch light/dark"],
      ["ls", "List all commands"],
      ["whoami", "Who's using this"],
      ["pwd", "Current directory"],
      ["date", "Current date/time"],
      ["neofetch", "System info"],
      ["fortune", "A random quote"],
      ["clear", "Clear the screen"],
    ];
    return (
      <div>
        <p className="text-yellow-500 mb-2">Available commands:</p>
        <div className="space-y-0.5">
          {commandList.map(([cmd, desc]) => (
            <div key={cmd} className="flex">
              <span className="text-blue-400 w-28 shrink-0">{cmd}</span>
              <span className="text-gray-400">— {desc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  banner: () => (
    <div>
      <pre className="text-green-500 text-xs md:text-sm mb-4 overflow-x-auto">
        {ASCII_ART}
      </pre>
      <div className="text-gray-400">
        <div>
          {PROFILE.role} • {PROFILE.location} • {PROFILE.tagline}
        </div>
        <div>{PROFILE.goal}</div>
        <div className="mt-2 text-blue-400">Type 'help' to get started</div>
      </div>
    </div>
  ),

  about: () => (
    <div className="space-y-1">
      <p>
        {PROFILE.name} — {PROFILE.role}
      </p>
      <p className="text-gray-400">{PROFILE.tagline}</p>
      <p className="text-gray-400">{PROFILE.education}</p>
    </div>
  ),

  contact: () => (
    <div className="space-y-1">
      <p>
        GitHub:{" "}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline"
        >
          {PROFILE.github}
        </a>
      </p>
      <p>
        LinkedIn:{" "}
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline"
        >
          {PROFILE.linkedin}
        </a>
      </p>
      <p>
        Email:{" "}
        <a href={`mailto:${PROFILE.email}`} className="text-blue-400 underline">
          {PROFILE.email}
        </a>
      </p>
    </div>
  ),
  skills: () => (
    <div className="space-y-1">
      <p className="text-yellow-500">Technical Skills:</p>
      <p>
        <span className="text-blue-400">Languages:</span> Python, JavaScript
        (ES6+), HTML5, CSS3
      </p>
      <p>
        <span className="text-blue-400">Frontend:</span> React.js, Next.js,
        Tailwind CSS, Material UI, Bootstrap
      </p>
      <p>
        <span className="text-blue-400">Backend:</span> Node.js, Express.js,
        Flask, REST APIs, JWT
      </p>
      <p>
        <span className="text-blue-400">Databases:</span> MongoDB, MySQL
      </p>
      <p>
        <span className="text-blue-400">AI/ML:</span> Pandas, NumPy,
        Scikit-learn, PyTorch
      </p>
      <p>
        <span className="text-blue-400">Cloud/DevOps:</span> AWS (EC2, S3),
        Docker, Nginx, PM2, GitHub Actions
      </p>
    </div>
  ),

  projects: () => (
    <div className="space-y-3">
      <p className="text-yellow-500">Projects:</p>
      <div>
        <p className="text-green-400">DevTinder</p>
        <p className="text-gray-400 text-sm">
          Full-stack developer networking platform with swipe-based matching.
          MERN, AWS EC2, Nginx, PM2, Redux Toolkit.
        </p>
      </div>
      <div>
        <p className="text-green-400">QKart</p>
        <p className="text-gray-400 text-sm">
          Full-stack e-commerce app with JWT auth and REST APIs. React, Node.js,
          Express.js, MongoDB.
        </p>
      </div>
      <div>
        <p className="text-green-400">Multilingual AI Voice Assistant</p>
        <p className="text-gray-400 text-sm">
          Voice/text AI assistant using Gemini API. Python, Streamlit,
          SpeechRecognition.
        </p>
      </div>
      <p className="text-gray-400 text-sm">
        Type 'contact' to find these on GitHub.
      </p>
    </div>
  ),

  experience: () => (
    <div className="space-y-1">
      <p className="text-yellow-500">Work Experience:</p>
      <p className="text-green-400">
        Frontend Developer Consultant — Solytics Partners
      </p>
      <p className="text-gray-400 text-sm">Aug 2024 – Aug 2025</p>
      <p className="text-sm">
        • Modernized a large-scale React app for React 19 migration
      </p>
      <p className="text-sm">
        • Maintained internal forks of third-party libraries for compatibility
      </p>
      <p className="text-sm">
        • Led daily Scrum updates and Jira-based task coordination
      </p>
    </div>
  ),

  theme: () => {
    const setTheme = (theme: "light" | "dark") => {
      if (theme === "light") {
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    };

    return (
      <div className="space-y-1">
        <p>Available themes:</p>
        <span
          className="text-yellow-500 cursor-pointer hover:underline"
          onClick={() => setTheme("dark")}
        >
          • dark
        </span>
        <br />
        <span
          className="text-yellow-500 cursor-pointer hover:underline"
          onClick={() => setTheme("light")}
        >
          • light
        </span>
      </div>
    );
  },
  ls: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-2">
      {Object.keys(COMMANDS).map((cmd) => (
        <span key={cmd} className="text-yellow-500">
          • {cmd}
        </span>
      ))}
    </div>
  ),

  pwd: () => (
    <p className="text-blue-400">/home/{PROFILE.username}/portfolio</p>
  ),

  date: () => <p className="text-blue-400">{new Date().toLocaleString()}</p>,

  whoami: () => <p className="text-green-500">{PROFILE.username}</p>,

  fortune: () => {
    const quotes = [
      "The best code is no code at all.",
      "Premature optimization is the root of all evil.",
      "First, solve the problem. Then, write the code.",
      "Code is like humor. When you have to explain it, it's bad.",
      "It's not a bug – it's an undocumented feature.",
    ];
    return (
      <div>
        <p className="text-yellow-500">🔮 Your fortune:</p>
        <p className="text-blue-400 italic">
          {quotes[Math.floor(Math.random() * quotes.length)]}
        </p>
      </div>
    );
  },

  neofetch: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-yellow-500">OS:</p>
        <p className="text-blue-400">Portfolio OS 1.0</p>
        <p className="text-yellow-500">Shell:</p>
        <p className="text-blue-400">react-terminal v1.0</p>
        <p className="text-yellow-500">Role:</p>
        <p className="text-blue-400">{PROFILE.role}</p>
      </div>
      <div>
        <p className="text-yellow-500">Stack:</p>
        <p className="text-blue-400">React, Node.js, MongoDB</p>
        <p className="text-yellow-500">Location:</p>
        <p className="text-blue-400">{PROFILE.location}</p>
        <p className="text-yellow-500">Editor:</p>
        <p className="text-blue-400">VS Code</p>
      </div>
    </div>
  ),
};

export const Terminal = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Restore saved theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    }
  }, []);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;
    if (trimmedCmd === "") {
      output = null;
    } else if (COMMANDS[trimmedCmd]) {
      output = COMMANDS[trimmedCmd]();
    } else {
      output = (
        <span className="text-red-400">
          Command not found: {cmd}. Type 'help' for available commands.
        </span>
      );
    }

    setHistory((prev) => [
      ...prev,
      { command: cmd, output, timestamp: new Date() },
    ]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const cmds = history.map((h) => h.command).filter(Boolean);
      if (cmds.length > 0) {
        const newIndex =
          historyIndex === -1 ? cmds.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(cmds[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const cmds = history.map((h) => h.command).filter(Boolean);
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= cmds.length) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(cmds[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (isBooted && history.length === 0) {
      setHistory([
        { command: "", output: COMMANDS.banner(), timestamp: new Date() },
      ]);
    }
  }, [isBooted, history.length]);

  if (!isBooted) {
    return <BootSequence onBootComplete={() => setIsBooted(true)} />;
  }

  return (
    <div
      ref={terminalRef}
      className="h-screen overflow-y-auto bg-background text-foreground font-mono p-4"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <TerminalOutput key={i} command={entry.command} output={entry.output} />
      ))}
      <div className="flex gap-2 items-center">
        <span className="text-green-500">{PROFILE.username}@portfolio:~$</span>
        <input
          ref={inputRef}
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 text-foreground"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
};
