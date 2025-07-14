# 🚗 SmartPark - Modern Parking Spot Finder

SmartPark is a modern React + Vite application that helps users find nearby parking spots in urban areas. Built with TypeScript, TailwindCSS, and modern Web APIs for an exceptional user experience.

![SmartPark Preview](https://via.placeholder.com/800x400?text=SmartPark+App+Preview)

## ✨ Features

### 🌐 Modern Web APIs Integration
- **🧭 Geolocation API** - Real-time location tracking with high accuracy
- **👁️ Intersection Observer API** - Lazy loading of parking cards for performance
- **📡 Network Information API** - Automatic detection of slow connections with fallback UI
- **⚡ Background Tasks API** (Optional) - Continue fetching data when tab is inactive

### 🎨 User Interface
- **Modern Design** - Clean, responsive UI with Shadcn/UI components
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Mobile-First** - Fully responsive design for all devices
- **Dark Mode Ready** - Built-in support for light/dark themes

### 🚀 Core Functionality
- **Live Location Detection** - Automatically detect and track user location
- **Smart Parking Search** - Find parking spots based on distance, price, and availability
- **Interactive Map View** - Visual representation with spot markers and user location
- **Advanced Filtering** - Search by name, features, availability, and sorting options
- **Real-time Updates** - Live availability and pricing information
- **Navigation Integration** - Direct integration with Google Maps for directions

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Latest React with hooks and functional components
- **TypeScript** - Full type safety and developer experience
- **Vite** - Lightning-fast build tool and dev server

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality, accessible component library
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful, customizable icons

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing and optimization
- **Path Aliases** - Clean imports with @ alias

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartpark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📱 How to Use

### 1. Location Permission
- Allow location access when prompted for best experience
- Your current location will be displayed on the map with a blue marker

### 2. Find Parking Spots
- **List View**: Browse parking spots in a grid layout with detailed information
- **Map View**: Visual representation with interactive markers
- **Search**: Use the search bar to find specific parking locations or features
- **Filter**: Toggle "Only available spots" and sort by distance, price, availability, or rating

### 3. Navigate to Parking
- Click "Navigate" on any parking card to open directions in Google Maps
- Select spots on the map to view detailed information in the sidebar

### 4. Network Awareness
- The app automatically detects slow connections
- Displays appropriate warnings and optimizes performance accordingly

## 🔧 Configuration

### Environment Setup
The application uses sensible defaults but can be customized:

```typescript
// src/hooks/useGeolocation.ts - Geolocation settings
const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000, // 5 minutes
};

// src/hooks/useNetworkStatus.ts - Network detection thresholds
const isSlowConnection = downlink < 1.5 || effectiveType.includes('2g');
```

### Adding More Parking Data
Update the mock data in `src/data/parkingData.ts`:

```typescript
export const mockParkingData: ParkingSpot[] = [
  {
    id: "new-spot",
    name: "Your Parking Spot",
    distance: "100m",
    available: 15,
    price: "₹25/hr",
    rating: 4.8,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    features: ["Covered", "24/7", "Security"]
  },
  // ... more spots
];
```

## 🌟 Key Components

### LocationTracker
Handles geolocation detection and displays current location status.

### ParkingCard
Lazy-loaded cards showing parking spot details with Intersection Observer.

### NetworkStatusBanner
Displays connection warnings using Network Information API.

### MapView
Interactive map with user location and parking spot markers.

### ParkingList
Searchable and filterable list of available parking spots.

## 🔍 Web APIs Used

### Geolocation API
```typescript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // Handle location update
  },
  (error) => {
    // Handle error
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  }
);
```

### Intersection Observer API
```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      // Load parking card content
    }
  },
  {
    threshold: 0.1,
    rootMargin: '50px'
  }
);
```

### Network Information API
```typescript
const connection = navigator.connection;
if (connection.downlink < 1.5 || connection.effectiveType.includes('2g')) {
  // Show slow connection warning
}
```

## 🎯 Performance Features

- **Lazy Loading** - Parking cards load only when visible
- **Network Adaptation** - Responds to connection quality
- **Code Splitting** - Optimized bundle sizes
- **Image Optimization** - Efficient asset loading
- **Smooth Animations** - 60fps animations with Framer Motion

## 📦 Project Structure

```
smartpark/
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Shadcn/UI components
│   │   ├── LocationTracker.tsx
│   │   ├── NetworkStatusBanner.tsx
│   │   ├── ParkingCard.tsx
│   │   ├── ParkingList.tsx
│   │   └── MapView.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useGeolocation.ts
│   │   ├── useNetworkStatus.ts
│   │   └── useIntersectionObserver.ts
│   ├── data/              # Mock data and types
│   │   └── parkingData.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── tailwind.config.js     # TailwindCSS configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [Framer Motion](https://www.framer.com/motion/) for animations
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Built with ❤️ using React, Vite, TailwindCSS, and modern Web APIs**
