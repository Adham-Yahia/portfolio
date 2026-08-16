# Personal Portfolio Website v2.0

A modern, responsive personal portfolio website built with React, featuring dark mode, multi-language support (Arabic/English), and a Node.js/Express backend.

## 🚀 Features

### Frontend (React)
- ✨ Modern, responsive design with Tailwind CSS
- 🌙 Dark mode with system preference detection
- 🌍 Multi-language support (English & Arabic)
- 🎨 Beautiful gradient effects and smooth animations
- 📱 Mobile-friendly with hamburger menu
- ⚡ Built with Vite for fast development
- 🎯 Smooth scrolling navigation
- 📧 Contact form with validation
- 🔄 RTL support for Arabic

### Backend (Node.js/Express)
- 🔧 Express.js server
- 💾 Message storage (in-memory for demo, ready for MongoDB)
- ✅ Form validation
- 🛡️ CORS enabled
- 📊 Message management endpoints
- 🔍 Admin message viewing

## 📁 Project Structure

```
person/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── i18n/
│   │   ├── config.js
│   │   ├── en.json
│   │   └── ar.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── (static files)
├── server.js
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env
├── .env.example
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory:**
   ```bash
   cd d:\MyWork\person
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Copy environment variables:**
   ```bash
   copy .env.example .env
   ```

4. **Start the backend server (Terminal 1):**
   ```bash
   npm run server
   ```
   Or for development with auto-reload:
   ```bash
   npm run server:dev
   ```

5. **Start the React dev server (Terminal 2):**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📖 Available Scripts

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run server` - Start Express server
- `npm run server:dev` - Start with nodemon (auto-reload)

## 🌍 Internationalization (i18n)

The portfolio supports multiple languages:

- **English** (en) - Default
- **Arabic** (ar) - Full RTL support

### Language Files
- `src/i18n/en.json` - English translations
- `src/i18n/ar.json` - Arabic translations
- `src/i18n/config.js` - i18n configuration

### How to Add More Languages
1. Create a new language file: `src/i18n/[language].json`
2. Add translations following the existing structure
3. Update `src/i18n/config.js` to include the new language
4. Language preferences are saved in localStorage

## 🌙 Dark Mode

Dark mode is automatically implemented with:
- System preference detection
- Manual toggle button in navbar
- Persistent storage in localStorage
- Smooth transitions between themes

### How it Works
- Theme is stored in localStorage (`theme` key)
- System preference is used as fallback
- CSS class `dark` is added to `<html>` element
- Tailwind's `dark:` utilities handle styling

## 🎨 Customization

### Update Personal Information

1. **Open `src/i18n/en.json` and `src/i18n/ar.json`**
2. **Update these sections:**
   - Hero name and title
   - About description
   - Portfolio projects
   - Contact information
   - Footer copyright

### Change Colors

Edit `tailwind.config.js` primary and secondary colors:

```js
colors: {
  primary: {
    500: '#6366f1',  // Change this
    // ...
  },
  secondary: {
    500: '#ec4899',  // And this
    // ...
  }
}
```

### Add More Projects

Edit `src/i18n/en.json` and `src/i18n/ar.json`:

```json
"projects": [
  {
    "id": 1,
    "name": "Project Name",
    "description": "Project description",
    "tags": ["React", "Tailwind"]
  }
]
```

## 📡 API Endpoints

### Contact Form
- **POST** `/api/contact`
  - Body: `{ name, email, message }`
  - Returns: Confirmation with message ID

### Message Management
- **GET** `/api/messages` - Get all messages
- **GET** `/api/messages/:id` - Get specific message
- **PUT** `/api/messages/:id/read` - Mark as read
- **DELETE** `/api/messages/:id` - Delete message
- **GET** `/api/health` - Server health check

## 🗄️ Database Integration

Currently uses in-memory storage. To add MongoDB:

1. **Install Mongoose:**
   ```bash
   npm install mongoose
   ```

2. **Update `server.js`:**
   - Import and connect to MongoDB
   - Create message schema
   - Replace in-memory functions with database queries

3. **Update `.env`:**
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

## 🚀 Deployment

### Deploy Frontend to Vercel

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy with Vercel CLI or connect GitHub repository

### Deploy Backend to Heroku/Railway

1. Create `Procfile`:
   ```
   web: node server.js
   ```

2. Push to Heroku:
   ```bash
   git push heroku main
   ```

## 🐛 Troubleshooting

### Port already in use
```bash
# Windows - Find process on port 3000/5000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS errors
- Ensure backend is running on correct port (5000)
- Check `FRONTEND_URL` in `.env`
- Verify `vite.config.js` proxy configuration

### React not loading
- Clear browser cache
- Restart Vite dev server
- Check console for errors

### Dark mode not working
- Clear localStorage
- Check browser DevTools -> Application -> Storage

### Language not persisting
- Check if localStorage is enabled
- Verify `src/i18n/config.js` configuration

## 📦 Technologies Used

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **react-i18next** - Internationalization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Developer Tools
- **Nodemon** - Auto-reload
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🎯 Performance

- ⚡ Optimized Vite bundle
- 🎨 Tailwind CSS purging
- 📦 Tree-shaking support
- 🖼️ Responsive images
- 🚀 Lazy loading ready

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Considerations

- ✅ Input validation on contact form
- ✅ Email validation
- ✅ CORS protection
- ⚠️ Add authentication for admin endpoints
- ⚠️ Sanitize user inputs before storage
- ⚠️ Use HTTPS in production

## 📚 Future Enhancements

- [ ] MongoDB integration
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Blog section with CMS
- [ ] Project filtering
- [ ] Google Analytics integration
- [ ] CDN integration
- [ ] Advanced animations
- [ ] Performance monitoring

## 📄 License

MIT

## 🤝 Contributing

Feel free to fork, modify, and use for your own portfolio!

## 📞 Support

If you encounter any issues, check the troubleshooting section or review the component files for inline documentation.

---

**Version:** 2.0.0  
**Last Updated:** 2024  
**Built with:** React + Tailwind CSS + Vite + Express.js
