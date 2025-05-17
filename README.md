# Google Analytics Dashboard (Next.js)

A modern, responsive dashboard for visualizing Google Analytics data using Next.js 15 and Google Analytics Data API.

![project-preview](https://github.com/user-attachments/assets/3a32be96-8275-4532-a520-cef883d4b3e9)

## Features

- Real-time user tracking with location data on a Google Map
- Historical analytics data visualization with charts
- Responsive design with light/dark mode
- Multiple time range options (7, 30, 90 days)
- Device and country breakdowns

## Tech Stack

- **Framework**: Next.js 15.3.2 (App Router)
- **UI**: Tailwind CSS 4, shadcn/ui components
- **Charts**: Recharts 2.15
- **Maps**: Google Maps API (@react-google-maps/api)
- **Analytics**: Google Analytics Data API (googleapis)
- **Styling**: Tailwind CSS with tw-animate-css
- **Fonts**: Geist Sans and Geist Mono
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+
- Google Analytics 4 property
- Google Analytics service account with appropriate permissions
- Google Maps API key

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/username/xlytics.git
   cd xlytics
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a `.env.local` file based on `.env.template`:

   ```bash
   cp .env.template .env.local
   ```

4. Add your Google Analytics service account key file to the project root

5. Update the `.env.local` file with your credentials:

   - `NEXT_PUBLIC_GA_PROPERTY_ID`: Your Google Analytics 4 property ID
   - `GA_KEY_FILE`: Filename of your Google Analytics service account key
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
   - `NEXT_PUBLIC_ANALYTICS_URL`: URL to your Google Analytics dashboard

6. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

| Variable                          | Description                                      | Required |
| --------------------------------- | ------------------------------------------------ | -------- |
| `NEXT_PUBLIC_GA_PROPERTY_ID`      | Google Analytics 4 property ID                   | Yes      |
| `GA_KEY_FILE`                     | Filename of Google Analytics service account key | Yes      |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key                              | Yes      |
| `NEXT_PUBLIC_ANALYTICS_URL`       | URL to Google Analytics dashboard                | No       |

## License

MIT
