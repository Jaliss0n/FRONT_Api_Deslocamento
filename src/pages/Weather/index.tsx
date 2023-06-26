import WeatherCard from "@/components/WeatherCard";
import { apiUrl } from "@/data/api";
import styled from "@emotion/styled";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import previsao from '../../../images/cloudy.png'

const BoxBlue = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  align-items: center;
  width: 100%;
`;

interface WeatherDataProp {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function Weather() {
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
        backgroundColor: "#161c5b",
        padding: "1%",
        position: "absolute",
        right: 0,
        height: "100vh",
      }}
    >
      <BoxBlue>
        <img src={previsao.src} width='40%'/>
        <Divider color="white" sx={{width: '100%'}}/>
        {weatherData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </BoxBlue>
    </Box>
  );
}
