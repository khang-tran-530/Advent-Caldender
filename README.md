# Valentine's Day Advent Calendar

A beautiful, interactive Valentine's Day advent calendar website built with React.

## Features

- 🎁 14-day advent calendar with daily rewards
- 💝 Interactive "Will you be my Valentine?" question
- 🧸 Beautiful teddy bear illustration
- ✨ Elegant pink and red color scheme
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
AdventCalender/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Customization

You can customize the advent calendar by:
- Updating the `unlockedDays` and `currentDay` state in `App.js`
- Replacing the SVG teddy bear with your own image
- Modifying colors in `App.css`
- Adding more interactive features

## License

MIT
