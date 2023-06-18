import Clients from "@/pages/Clients";
import { Weather } from "@/pages/Weather";

export default function switchScreen (n: number) {
    switch (n) {
        case 0:
            return <Clients/>;
        case 4: 
            return <Weather/>;
    }
}