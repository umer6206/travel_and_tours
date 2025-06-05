# Gilgit-Baltistan Tourism Website

A modern tourism website showcasing the beauty and attractions of Gilgit-Baltistan, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design optimized for all devices
- Dynamic content management for destinations, offers, and gallery
- Interactive gallery with filtering and search capabilities
- Booking system with secure payment integration
- Admin panel for content management
- SEO optimized for better visibility
- Fast loading with optimized images and videos

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Image/Video Storage**: Cloudinary
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- MongoDB database
- Cloudinary account
- Stripe account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri_here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gb-tours.git
   cd gb-tours
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # App Router pages
├── components/          # Reusable components
├── lib/                 # Utility functions and configurations
├── models/             # MongoDB models
├── public/             # Static assets
└── styles/             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Images and content are for demonstration purposes only
- Special thanks to the Gilgit-Baltistan Tourism Department for inspiration
