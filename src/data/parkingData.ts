export interface ParkingSpot {
  id: string;
  name: string;
  distance: string;
  available: number;
  price: string;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export const mockParkingData: ParkingSpot[] = [
  {
    id: "1",
    name: "Alpha Parking Complex",
    distance: "250m",
    available: 12,
    price: "₹30/hr",
    rating: 4.5,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    features: ["Covered", "24/7", "Security"]
  },
  {
    id: "2", 
    name: "City Center Lot",
    distance: "500m",
    available: 3,
    price: "₹50/hr",
    rating: 4.2,
    coordinates: { lat: 28.6129, lng: 77.2295 },
    features: ["CCTV", "Valet"]
  },
  {
    id: "3",
    name: "Metro Station Parking",
    distance: "750m", 
    available: 25,
    price: "₹20/hr",
    rating: 4.0,
    coordinates: { lat: 28.6149, lng: 77.2088 },
    features: ["Metro Access", "Electric Charging"]
  },
  {
    id: "4",
    name: "Mall Parking Plaza",
    distance: "1.2km",
    available: 8,
    price: "₹40/hr", 
    rating: 4.7,
    coordinates: { lat: 28.6169, lng: 77.2190 },
    features: ["Mall Access", "Food Court", "Covered"]
  },
  {
    id: "5",
    name: "Business District Parking",
    distance: "900m",
    available: 15,
    price: "₹60/hr",
    rating: 4.3,
    coordinates: { lat: 28.6199, lng: 77.2390 },
    features: ["Premium", "Valet", "Car Wash"]
  },
  {
    id: "6",
    name: "Hospital Parking Area",
    distance: "1.5km",
    available: 6,
    price: "₹25/hr",
    rating: 3.8,
    coordinates: { lat: 28.6119, lng: 77.2190 },
    features: ["24/7", "Emergency Access"]
  },
  {
    id: "7",
    name: "University Campus Parking",
    distance: "2.1km",
    available: 30,
    price: "₹15/hr",
    rating: 4.1,
    coordinates: { lat: 28.6249, lng: 77.2290 },
    features: ["Student Discount", "Bicycle Parking"]
  },
  {
    id: "8",
    name: "Airport Express Parking",
    distance: "3.2km",
    available: 45,
    price: "₹80/hr",
    rating: 4.6,
    coordinates: { lat: 28.6349, lng: 77.2490 },
    features: ["Airport Access", "Long Term", "Shuttle"]
  }
]; 