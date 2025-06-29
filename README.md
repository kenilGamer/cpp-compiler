# C++ Online Compiler

![GitHub repo stars](https://img.shields.io/github/stars/kenilGamer/cpp-compiler?style=social)
![GitHub forks](https://img.shields.io/github/forks/kenilGamer/cpp-compiler?style=social)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> A modern web app to write, compile, and run C++, Python, Java, JavaScript, and C code in your browser.

## 🖼️ Demo

![App Screenshot](public\image.png)

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features
- **Multi-language support:** C++, C, Java, Python, JavaScript, and more
- **Monaco code editor:** Syntax highlighting, auto-completion, code formatting
- **Real-time code suggestions:** Custom keywords and snippets
- **Input/Output panel:** Provide stdin and view output easily
- **Execution stats:** See execution time and memory usage
- **Quick actions & examples:** Instantly load code templates
- **Secure execution:** Sandboxed via Judge0 API
- **Responsive design:** Works on desktop, tablet, and mobile
- **Easy customization:** Add new languages, snippets, or UI tweaks

---

## 🛠️ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/kenilGamer/cpp-compiler
cd cpp-compiler
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up environment variables**
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_JUDGE0_API_KEY=your_rapidapi_key_here
NEXT_PUBLIC_JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
```

### 4. **Run the development server**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage
- Select your language from the dropdown
- Write or paste your code in the editor
- Provide input (stdin) if needed
- Click **Run Code** to compile and execute
- View output, errors, and execution stats
- Use quick actions and examples for templates
- Explore `/docs` for full documentation

---

## ⚙️ Customization
- Add new languages in `app/utils/constants.js`
- Add or edit code examples and quick actions in the same file
- Tweak UI in `app/components/` and styles in `app/globals.css`
- Extend documentation by adding markdown files to `docs/`

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📝 License
This project is licensed under the MIT License.

![GitHub repo stars](https://img.shields.io/github/stars/kenilGamer/cpp-compiler?style=social)
![GitHub forks](https://img.shields.io/github/forks/kenilGamer/cpp-compiler?style=social)
![GitHub issues](https://img.shields.io/github/issues/kenilGamer/cpp-compiler)
![GitHub last commit](https://img.shields.io/github/last-commit/kenilGamer/cpp-compiler)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
