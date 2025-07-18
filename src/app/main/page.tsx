import CesiumWrapper from "../Components/CesiumWrapper";
import SatelliteDataWrapper from "../Components/SatelliteDataWrapper";
import { getSatellitePositions } from "../services/satelliteService";

async function SatelliteViewer() {
  // Use 'extreme' performance mode to render up to 50,000 satellites
  // Options: 'low' (1,000), 'medium' (5,000), 'high' (10,000), 'ultra' (20,000), 'extreme' (50,000)
  const satellitePositions = await getSatellitePositions("extreme");

  return <CesiumWrapper satellites={satellitePositions} />;
}

export default function MainPage() {
  return (
    <SatelliteDataWrapper>
      <SatelliteViewer />
    </SatelliteDataWrapper>
  );
}
