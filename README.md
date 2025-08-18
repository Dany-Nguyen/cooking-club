# Daniel Nguyen - Personal Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with gradient backgrounds
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Fast Performance**: Built with Next.js 15 and optimized for speed
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Custom emoji icons

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout with Navigation
│   └── page.tsx             # Main homepage with all sections
└── components/
    └── Navigation.tsx       # Fixed navigation header component
```

## 🎨 Sections

- **Hero**: Introduction with animated profile and call-to-action buttons
- **About**: Skills showcase with Development, Learning, and Experience cards
- **Projects**: Portfolio showcase with project cards (customizable)
- **Contact**: Contact section with email call-to-action

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Customization

### Personal Information
Edit the following in `src/app/page.tsx`:
- Name and tagline in the hero section
- About section descriptions
- Project information
- Contact email address

### Styling
- Modify colors and design in `src/app/globals.css`
- Update Tailwind configuration in `tailwind.config.js`
- Customize animations in component files

### Projects
Replace the placeholder projects in the Projects section with your actual work:
- Add project images
- Update project descriptions
- Include live demo and GitHub links

## 📱 Browser Support

This website works on all modern browsers and is fully responsive across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with each push

### Other Platforms
- **Netlify**: Drag and drop the `out` folder after running `npm run build`
- **GitHub Pages**: Use `next export` for static deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Daniel Nguyen
