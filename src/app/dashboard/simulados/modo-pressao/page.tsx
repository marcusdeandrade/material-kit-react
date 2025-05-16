'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { QuestaoCard } from '@/components/simulados/questao-card';

// Questões de Direito
const questoesExemplo = [
  {
    enunciado: 'Qual é a principal fonte do Direito no Brasil?',
    alternativas: [
      'A jurisprudência',
      'A lei',
      'O costume',
      'A doutrina'
    ],
    respostaCorreta: '1',
  },
  {
    enunciado: 'O que é habeas corpus?',
    alternativas: [
      'Ação para proteger o direito de propriedade',
      'Ação para garantir a liberdade de locomoção',
      'Ação para anular ato administrativo',
      'Ação para revisar sentença criminal'
    ],
    respostaCorreta: '1',
  },
  {
    enunciado: 'Qual órgão é responsável pelo controle de constitucionalidade no Brasil?',
    alternativas: [
      'O Congresso Nacional',
      'O Supremo Tribunal Federal',
      'O Tribunal de Contas da União',
      'O Ministério Público'
    ],
    respostaCorreta: '1',
  },
  {
    enunciado: 'O que é o princípio da legalidade?',
    alternativas: [
      'Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei',
      'Todos são iguais perante a lei',
      'A lei não prejudicará o direito adquirido',
      'A lei penal não retroagirá'
    ],
    respostaCorreta: '0',
  },
  {
    enunciado: 'O que caracteriza o Estado Democrático de Direito?',
    alternativas: [
      'Supremacia do Executivo',
      'Submissão de todos à Constituição e às leis',
      'Poder absoluto do Judiciário',
      'Ausência de divisão de poderes'
    ],
    respostaCorreta: '1',
  },
  // Adicione mais questões conforme desejar
];

interface ResultadoSimulado {
  totalQuestoes: number;
  acertos: number;
  erros: number;
  naoRespondidas: number;
}

export default function ModoPressaoPage(): React.JSX.Element {
  const [tempoQuestao, setTempoQuestao] = React.useState('30');
  const [numQuestoes, setNumQuestoes] = React.useState('30');
  const [simuladoIniciado, setSimuladoIniciado] = React.useState(false);
  const [questaoAtual, setQuestaoAtual] = React.useState(0);
  const [respostas, setRespostas] = React.useState<(string | null)[]>([]);
  const [resultado, setResultado] = React.useState<ResultadoSimulado | null>(null);

  const handleIniciarSimulado = () => {
    setSimuladoIniciado(true);
    setQuestaoAtual(0);
    setRespostas([]);
    setResultado(null);
  };

  const calcularResultado = () => {
    let acertos = 0;
    let erros = 0;
    let naoRespondidas = 0;

    respostas.forEach((resposta, index) => {
      const questao = questoesExemplo[index % questoesExemplo.length];
      if (resposta === null) {
        naoRespondidas++;
      } else if (resposta === questao.respostaCorreta) {
        acertos++;
      } else {
        erros++;
      }
    });

    return {
      totalQuestoes: Number(numQuestoes),
      acertos,
      erros,
      naoRespondidas,
    };
  };

  const handleTimeout = () => {
    if (questaoAtual < Number(numQuestoes) - 1) {
      setQuestaoAtual(prev => prev + 1);
    } else {
      setSimuladoIniciado(false);
      setResultado(calcularResultado());
    }
  };

  const handleRespostaChange = (resposta: string | null) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = resposta;
    setRespostas(novasRespostas);

    if (resposta !== null) {
      if (questaoAtual < Number(numQuestoes) - 1) {
        setQuestaoAtual(prev => prev + 1);
      } else {
        setSimuladoIniciado(false);
        setResultado(calcularResultado());
      }
    }
  };

  if (resultado) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Resultado do Simulado
        </Typography>
        <Card sx={{ maxWidth: 600, mx: 'auto' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" color="primary">
                Resumo do seu desempenho
              </Typography>
              <Typography>
                Total de questões: {resultado.totalQuestoes}
              </Typography>
              <Typography color="success.main">
                Acertos: {resultado.acertos} ({((resultado.acertos / resultado.totalQuestoes) * 100).toFixed(1)}%)
              </Typography>
              <Typography color="error.main">
                Erros: {resultado.erros} ({((resultado.erros / resultado.totalQuestoes) * 100).toFixed(1)}%)
              </Typography>
              <Typography color="warning.main">
                Não respondidas: {resultado.naoRespondidas} ({((resultado.naoRespondidas / resultado.totalQuestoes) * 100).toFixed(1)}%)
              </Typography>
              <Button
                variant="contained"
                onClick={handleIniciarSimulado}
                sx={{ mt: 2 }}
              >
                Tentar Novamente
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!simuladoIniciado) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Modo Pressão
        </Typography>
        <Card sx={{ maxWidth: 600, mx: 'auto' }}>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h6">
                Configurações
              </Typography>
              <FormControl>
                <FormLabel>Tempo por questão</FormLabel>
                <RadioGroup 
                  value={tempoQuestao} 
                  onChange={(e) => setTempoQuestao(e.target.value)} 
                  name="tempo-questao" 
                  row
                >
                  <FormControlLabel value="15" control={<Radio />} label="15 segundos" />
                  <FormControlLabel value="30" control={<Radio />} label="30 segundos" />
                  <FormControlLabel value="45" control={<Radio />} label="45 segundos" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Número de questões</FormLabel>
                <RadioGroup 
                  value={numQuestoes} 
                  onChange={(e) => setNumQuestoes(e.target.value)} 
                  name="num-questoes" 
                  row
                >
                  <FormControlLabel value="15" control={<Radio />} label="15 questões" />
                  <FormControlLabel value="30" control={<Radio />} label="30 questões" />
                  <FormControlLabel value="45" control={<Radio />} label="45 questões" />
                </RadioGroup>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<TimerIcon />}
                size="large"
                onClick={handleIniciarSimulado}
              >
                Iniciar Simulado
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Questão {questaoAtual + 1} de {numQuestoes}
      </Typography>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <QuestaoCard
          key={questaoAtual}
          questao={questoesExemplo[questaoAtual % questoesExemplo.length]}
          tempoTotal={Number(tempoQuestao)}
          onTimeout={handleTimeout}
          onRespostaChange={handleRespostaChange}
          numeroQuestao={questaoAtual + 1}
          totalQuestoes={Number(numQuestoes)}
          materia="Direito Constitucional"
        />
      </Box>
    </Box>
  );
} 