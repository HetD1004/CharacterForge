# CharacterForge

CharacterForge is an AI-powered tool for UX designers and researchers to create rich personas and mood boards based on real user interviews and customer data.


## 🌟 Features

- 🧠 **AI-Powered Analysis**: Extract personality traits from interview text using Groq's LLM
- 👤 **Persona Creation**: Generate detailed personas with goals, frustrations, and pain points
- 🎨 **Mood Board Creation**: Visualize design concepts and themes using Excalidraw
- 🌙 **Dark/Light Modes**: Work comfortably in any environment
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 📊 **Export Options**: Save and share your work easily

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Bun or npm

### Installation

1. Clone the repository:
\\\ash
git clone https://github.com/HetD1004/character-forge.git
cd character-forge
\\\

2. Install dependencies:
\\\ash
# Using Bun (recommended)
bun install

# Or using npm
npm install
\\\

3. Create a \.env\ file with your Groq API key:
\\\
VITE_GROQ_API_KEY=your_api_key_here
\\\

4. Start the development server:
\\\ash
# Using Bun
bun dev

# Or using npm
npm run dev
\\\

5. Open [http://localhost:5173](http://localhost:5173) to see the app

## �� Persona Creation Workflow

1. **Interview Input**: Paste interview transcripts or notes
2. **Adjective Grouping**: Review and organize AI-extracted personality traits
3. **Persona Details**: Fill out comprehensive persona information
4. **Export**: Save your persona as PDF or image

## 🎨 Mood Board Creation

Use the intuitive canvas to create and organize visual elements representing your design direction.

## 🔧 Technologies

- **React + TypeScript**: For type-safe component development
- **Vite**: Fast build tool and development environment
- **shadcn/ui**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first styling
- **Groq API**: Advanced language model integration
- **Excalidraw**: Lightweight drawing and diagramming

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Excalidraw](https://excalidraw.com/) for the mood board canvas
- [Groq](https://groq.com/) for the AI language model

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\git checkout -b feature/amazing-feature\)
3. Commit your changes (\git commit -m 'Add some amazing feature'\)
4. Push to the branch (\git push origin feature/amazing-feature\)
5. Open a Pull Request
