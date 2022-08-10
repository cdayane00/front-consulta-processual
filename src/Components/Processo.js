
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useState } from "react";

const fetchProcessos = async (cnj) => {
  const res = await fetch(`https://consulta-processual.herokuapp.com/${cnj}`);
  if (res.status === 404) {
    throw new Error("Processo não encontrado");
  }
  console.log(res);
  return res.json();
};

function Processo() {
  const navigate = useNavigate();
  const { cnjInput } = useParams();
  const [cnj, setCnj] = useState(cnjInput);
  const { data, isLoading, error } = useQuery(
    ["request-cnj", cnjInput],
    () => fetchProcessos(cnjInput),
    { retry: 0 }
  );
  console.log({ data, isLoading, error, cnjInput });

  const atualizarCnj = () => {
    navigate(`/${cnj}`);
  };

  return (
    <>
      <Topo>
        <input
          onChange={(event) => setCnj(event.target.value)}
          placeholder="Número do processo"
          type="text"
          value={cnj}
        />
        <button onClick={atualizarCnj}>Buscar</button>
      </Topo>
      {error && <p className="msg-aux">{error.message}</p>}
      {isLoading && <p className="msg-aux">Carregando...</p>}
      {data && (
        <Processoo>
          <Titulo>
            <h1> Processo n. {data.cnj} do {data.tribunal_origem}</h1>
            <p>Distribuído em {data.data_inicio}</p>
          </Titulo>

          <Principal>
            <Movimentacoes>
              <h2>Movimentações</h2>
              <Descricao>
                {data.movimentacoes.map((movimentacao, i) => (
                  <div key={i}>
                    <p>{movimentacao.data}</p>
                    <h3>{movimentacao.descricao}</h3>
                  </div>
                ))}
              </Descricao>
            </Movimentacoes>
            <NavBar>
              <Cima>
                <h4>Detalhes do processo</h4>
                {
                  data.detalhes_processo.map((detalhes, i) => (
                    <div key={i}>
                      <p>{detalhes.descricao}</p>
                    </div>
                  ))
                }
              </Cima>

              <h4>Partes envolvidas</h4>
              {
                data.partes_envolvidas.map((partes, i) => (
                  <div key={i}>
                    <h6>{partes.nome}</h6>
                    <p>{partes.parte_envolvida}</p>
                  </div>
                ))
              }
            </NavBar>
          </Principal>
        </Processoo>
      )}
    </>
  );
}


const Topo = styled.div`
  border: solid #a9a9a9 0;
  border-bottom-width: 1px;
  padding-top: 7px;
  padding-left: 20px;
  height: 60px;
  background: #d3d3d3;
  display: flex;

  input {
    height: 39px;
    width: 400px;
    margin-top: 3px;
    padding-left: 20px;
    margin-left: 400px;
    font-family: "Roboto";
    font-style: normal;
    font-size: 14px;
  }
  button {
    width: 95px;
    height: 40px;
    margin-left: 18px;
    margin-top: 2px;
    font-family: "Roboto";
    font-style: normal;
    font-size: 20px;
    line-height: 16px;
    color: white;
    background: #1c1c1c;
    border: none;
  }
`;

const Processoo = styled.div`
  margin-top: 10px;
  margin-left: 50px;
  p {
    margin-bottom: 10px;
    font-family: "Roboto";
    font-style: normal;
    font-size: 14px;
    line-height: 18px;
    color: gray;
  }
`;

const Titulo = styled.div`
  margin-top: 40px;
  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-size: 35px;
    line-height: 28px;
    color: black;
    margin-bottom: 10px;
  }
`;
const NavBar = styled.div`
  margin-left: 100px;
  width: 200px;
  margin-top: 40px;
  h4 {
    margin-bottom: 15px;
    font-family: "Roboto";
    font-style: normal;
    font-size: 16px;
    color: black;
  }
  h6 {
    font-family: "Roboto";
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
    color: blue;
  }
`;
const Cima = styled.div`
  border: solid #dcdcdc 0;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;
const Movimentacoes = styled.div`
  margin-top: 30px;
  width: 750px;
  border: solid #a9a9a9 1px;
  margin-bottom: 70px;
  h2 {
    border: solid #a9a9a9 0;
    border-bottom-width: 1px;
    padding-top: 7px;
    padding-left: 20px;
    height: 45px;
    background: #d3d3d3;
    font-family: "Roboto";
    font-style: normal;
    font-size: 20px;
    line-height: 28px;
    color: black;
  }
`;
const Descricao = styled.div`
  h3 {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;

    border: solid #dcdcdc 0;
    border-bottom-width: 1px;

    font-family: "Roboto";
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    color: black;
  }

  p {
    font-size: 14px;
    padding-top: 20px;
    padding-left: 20px;
  }
`;
const Principal = styled.div`
  display: flex;
`;

export default Processo;