# Hotel du Théâtre - Croatian Luxury Hotel Website

A beautiful, modern, and responsive hotel booking website built with Next.js 15, TypeScript, and Tailwind CSS. Features a complete multi-language experience (English/Croatian) with booking functionality.

## Features

- 🏨 **Multi-language Support** - English and Croatian
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Modern Design** - Beautiful animations and gradients
- 🛏️ **Room Booking System** - Complete booking flow with multiple steps
- 💼 **Career Portal** - Job application system
- 📞 **Contact Forms** - Multiple contact and inquiry forms
- 🌟 **Static Website** - Fast loading and SEO optimized

## Pages Included

- **Home** - Hero section, features, room previews, amenities, testimonials
- **About** - Hotel story, mission, team, awards
- **Rooms** - Detailed room types with filtering and galleries
- **Booking** - 3-step booking process (room selection, guest details, payment)
- **Careers** - Job listings with application forms
- **Contact** - Contact information, forms, and map

## Room Types

1. **Standard Room** - €150/night
2. **Deluxe Room** - €250/night
3. **Executive Suite** - €450/night
4. **Presidential Suite** - €850/night

## Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Images**: Unsplash (via Next.js Image optimization)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone/Download the project**
   ```bash
   cd hotel-du-theatre
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
hotel-du-theatre/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── booking/           # Booking flow
│   ├── careers/           # Career portal
│   ├── contact/           # Contact page
│   ├── rooms/             # Rooms showcase
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Header navigation
│   └── Footer.tsx         # Footer component
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Multi-language support
├── lib/                   # Utilities
│   └── translations.ts    # Language translations
├── public/               # Static assets
│   └── logo.jpg          # Hotel logo
└── requirements.txt      # Project requirements
```

## Features in Detail

### Multi-Language Support
- Switch between English and Croatian
- All text content translated
- Persistent language selection

### Booking System
- Step 1: Room and date selection
- Step 2: Guest information (includes passport requirement)
- Step 3: Payment details (demo only)
- Booking summary sidebar
- Price calculations with taxes

### Career Portal
- Multiple job positions
- Detailed job descriptions
- Application form with file upload
- Passport number requirement for international hires

### Contact System
- Multiple contact methods
- Subject-based inquiry routing
- Interactive map placeholder
- Emergency contact information

## Hotel Information

- **Name**: Hotel du Théâtre
- **Location**: Matošića ul. 21000, Split, Croatia
- **Phone**: +385 92 451 2500
- **Email**: info@hoteldutheatre.hr

## Customization

### Adding New Languages
1. Extend the `translations` object in `lib/translations.ts`
2. Update the `Language` type in `contexts/LanguageContext.tsx`
3. Add language switcher options

### Modifying Room Types
1. Update room data in pages (rooms/page.tsx, booking/page.tsx)
2. Add new translations in `lib/translations.ts`
3. Update pricing and amenities

### Styling Changes
- Modify colors in `tailwind.config.ts`
- Update animations in `app/globals.css`
- Customize component styles

## Deployment

This is a static Next.js application that can be deployed to any hosting service:

- **Vercel** (recommended)
- **Netlify**
- **cPanel/Shared Hosting**
- **AWS S3 + CloudFront**

For cPanel deployment:
1. Run `npm run build`
2. Upload the `out` folder contents to your public_html directory

## Future Enhancements

When ready to add backend functionality:

- Database integration (MySQL as specified)
- Admin dashboard
- Real payment processing
- Email notifications
- Availability checking
- User authentication

## License

This project is created for Hotel du Théâtre. All rights reserved.

## Support

For technical support or customization requests, please contact the development team.