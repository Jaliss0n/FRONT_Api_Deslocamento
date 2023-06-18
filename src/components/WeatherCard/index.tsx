import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";

interface WeatherCardProps {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const CustomCard = styled(Card)`
    background-color: #6b2121;
    width: 100%;
    margin: 5% 0;
`

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temperatureC,
  temperatureF,
  summary,
}) => {
  return (
    <CustomCard variant="outlined" >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Data: {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          Temperatura: {temperatureC}°C / {temperatureF}°F
        </Typography>
        <Typography variant="body1">Sensação: {summary}</Typography>
      </CardContent>
    </CustomCard>
  );
};

export default WeatherCard;
