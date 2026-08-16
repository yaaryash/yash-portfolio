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
    <div>
      <p className="text-green-500 mb-3">
        Let's connect! Here's where you can find me:
      </p>

      <div className="space-y-2 ml-4">
        <div>
          <span className="text-yellow-500">GitHub:</span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-400 hover:underline"
          >
            github.com/{PROFILE.username}
          </a>
        </div>

        <div>
          <span className="text-yellow-500">LinkedIn:</span>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-400 hover:underline"
          >
            linkedin.com/in/{PROFILE.username}
          </a>
        </div>

        <div>
          <span className="text-yellow-500">Email:</span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="ml-2 text-blue-400 hover:underline"
          >
            {PROFILE.email}
          </a>
        </div>

        <div>
          <span className="text-yellow-500">Location:</span>
          <span className="ml-2 text-cyan-400">{PROFILE.location}</span>
        </div>
      </div>

      <p className="mt-4 text-gray-500">
        Feel free to reach out for collaborations, frontend/backend
        opportunities, or just to say hi!
      </p>
    </div>
  ),

  skills: () => {
    const categories = [
      {
        title: "Languages",
        color: "text-yellow-500",
        items: ["Python", "JavaScript (ES6+)", "HTML5", "CSS3"],
      },
      {
        title: "Frontend",
        color: "text-cyan-400",
        items: [
          "React.js",
          "Next.js",
          "Tailwind CSS",
          "Material UI",
          "Bootstrap",
        ],
      },
      {
        title: "Backend",
        color: "text-blue-400",
        items: ["Node.js", "Express.js", "Flask", "REST APIs", "JWT"],
      },
      {
        title: "Databases",
        color: "text-purple-400",
        items: ["MongoDB", "MySQL"],
      },
      {
        title: "AI/ML",
        color: "text-pink-400",
        items: ["Pandas", "NumPy", "Scikit-learn", "PyTorch"],
      },
      {
        title: "Cloud & DevOps",
        color: "text-orange-400",
        items: ["AWS (EC2, S3)", "Docker", "Nginx", "PM2", "GitHub Actions"],
      },
    ];

    return (
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-green-500 font-bold mb-2">{cat.title}:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
              {cat.items.map((item) => (
                <span key={item} className={cat.color}>
                  • {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },

  projects: () => {
    const completed = [
      {
        name: "DevTinder",
        tech: "MERN, AWS EC2, Nginx, PM2, Redux Toolkit",
        desc: "Full-stack developer networking platform with swipe-based matching.",
        liveUrl: "http://51.20.192.28/",
        url: "https://github.com/yaaryash/DevTinder-BE",
      },
      {
        name: "QKart",
        tech: "React, Node.js, Express.js, MongoDB",
        desc: "Full-stack e-commerce app with JWT auth and REST APIs.",
        liveUrl: "https://qkart-frontend-yaaryash.vercel.app/",
        url: "https://github.com/yaaryash/Qkart-Backend",
      },
      {
        name: "Multilingual AI Voice Assistant",
        tech: "Python, Streamlit, Gemini API, SpeechRecognition",
        desc: "Voice/text AI assistant with speech-to-text and text-to-speech.",
        // liveUrl:
        // "https://github.com/yaaryash/Personal-AI-Voice-Assistant-System",
        url: "https://github.com/yaaryash/Personal-AI-Voice-Assistant-System",
      },
    ];

    const inProgress = [
      {
        name: "🛡️ Cyber Threat Detection Platform",
        tech: "Scikit-learn, XGBoost, MLflow, FastAPI, Docker, AWS (S3, ECR, EC2), GitHub Actions",
        desc: "End-to-end MLOps pipeline that detects phishing websites from URL/SSL/domain features. Full pipeline: ingestion → validation → transformation → model comparison → FastAPI serving → CI/CD to AWS.",
        url: "https://github.com/yaaryash/Cyber-Threat-Detection-Platform",
      },
      {
        name: "This Portfolio",
        tech: "React, TypeScript, Tailwind CSS",
        desc: "The terminal you're using right now.",
        url: "https://github.com/yaaryash/yash-portfolio",
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <p className="text-yellow-500 mb-3">Completed Projects:</p>
          <div className="space-y-4">
            {completed.map((p) => (
              <div key={p.name} className="border-l-2 border-green-500 pl-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-300 font-bold hover:underline"
                >
                  {p.name} ↗
                </a>
                <div className="flex gap-3 text-xs">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      🔗 Live Demo
                    </a>
                  )}
                </div>
                <p className="text-purple-400 text-xs mb-1">{p.tech}</p>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-yellow-500 mb-3">🚧 In Progress:</p>
          <div className="space-y-4">
            {inProgress.map((p) => (
              <div key={p.name} className="border-l-2 border-orange-400 pl-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-300 font-bold hover:underline"
                >
                  {p.name} ↗
                </a>
                <p className="text-purple-400 text-xs mb-1">{p.tech}</p>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-400 text-sm">
          Click any project name to view it on GitHub.
        </p>
      </div>
    );
  },

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandNames = Object.keys(COMMANDS);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isBooted && history.length === 0) {
      setHistory([
        { command: "", output: COMMANDS.banner(), timestamp: new Date() },
      ]);
    }
  }, [isBooted, history.length]);

  const executeCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

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
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentCommand(value);

    if (value) {
      const matches = commandNames.filter((cmd) =>
        cmd.startsWith(value.toLowerCase()),
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
      setHistoryIndex(-1);
      setSuggestions([]);
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
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === 1) {
        setCurrentCommand(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

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
      <div className="flex items-center">
        <span className="text-green-500">{PROFILE.username}@portfolio:~$</span>
        {isLoading ? (
          <div className="terminal-loading"></div>
        ) : (
          <input
            ref={inputRef}
            value={currentCommand}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none flex-1 text-foreground ml-2"
            autoFocus
            spellCheck={false}
          />
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="text-sm text-gray-500 mt-1">
          Suggestions: {suggestions.join(", ")}
        </div>
      )}
    </div>
  );
};
