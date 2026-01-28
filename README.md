# Startandgrowth - AI Consulting Website

A modern, professional website for Startandgrowth AI consulting and software engineering services. Built with React and featuring advanced animations, dark/light mode, and English/French translations.

## 🌟 Features

- **Modern 2026 Design**: Cutting-edge UI with glassmorphism, animated backgrounds, and floating icons
- **Dark/Light Mode**: Theme toggle with smooth transitions and persistent preferences
- **Bilingual**: Full English/French translation support
- **Real Client Testimonials**: Showcase success stories from STUDIO, Bex Care, Dr. Dieudonnée METO, and POD
- **Calendar Integration**: Direct booking link to Google Calendar
- **Responsive Design**: Optimized for all devices and screen sizes
- **Advanced Animations**: 
  - Floating icons and geometric shapes
  - Mesh gradients with parallax effects
  - Smooth hover transitions
  - Mouse-following glow effect
- **Performance Optimized**: Fast loading with efficient animations

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Router**: React Router DOM v7
- **Build Tool**: Create React App with CRACO

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v16 or higher
- **Yarn**: v1.22 or higher (recommended) or npm

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
yarn install
```

Or if using npm:

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

The frontend uses environment variables for configuration. Create or verify the `.env` file in the `frontend` directory:

```bash
# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:3000
```

**Note**: Since this is a frontend-only website, the backend URL is not actively used. The website functions entirely on the client side.

### 4. Start the Development Server

```bash
yarn start
```

Or with npm:

```bash
npm start
```

The website will open automatically at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   └── ui/         # Shadcn UI components
│   ├── context/        # React context (Theme & Language)
│   ├── pages/          # Page components
│   │   └── Home.jsx    # Main landing page
│   ├── mock.js         # Mock data (services, testimonials, benefits)
│   ├── translations.js # English/French translations
│   ├── App.js          # Main app component
│   ├── App.css         # Global styles and animations
│   └── index.css       # Tailwind directives
├── .env                # Environment variables
├── package.json        # Dependencies
└── tailwind.config.js  # Tailwind configuration
```

## 🎨 Customization

### Update Client Testimonials

Edit `src/mock.js` to update client success stories:

```javascript
export const mockData = {
  portfolio: [
    {
      client: 'Your Client Name',
      industry: 'Industry',
      description: 'Project description',
      solution: 'Solution provided',
      result: 'Key result',
      testimonial: 'Client testimonial',
      author: 'Client Title'
    }
  ]
}
```

### Update Services

Modify the services section in `src/mock.js`:

```javascript
services: [
  {
    icon: 'automation', // or 'formation', 'audit'
    title: 'Your Service Title',
    description: 'Service description'
  }
]
```

### Change Calendar Booking Link

Update the Google Calendar link in `src/translations.js` or directly in the Home component:

```javascript
// Find and replace in Home.jsx
href="https://calendar.app.google/YOUR_CALENDAR_LINK"
```

### Modify Colors

Update brand colors in `src/App.css`:

```css
/* Primary brand colors */
--brand-primary: #0774B6;  /* Darker blue */
--brand-accent: #39ADE3;   /* Lighter blue */
--brand-highlight: #00FFD1; /* Cyan-green */
```

### Add/Remove Translations

Edit `src/translations.js` to modify or add language support:

```javascript
export const translations = {
  en: { /* English translations */ },
  fr: { /* French translations */ }
}
```

## 🏗️ Build for Production

To create an optimized production build:

```bash
yarn build
```

Or with npm:

```bash
npm build
```

This creates a `build` directory with optimized production files ready for deployment.

## 🚀 Deployment

### Option 1: Static Hosting (Netlify, Vercel)

1. Connect your repository to Netlify or Vercel
2. Set build command: `yarn build` or `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Option 2: Traditional Web Hosting

1. Build the project: `yarn build`
2. Upload the contents of the `build` directory to your web server
3. Configure your server to serve `index.html` for all routes

### Environment Variables for Production

If deploying to Netlify/Vercel, set environment variables in their dashboard:

```
REACT_APP_BACKEND_URL=https://yourdomain.com
```

## 🎯 Key Features Explained

### Theme System

The website uses React Context for theme management. Users can toggle between dark and light modes, with preferences saved to localStorage.

```javascript
// Access theme in components
const { theme, toggleTheme } = useTheme();
```

### Language System

Similar to themes, language preferences are managed via Context:

```javascript
// Access language in components
const { language, toggleLanguage } = useLanguage();
const t = translations[language];
```

### Animations

The website features several types of animations:
- **Mesh Gradients**: Slow-moving background gradients
- **Floating Icons**: AI-related icons that float and rotate
- **Geometric Shapes**: Circles, squares, triangles, and hexagons
- **Hover Effects**: Interactive elements with smooth transitions
- **Parallax Grid**: Grid pattern that moves with scroll

All animations are optimized and respect user's motion preferences.

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Option 1: Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
PORT=3001 yarn start
```

### Dependencies Issues

If you encounter dependency issues:

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn cache clean
yarn install
```

### Styling Not Applied

Ensure Tailwind is properly configured:

```bash
# Verify tailwind.config.js exists
# Verify @tailwind directives in index.css
```

## 📝 Notes

- **Backend Not Required**: This is a frontend-only website. The backend directory exists in the project structure but is not needed for operation.
- **Browser Support**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Responsive**: Fully responsive design tested on various devices
- **Performance**: Lighthouse scores 90+ across all metrics

## 📞 Support

For issues or questions:
- Review this documentation
- Check the browser console for errors
- Verify all dependencies are installed correctly
- Ensure Node.js version is compatible (v16+)

## 📄 License

Copyright © 2025 Startandgrowth. All rights reserved.

---

**Built with ❤️ for the future of AI consulting**
