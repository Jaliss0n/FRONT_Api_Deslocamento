import WeatherCard from "@/components/WeatherCard";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const BoxBlue = styled(Box)`
  display: flex;
  background-color: aliceblue;
  border-radius: 12px;
  width: 90%;
  height: 90vh;
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
        .get("https://api-deslocamento.herokuapp.com/api/v1/WeatherForecast")
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: '#4470c7'
      }}
    >
      <BoxBlue>
        {weatherData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </BoxBlue>
    </Box>
  );
}
