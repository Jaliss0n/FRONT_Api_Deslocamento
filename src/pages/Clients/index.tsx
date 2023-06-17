import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1173%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1174%26quot%3b)'%3e%3c/rect%3e%3cpath d='M529.8229820617328 150.35455528120946L402.5634866123011 139.22079210335528 391.42972343444694 266.48028755278693 518.6892188838785 277.6140507306411z' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M851.49 465.8 a99.98 99.98 0 1 0 199.96 0 a99.98 99.98 0 1 0 -199.96 0z' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M611.6859783643492 374.2456146488428L574.3799333191398 450.73434211916583 650.868660789463 488.04038716437526 688.1747058346723 411.55165969405215z' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M100.85296825707476 223.35078754567098L189.8239668627824 181.86292954213175 148.33610885924315 92.8919309364241 59.36511025353553 134.37978893996336z' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M963.02 79.49 a170.68 170.68 0 1 0 341.36 0 a170.68 170.68 0 1 0 -341.36 0z' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1166.977%2c272.62C1219.029%2c271.204%2c1274.147%2c258.802%2c1300.326%2c213.79C1326.616%2c168.588%2c1310.859%2c114.091%2c1285.906%2c68.138C1259.424%2c19.368%2c1222.451%2c-33.343%2c1166.977%2c-31.786C1112.886%2c-30.268%2c1086.182%2c27.672%2c1059.077%2c74.506C1031.894%2c121.474%2c994.485%2c173.747%2c1020.441%2c221.404C1046.966%2c270.107%2c1111.54%2c274.128%2c1166.977%2c272.62' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1183.14%2c486.198C1229.652%2c488.094%2c1281.061%2c485.888%2c1307.605%2c447.647C1337.295%2c404.874%2c1336.985%2c347.086%2c1311.033%2c301.947C1285.003%2c256.672%2c1235.218%2c227.253%2c1183.14%2c231.159C1136.142%2c234.684%2c1106.464%2c277.146%2c1084.656%2c318.927C1064.88%2c356.814%2c1053.404%2c401.341%2c1075.088%2c438.17C1096.521%2c474.574%2c1140.93%2c484.478%2c1183.14%2c486.198' fill='rgba(48%2c 82%2c 120%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1173'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='100%25' y1='50%25' x2='0%25' y2='50%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1174'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(55%2c 71%2c 192%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
`;

const CustomBoxCard = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #3747c0;
  border-radius: 12px;
  padding: 1%;
`;

export default function Clients() {
  const schema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
  });
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <CustomBox>
      <CustomBoxCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>Cadastrar Cliente</Typography>
          <Typography>Preencha com os dados do Cliente</Typography>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CustomBoxCard>
    </CustomBox>
  );
}
