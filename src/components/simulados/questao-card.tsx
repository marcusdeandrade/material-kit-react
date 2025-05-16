import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

interface QuestaoCardProps {
  questao: {
    enunciado: string;
    alternativas: string[];
  };
  tempoTotal: number; // em segundos
  onTimeout: () => void;
  onRespostaChange: (resposta: string | null) => void;
  numeroQuestao: number; // índice da questão atual (1-based)
  totalQuestoes: number;
  materia: string;
}

export function QuestaoCard({ questao, tempoTotal, onTimeout, onRespostaChange, numeroQuestao, totalQuestoes, materia }: QuestaoCardProps): React.JSX.Element {
  const [tempoRestante, setTempoRestante] = React.useState(tempoTotal);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRespostaChange(null); // Marca como não respondida
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout, onRespostaChange]);

  const progresso = (tempoRestante / tempoTotal) * 100;
  
  const getCorProgresso = () => {
    if (progresso > 66) return 'success';
    if (progresso > 33) return 'warning';
    return 'error';
  };

  const handleRespostaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resposta = event.target.value;
    onRespostaChange(resposta);
  };

  return (
    <Card>
      {/* Header */}
      <Box sx={{ px: 3, pt: 2, pb: 1, borderBottom: '1px solid #eee', background: 'rgba(32,101,209,0.07)' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: 20, md: 28 } }}>
          Questão {numeroQuestao} de {totalQuestoes}
        </Typography>
      </Box>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progresso} 
            color={getCorProgresso()}
            sx={{ height: 8, borderRadius: 1 }}
          />
          <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
            {tempoRestante} segundos restantes
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {questao.enunciado}
        </Typography>
        <FormControl>
          <RadioGroup onChange={handleRespostaChange}>
            {questao.alternativas.map((alternativa, index) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                control={<Radio />}
                label={alternativa}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      {/* Footer */}
      <Box sx={{ px: 3, pb: 2, pt: 1, borderTop: '1px solid #eee', background: 'rgba(32,101,209,0.04)' }}>
        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 500 }}>
          Matéria: {materia}
        </Typography>
      </Box>
    </Card>
  );
} 