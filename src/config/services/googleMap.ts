import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getRouteOptimization = async (stops: any[]) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?key=${GOOGLE_MAPS_API_KEY}`,
    { params: { stops } }
  );
  return response.data;
};
