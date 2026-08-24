import { useState, useEffect } from 'react';
import { criarRecorrencia, atualizarRecorrencia } from '../services/recorrenciaService';
import type { Recorrencia } from '../types/recorrencia';
import type { TipoRecorrencia } from '../types/enums';

interface RecorrenciaFormProps {
  recorrenciaEditando: Recorrencia | null;
  onSalvar: () => void;
}

function RecorrenciaForm({ recorrenciaEditando, onSalvar }: RecorrenciaFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [quantidadeParcelas, setQuantidadeParcelas] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [tipo, setTipo] = useState<TipoRecorrencia>('Saida');

  useEffect(() => {
    if (recorrenciaEditando) {
      setDescricao(recorrenciaEditando.descricao);
      setValorParcela(String(recorrenciaEditando.valorParcela));
      setQuantidadeParcelas(String(recorrenciaEditando.quantidadeParcelas));
      setDataInicio(recorrenciaEditando.dataInicio);
      setTipo(recorrenciaEditando.tipo);
    } else {
      setDescricao('');
      setValorParcela('');
      setQuantidadeParcelas('');
      setDataInicio('');
      setTipo('Saida');
    }
  }, [recorrenciaEditando]);

  async function handleSubmit() {
    try {
      const request = {
        descricao,
        valorParcela: Number(valorParcela),
        quantidadeParcelas: Number(quantidadeParcelas),
        dataInicio,
        tipo,
      };

      if (recorrenciaEditando) {
        await atualizarRecorrencia(recorrenciaEditando.id, request);
      } else {
        await criarRecorrencia(request);
      }

      setDescricao('');
      setValorParcela('');
      setQuantidadeParcelas('');
      setDataInicio('');
      onSalvar();
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

      <button onClick={handleSubmit}>{recorrenciaEditando ? 'Salvar Edição' : 'Criar Recorrência'}</button>
    </div>
  );
}

export default RecorrenciaForm;