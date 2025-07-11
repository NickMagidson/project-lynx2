import CesiumWrapper from "../Components/CesiumWrapper";
import { getSatellitePositions } from "../services/satelliteService";

export default async function MainPage() {
  // Use 'low' performance mode to render up to 1,000 satellites
  // Options: 'low' (1,000), 'medium' (5,000), 'high' (10,000)
  const satellitePositions = await getSatellitePositions("extreme");

  return <CesiumWrapper satellites={satellitePositions} />;
}
