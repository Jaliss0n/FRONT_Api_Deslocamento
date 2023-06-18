import WeatherCard from "@/components/WeatherCard";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const BoxBlue = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
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
        justifyContent: "flex-start",
        alignItems: "center",
        height: "93.3vh",
        width: '20%',
        backgroundColor: '#4470c7',
        padding: "1%",
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
