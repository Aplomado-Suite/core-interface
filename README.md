# Aplomado Core Shell

The master graphical layout for the central hub, along with authentication and other features.

## Features

- 3D WebGL visuals with React Three Fiber
- Professional UI with Framer Motion animations
- API key authentication system
- Local-first data storage
- Zero telemetry and privacy-first design
- Responsive design with mobile support

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Environment Variables

See `.env.example` for required environment variables including:
- API_KEY for authentication
- AUTH_ENCRYPTION_KEY for session security

## Tech Stack

- Next.js 14
- React 18
- React Three Fiber (3D graphics)
- Framer Motion (animations)
- Tailwind CSS (styling)
- TypeScript

## License

CUSTOM
