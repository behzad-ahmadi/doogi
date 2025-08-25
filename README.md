# Doogi - Your AI Companion

A modern web application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🌐 Internationalization (i18n) support
- 🌙 Dark/Light mode
- 📱 Progressive Web App (PWA)
- 🔒 Authentication system
- 📊 Analytics integration
- 🎨 Modern UI with Tailwind CSS
- 🔍 SEO optimized
- 🚀 Fast and responsive

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [DaisyUI](https://daisyui.com/) - UI components
- [i18next](https://www.i18next.com/) - Internationalization
- [next-i18next](https://github.com/i18next/next-i18next) - Next.js i18n integration

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
├── pages/         # Next.js pages
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
