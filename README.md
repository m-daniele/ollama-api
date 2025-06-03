# Ollama Nickname Generator API

A simple Express.js API that generates creative nicknames using Ollama's Gemma3:1b model.

## Features

- Generate 3 unique nicknames per request
- RESTful API endpoints
- CORS enabled for cross-origin requests
- Health check endpoint
- Customizable prompts via template file

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Ollama](https://ollama.ai/) installed and running
- Gemma3:1b model pulled in Ollama

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd ollama-nickname-generator
```

2. Install dependencies:
```bash
npm install
```

3. Make sure Ollama is installed and pull the required model:
```bash
ollama pull gemma3:1b
```

## Usage

1. Start the server:
```bash
npm start
```

2. The API will be available at `http://localhost:3001`

## API Endpoints

### Generate Nicknames
- **POST** `/nickname`
- **Body**: `{ "prompt": "your custom prompt here" }`
- **Response**: `{ "response": "1. Nickname1\n2. Nickname2\n3. Nickname3" }`

Example request:
```bash
curl -X POST http://localhost:3001/nickname \
  -H "Content-Type: application/json" \
  -d '{"prompt": "genera nicknames per gamer"}'
```

### Health Check
- **GET** `/health`
- **Response**: `{ "status": "ok", "message": "API Ollama è attiva" }`

## Configuration

The nickname generation rules are defined in `src/prompt.txt`. You can modify this file to change the output format and generation rules.

Current format generates exactly 3 nicknames in a numbered list format.

## Environment Variables

- `PORT`: Server port (default: 3001)

## Project Structure

```
├── src/
│   ├── server.ts          # Main Express server
│   └── prompt.txt         # Template prompt for nickname generation
├── package.json
└── README.md
```

## Dependencies

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `child_process`: For spawning Ollama process
