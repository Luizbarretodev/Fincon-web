import { useState } from 'react';
import { criarRecorrencia } from '../services/recorrenciaService';
import type { TipoRecorrencia } from '../types/enums';

interface RecorrenciaFormProps {
  onRecorrenciaCriada: () => void;
}

function RecorrenciaForm({ onRecorrenciaCriada }: RecorrenciaFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [quantidadeParcelas, setQuantidadeParcelas] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [tipo, setTipo] = useState<TipoRecorrencia>('Saida');

  async function handleSubmit() {
    try {
      await criarRecorrencia({
        descricao,
        valorParcela: Number(valorParcela),
        quantidadeParcelas: Number(quantidadeParcelas),
        dataInicio,
        tipo,
      });
      setDescricao('');
      setValorParcela('');
      setQuantidadeParcelas('');
      setDataInicio('');
      onRecorrenciaCriada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input type="number" value={valorParcela} onChange={(e) => setValorParcela(e.target.value)} placeholder="Valor da parcela" />
      <input type="number" value={quantidadeParcelas} onChange={(e) => setQuantidadeParcelas(e.target.value)} placeholder="Quantidade de parcelas" />
      <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />

      <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoRecorrencia)}>
        <option value="Saida">Saída</option>
        <option value="Entrada">Entrada</option>
      </select>

      <button onClick={handleSubmit}>Criar Recorrência</button>
    </div>
  );
}

export default RecorrenciaForm;