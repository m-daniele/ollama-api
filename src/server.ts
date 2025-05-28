import { spawn } from "child_process";
import express from "express";
import cors from "cors";
import { readFileSync } from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Read the template prompt from file at startup
let templatePrompt;
try {
  templatePrompt = readFileSync('src/prompt.txt', 'utf-8').trim();
  console.log("Loaded template prompt from file");
} catch (error) {
  console.error("Error reading prompt file:", error);
  templatePrompt = `
Format your response as a numbered list:
1. [Username1]

2. [Username2] 
3. [Username3]`;
}

app.post("/nickname", (req, res) => {
  console.log("Received request:", req.body); // Debug log
  
  const userPrompt = req.body.prompt || "genera 3 nicknames casuali";
  
  // Combine user prompt with template
  const fullPrompt = `${userPrompt}\n\n${templatePrompt}`;
  
  console.log("Full prompt being sent:", fullPrompt); // Debug log
  
  const ollama = spawn("ollama", ["run", "gemma3:1b"], {
    stdio: ["pipe", "pipe", "inherit"],
  });
  
  ollama.stdin.write(fullPrompt);
  ollama.stdin.end();
  
  let output = "";
  
  ollama.stdout.on("data", (data) => {
    output += data.toString();
  });
  
  ollama.stdout.on("end", () => {
    console.log("Ollama response:", output.trim());
    res.json({ response: output.trim() });
  });
  
  ollama.on("error", (error) => {
    console.error("Ollama error:", error);
    res.status(500).json({ error: "Ollama process failed" });
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API Ollama è attiva" });
});

const PORT = parseInt(process.env.PORT || "3001", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Ollama attiva su http://0.0.0.0:${PORT}`);
});