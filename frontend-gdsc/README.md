# FlagGuard - Content Analysis System

FlagGuard is a modern web application that provides real-time content analysis for files and text, helping users identify potential security threats and malicious content.

## Features

### 1. Dual Analysis System

- **File Analysis**: Upload and scan various file types for potential threats
- **Text Analysis**: Real-time analysis of text input for suspicious content

### 2. Supported File Types

- Text files (.txt, .md)
- PDF documents (.pdf)
- Images (.png, .jpg, .jpeg)

### 3. Threat Detection

- Malicious link detection
- Suspicious language analysis
- Potential scam identification
- Data theft attempt detection

### 4. User Interface

- Modern, responsive design
- Dark/Light theme support
- Drag-and-drop file upload
- Real-time analysis feedback

### 5. History Tracking

- Maintains upload history
- Detailed threat analysis reports
- Historical trend monitoring

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/flagguard.git
cd flagguard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Upload.jsx      # Main upload and analysis component
│   ├── Info.jsx        # Help and support information
│   ├── History.jsx     # Upload history display
│   ├── Login.jsx       # User authentication
│   ├── Register.jsx    # User registration
│   └── Logo.jsx        # FlagGuard logo component
├── context/
│   └── ThemeContext.js # Theme management
└── styles/
    └── *.css          # Component styles
```

## Features in Detail

### Content Analysis

- Real-time threat detection
- Multiple threat type identification
- Probability-based risk assessment
- Detailed analysis reports

### Security Features

- End-to-end encryption
- Secure file handling
- No sensitive data storage
- Encrypted analysis process

### User Experience

- Intuitive drag-and-drop interface
- Real-time analysis feedback
- Theme customization
- Responsive design for all devices


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js for the frontend framework
- react-dropzone for file upload functionality
- Theme implementation inspired by modern design practices
