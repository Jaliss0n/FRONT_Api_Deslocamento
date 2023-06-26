import styled from "@emotion/styled";
import EventIcon from "@mui/icons-material/Event";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Card, CardContent, Typography } from "@mui/material";

interface WeatherCardProps {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const CustomCard = styled(Card)`
  background-color: #2ca4ac;
  width: 100%;
  margin: 2% 0;
`;

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temperatureC,
  temperatureF,
  summary,
}) => {
  return (
    <CustomCard variant="outlined">
      <CardContent>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="white"
          variant="body1"
          gutterBottom
        >
          <EventIcon sx={{ marginRight: "3%" }} />{" "}
          {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="white"
          variant="body1"
        >
          <ThermostatIcon sx={{ marginRight: "3%" }} /> {temperatureC}°C /{" "}
          {temperatureF}°F
        </Typography>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="white"
          variant="body1"
        >
          <SentimentSatisfiedAltIcon sx={{ marginRight: "3%" }} /> {summary}
        </Typography>
      </CardContent>
    </CustomCard>
  );
};

export default WeatherCard;
