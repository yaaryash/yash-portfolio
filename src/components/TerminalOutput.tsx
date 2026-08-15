import { PROFILE } from "@/lib/profile";

interface TerminalOutputProps {
  command: string;
  output: React.ReactNode;
}

export const TerminalOutput = ({ command, output }: TerminalOutputProps) => (
  <div className="mb-2">
    <div className="flex gap-2">
      <span className="text-green-500">{PROFILE.username}@portfolio:~$</span>
      <span>{command}</span>
    </div>
    {output && <div className="mt-1">{output}</div>}
  </div>
);