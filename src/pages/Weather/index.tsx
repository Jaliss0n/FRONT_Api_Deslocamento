import WeatherCard from "@/components/WeatherCard";
import { apiUrl } from "@/data/api";
import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const BoxBlue = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface WeatherDataProp {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherDataProp[]>([]);

  async function getWeather() {
    try {
      await axios
        .get(`${apiUrl}/WeatherForecast`)
        .then((data) => setWeatherData(data.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "flex",
        },
        justifyContent: "flex-start",
        alignItems: "center",
        width: "15%",
        backgroundColor: "#3747c0",
        padding: "1%",
        position: "absolute",
        right: 0,
        height: "100vh",
      }}
    >
      <BoxBlue>
        <Typography
          sx={{
            color: "#fff",
            textAlign: 'center'
          }}
          variant="body1"
          color="white"
        >
          Previsão dos próximos <br/> 5 dias
        </Typography>
        <Divider color="white" />
        {weatherData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </BoxBlue>
    </Box>
  );
}
