# 🚀 Quick Start Guide

Get your React portfolio running in 5 minutes!

## Prerequisites
- Node.js v16+ installed
- npm or yarn package manager

## 1️⃣ Install Dependencies

```bash
cd d:\MyWork\person
npm install
```

⏱️ This will take 2-3 minutes on first install.

## 2️⃣ Start the Backend Server

Open **Terminal 1** and run:

```bash
npm run server
```

You should see:
```
╔════════════════════════════════════════╗
║   Personal Portfolio Backend Server    ║
╚════════════════════════════════════════╝

✓ Server running on http://localhost:5000
```

## 3️⃣ Start the React Development Server

Open **Terminal 2** and run:

```bash
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:3000/
  ➜  press h + enter to show help
```

## 4️⃣ Open in Browser

Navigate to: **http://localhost:3000**

🎉 Your portfolio is now live!

---

## ✨ Features to Try

### 🌙 Dark Mode
Click the sun/moon icon in the top-right corner of the navbar to toggle dark mode.

### 🌍 Language Switching
Click the "English" / "Arabic" button in the navbar to switch languages.
- **English** - Default LTR layout
- **Arabic** - Full RTL support with Arabic translations

### 📝 Contact Form
Scroll to the "Let's Connect" section and try submitting a message. You'll see:
- Form validation
- Success/error messages
- Messages stored on the backend

### 📱 Responsive Design
- Resize your browser to see responsive behavior
- Try on mobile device (or use DevTools)
- Hamburger menu appears on screens < 768px

### 🎨 Navigation
- Click nav links to smooth scroll to sections
- Active link highlighting based on scroll position
- Sticky navbar that follows as you scroll

---

## 📚 Customization Tips

### Update Your Name
Edit `src/i18n/en.json` and `src/i18n/ar.json`:
```json
"hero": {
  "name": "Your Name Here"
}
```

### Add More Projects
In both language files, add to the projects array:
```json
{
  "id": 4,
  "name": "Your Project Name",
  "description": "Project description here",
  "tags": ["React", "Tailwind", "Node.js"]
}
```

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#YOUR_COLOR_HERE',
  }
}
```

### Update Contact Info
Edit language files in `src/i18n/`:
```json
"contact": {
  "emailValue": "your-email@example.com",
  "phoneValue": "+1 (555) 123-4567",
  "locationValue": "Your City, Country"
}
```

---

## 🔨 Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start React dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server` | Start backend server |
| `npm run server:dev` | Start backend with auto-reload |

---

## 🛠️ Project Structure

```
person/
├── src/
│   ├── components/      # React components
│   ├── context/         # Theme context
│   ├── i18n/           # Translations (English & Arabic)
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind CSS
├── public/             # Static files
├── server.js           # Express backend
├── package.json        # Dependencies
└── README.md           # Full documentation
```

---

## 🐛 Troubleshooting

### Port 3000 is already in use
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### Port 5000 is already in use (Backend)
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure backend is running on `http://localhost:5000`
- Backend starts BEFORE frontend
- Check `.env` file has correct settings

### Module not found errors
```bash
# Clear node_modules and reinstall
rmdir /s /q node_modules
npm install
```

### Dark mode not working
- Clear browser localStorage: Open DevTools → Application → Storage → Clear All
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## 📦 Building for Production

```bash
# Build the React app
npm run build

# This creates a 'dist' folder with optimized files
# Deploy the 'dist' folder to your hosting service
```

---

## 🌐 Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🚀 Deploy to Heroku (Backend)

1. Create `Procfile`:
```
web: node server.js
```

2. Push to Heroku:
```bash
git push heroku main
```

---

## 📞 Need Help?

1. Check the main `README.md` for detailed documentation
2. Review component files - they have comments
3. Check browser console for error messages
4. Ensure both backend AND frontend are running

---

## ✅ What's Included

- ✨ Modern React components
- 🌙 Dark mode with persistence
- 🌍 Multi-language support (EN/AR)
- 📱 Fully responsive design
- 🎨 Beautiful Tailwind CSS styling
- ⚡ Fast Vite build tool
- 🔧 Express backend with API
- 📧 Contact form functionality
- 🚀 Production-ready setup

---

## 🎯 Next Steps

1. **Customize content** - Update your name, skills, projects
2. **Add your photos** - Replace placeholder images
3. **Connect social links** - Update footer social URLs
4. **Setup email notifications** - Configure SMTP in backend
5. **Deploy** - Follow deployment guides above

---

Enjoy! 🎉 Your portfolio is ready to showcase your work!
