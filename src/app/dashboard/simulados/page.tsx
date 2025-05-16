import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import Link from 'next/link';
import { paths } from '@/paths';

export default function SimuladosPage(): React.JSX.Element {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Simulados
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/assets/modo-pressao.jpg"
              alt="Modo Pressão"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Modo Pressão
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Teste seus conhecimentos contra o tempo! Responda questões com limite de tempo 
                e veja como se sai sob pressão.
              </Typography>
              <Button
                component={Link}
                href={paths.dashboard.simulados.modoPressao}
                variant="contained"
                startIcon={<TimerIcon />}
                fullWidth
              >
                Iniciar Modo Pressão
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 