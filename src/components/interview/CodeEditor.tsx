
import React, { useState, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Copy, Download, RotateCw, Code2 } from "lucide-react";

const SUPPORTED_LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
];

const DEFAULT_CODE = {
  javascript: "// Write your JavaScript code here\nfunction example() {\n  return 'Hello, world!';\n}\n\nconsole.log(example());",
  python: "# Write your Python code here\ndef example():\n    return 'Hello, world!'\n\nprint(example())",
  java: "// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, world!\");\n    }\n}",
  cpp: "// Write your C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello, world!\" << std::endl;\n    return 0;\n}",
};

interface CodeEditorProps {
  codingQuestion: string;
}

// Memoized TextArea to prevent unnecessary re-renders
const MemoizedTextarea = memo(
  ({ value, onChange, className, readOnly }: { 
    value: string; 
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
    className: string; 
    readOnly?: boolean 
  }) => (
    <Textarea
      value={value}
      onChange={onChange}
      className={className}
      readOnly={readOnly}
    />
  )
);
MemoizedTextarea.displayName = 'MemoizedTextarea';

const CodeEditor = ({ codingQuestion }: CodeEditorProps) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<Record<string, string>>(DEFAULT_CODE);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCode(prev => ({
      ...prev,
      [language]: newValue,
    }));
  }, [language]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    // In a real implementation, this would send the code to a backend for execution
    // For this demo, we'll simulate a response
    setTimeout(() => {
      setOutput(`Executing ${language} code...\n\n> Running code...\n> Hello, world!\n\n✅ Program executed successfully.`);
      setIsRunning(false);
    }, 1500);
  }, [language]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code[language]);
  }, [code, language]);

  const downloadCode = useCallback(() => {
    const extensions: Record<string, string> = {
      javascript: "js",
      python: "py",
      java: "java",
      cpp: "cpp",
    };
    
    const element = document.createElement("a");
    const file = new Blob([code[language]], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${extensions[language]}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [code, language]);

  const resetCode = useCallback(() => {
    setCode(prev => ({
      ...prev,
      [language]: DEFAULT_CODE[language as keyof typeof DEFAULT_CODE],
    }));
  }, [language]);

  return (
    <Card className="glass-morphism border-primary/10 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Code2 className="mr-2 h-5 w-5" />
            Code Editor
          </CardTitle>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={runCode} 
              disabled={isRunning}
              className="bg-primary/10 hover:bg-primary/20"
            >
              <Play className="h-4 w-4 mr-1" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyCode}
              className="bg-primary/10 hover:bg-primary/20"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadCode}
              className="bg-primary/10 hover:bg-primary/20"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetCode}
              className="bg-primary/10 hover:bg-primary/20"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-hidden p-3">
        <div className="mb-2">
          <ScrollArea className="h-24 rounded-md border p-2">
            <div className="text-sm">
              <strong>Question:</strong> {codingQuestion}
            </div>
          </ScrollArea>
        </div>
        <Tabs value={language} onValueChange={handleLanguageChange} className="flex-grow flex flex-col">
          <TabsList className="bg-muted/70">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <TabsTrigger key={lang.id} value={lang.id}>
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-grow flex flex-col mt-2 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <TabsContent key={lang.id} value={lang.id} className="flex-grow flex flex-col m-0 p-0">
                <div className="flex-grow flex flex-col">
                  <div className="text-xs text-muted-foreground mb-1">Editor</div>
                  <MemoizedTextarea
                    value={code[lang.id]}
                    onChange={lang.id === language ? handleCodeChange : undefined}
                    className="flex-grow font-mono text-sm bg-muted/30 min-h-[300px]"
                  />
                  <div className="text-xs text-muted-foreground mb-1 mt-2">Output</div>
                  <MemoizedTextarea
                    value={output}
                    readOnly
                    className="h-32 font-mono text-sm bg-background"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default memo(CodeEditor);
