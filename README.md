# 🚀 RAM — Personal Portfolio Website

A modern, interactive personal portfolio website built for **RAM**, a BTech CSE (AI & Data Science) student. Designed with a premium dark theme, glassmorphism effects, smooth animations, and full responsiveness.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

- 🌑 **Dark Theme** — Sleek dark background with blue/purple gradient accents
- 🎨 **Glassmorphism Design** — Modern frosted glass card effects
- ✨ **Particle Background** — Interactive animated particle canvas
- ⌨️ **Typewriter Effect** — Dynamic role text animation in hero section
- 📊 **Animated Skill Bars** — Progress bars that animate on scroll
- 🔢 **Counter Animation** — Stats count up when scrolled into view
- 🎭 **Scroll Reveal** — Elements fade in as you scroll
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🍔 **Mobile Hamburger Menu** — Smooth slide-in mobile navigation
- ⬆️ **Back to Top** — Floating button for quick navigation
- 📬 **Contact Form** — Professional contact form with validation
- 🔗 **Smooth Scrolling** — Seamless navigation between sections

---

## 📂 Project Structure

```
portfolio/
├── index.html    # Main HTML structure
├── style.css     # All styles, animations, and responsive design
├── script.js     # Interactive features and animations
└── README.md     # Project documentation
```

---

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in any modern web browser.

### Option 2: Live Server (Recommended for Development)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

---

## 🌐 Deploy on GitHub Pages

### Step-by-Step Instructions

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/portfolio/
   ```

---

## 🛠️ Customization Guide

### 👤 Personal Information
Edit `index.html` and update the following:
- **Name**: Search for `RAM` and replace with your name
- **Tagline**: Update the typewriter phrases in `script.js` (look for the `phrases` array)
- **Description**: Update hero and about section text
- **Links**: Replace placeholder URLs for GitHub, LinkedIn, and email

### 🎨 Colors
Edit `style.css` and modify the CSS variables at the top:
```css
:root {
  --accent-blue: #4f8fff;     /* Primary accent */
  --accent-purple: #8b5cf6;   /* Secondary accent */
  --accent-cyan: #06d6a0;     /* Tertiary accent */
  --bg-primary: #0a0a1a;      /* Main background */
}
```

### 📸 Profile Image
Replace the `.image-placeholder` div in the About section with an `<img>` tag:
```html
<img src="your-photo.jpg" alt="Your Name" class="profile-img">
```

### 📄 Resume
Update the "Download Resume" button's `href` attribute to point to your resume PDF.

### 🏗️ Projects
Add new project cards by copying an existing `.project-card` div and updating the content.

### 🎓 Education
Add more `.timeline-item` entries to include additional education milestones.

---

## 🧰 Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript** | Interactivity, particles, typewriter |
| **Google Fonts** | Inter & JetBrains Mono typography |
| **Font Awesome** | Icons throughout the site |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `> 1024px` | Desktop |
| `768px – 1024px` | Tablet |
| `480px – 768px` | Mobile |
| `< 480px` | Small Mobile |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**RAM** — BTech CSE (AI & Data Science) Student

- 🌐 Portfolio: [Live Site](#)
- 💻 GitHub: [github.com/yourusername](https://github.com/sarvadevarammohan-commits)
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/pradyumna-rammohan-16475b32a/)

---

> ⭐ If you found this portfolio template useful, please consider giving it a star!
