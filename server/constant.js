const USER_ROLE = Object.freeze({
  ADMIN: 'admin',
  USER: 'user'
})

const CITIES = Object.freeze({
  "New York, USA": [40.7128, -74.0060],
  "Tokyo, Japan": [35.6895, 139.6917],
  "London, UK": [51.5074, -0.1278],
  "Paris, France": [48.8566, 2.3522],
  "Sydney, Australia": [-33.8688, 151.2093],
  "Cairo, Egypt": [30.0444, 31.2357],
  "Beijing, China": [39.9042, 116.4074],
  "Rio de Janeiro, Brazil": [-22.9068, -43.1729],
  "Moscow, Russia": [55.7558, 37.6173],
  "Toronto, Canada": [43.6511, -79.3470],
  "Mumbai, India": [19.0760, 72.8777],
  "Dubai, UAE": [25.2048, 55.2708],
  "Bangkok, Thailand": [13.7563, 100.5018],
  "Buenos Aires, Argentina": [-34.6037, -58.3816],
  "Berlin, Germany": [52.5200, 13.4050],
  "Cape Town, South Africa": [-33.9249, 18.4241],
  "Mexico City, Mexico": [19.4326, -99.1332],
  "Istanbul, Turkey": [41.0082, 28.9784],
  "Rome, Italy": [41.9028, 12.4964],
  "Seoul, South Korea": [37.5665, 126.9780],
  "Tallinn, Estonia": [59.4370, 24.7535]
});

module.exports = {
  USER_ROLE,
  CITIES
}