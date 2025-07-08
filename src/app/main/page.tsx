import CesiumWrapper from "../Components/CesiumWrapper";
import { getSatellitePositions } from "../services/satelliteService";

export default async function MainPage() {
  // Use 'high' performance mode to render up to 10,000 satellites
  // Options: 'low' (1,000), 'medium' (5,000), 'high' (10,000)
  const satellitePositions = await getSatellitePositions("high");

  return <CesiumWrapper satellites={satellitePositions} />;
}
