# Doogi 🎈

A platform for sharing children's funny words and phrases - a place to record and share the sweet moments of children's language development

## 📖 About the Project

Doogi is a modern web application that allows parents to record and share the funny words and phrases their children say during language learning stages. This platform is designed to preserve sweet childhood memories and create a community of parents.

### 🎯 Project Goals

- Record and preserve children's funny words
- Share sweet moments with other parents
- Create a personal archive of child's language development
- Strengthen parent-child relationships

### 👥 Target Audience

- Parents with children in language learning ages (2-6 years)
- Families interested in recording childhood memories
- Parent communities who want to share common experiences

## 🚀 Key Features

### 📝 Core Features

- 🎯 **Word Sharing**: Record children's funny words and phrases
- 👶 **Child Profile**: Display child's name and avatar
- 📅 **Date Logging**: Save exact time of each word
- 💬 **Explanations**: Add explanations for each word
- 🏠 **Home Page**: Display latest recorded words

### 🌐 Technical Features

- 🌍 **Bilingual**: Full support for Persian and English
- 🌙 **Multiple Themes**: Light/Dark mode + Kiddo theme
- 📱 **PWA**: Mobile installation capability
- 🎨 **Modern Design**: Beautiful UI with Tailwind CSS and DaisyUI
- ⚡ **Fast & Responsive**: Compatible with all devices
- 🔄 **RTL**: Full right-to-left support for Persian

## 🛠️ Technologies Used

### Frontend

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [DaisyUI 5](https://daisyui.com/) - UI components

### State Management & Forms

- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Database & Backend

- [Prisma](https://www.prisma.io/) - Database ORM
- [SWR](https://swr.vercel.app/) - Data fetching

### UI/UX

- [React Toastify](https://fkhadra.github.io/react-toastify/) - Notifications
- Custom internationalization system
- PWA support with Service Worker

## 🎨 How to Use

### For Parents:

1. **Add New Word**: Use the "Share" menu option
2. **Enter Information**: Input child's name, word/phrase, and explanation
3. **View Words**: See the latest words on the home page
4. **Change Language**: Use the language option in the menu
5. **Change Theme**: Use the theme controller to change appearance

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/doogi.git
   cd doogi
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Update the values in `.env.local` according to your environment

4. Start the development server:
   ```bash
   pnpm dev
   ```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Base URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_PWA=true

# App Settings
NEXT_PUBLIC_APP_VERSION=1.0.0

# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_AUTH_PROVIDER=local

# API Keys
NEXT_PUBLIC_API_KEY=your_actual_api_key_here

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Other Settings
NEXT_PUBLIC_DEFAULT_LANGUAGE=fa
NEXT_PUBLIC_SUPPORTED_LANGUAGES=en,fa
```

## 🚀 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── components/     # React components
├── contexts/       # React contexts
├── lib/           # Utility functions and configurations
├── locales/       # Translation files
├── public/        # Static files
├── styles/        # Global styles
└── utils/         # Helper functions
```

## 🌐 Internationalization

The application supports multiple languages. To add a new language:

1. Add the language code to `NEXT_PUBLIC_SUPPORTED_LANGUAGES` in `.env.local`
2. Create a new translation file in `src/locales/[lang]`
3. Update the language switcher component

## 🎨 Theming

The application uses DaisyUI for theming. To customize the theme:

1. Update the theme configuration in `tailwind.config.js`
2. Modify the theme controller component
3. Add new color schemes in the configuration

## 📱 PWA Support

The application is configured as a Progressive Web App. To customize PWA settings:

1. Update the manifest file in `public/manifest.json`
2. Modify the service worker configuration
3. Add new icons in the `public` directory

## 🔒 Authentication

The authentication system is configurable through environment variables:

- `NEXT_PUBLIC_AUTH_ENABLED` - Enable/disable authentication
- `NEXT_PUBLIC_AUTH_PROVIDER` - Choose authentication provider

## 📊 Analytics

Google Analytics integration is available and can be configured through:

- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable/disable analytics
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [i18next](https://www.i18next.com/)
