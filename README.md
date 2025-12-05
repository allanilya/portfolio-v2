# Allan Ilyasov - Portfolio Website V1

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Clean, modern design with dark mode support
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Built with Next.js 14 and TypeScript
- 💅 Styled with Tailwind CSS
- 🎯 Interactive project carousel with expandable details
- 🌙 Dark mode toggle with localStorage persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Add your profile photo:
   - Replace `/public/profile.jpg` with your actual photo

4. Update projects:
   - Edit `/lib/projects.ts` to add your GitHub projects

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view your portfolio

## Customization

### Adding Projects

Edit `/lib/projects.ts` and add your projects following this format:

```typescript
{
  id: 2,
  title: "Project Name",
  description: "Project description",
  techStack: ["React", "Node.js", "MongoDB"],
  githubUrl: "https://github.com/yourusername/project",
  liveUrl: "https://yourproject.com" // optional
}
```

### Updating About Section

Edit `/components/About.tsx` to customize your bio.

### Modifying Skills

Edit `/components/Skills.tsx` to update your technical skills.

## Deploy on Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy
5. Your site will be live at `https://your-project.vercel.app`

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the DNS configuration steps

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## License

MIT
