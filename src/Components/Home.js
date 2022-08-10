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

function Home() {
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
    <Cima>
        <h2>Buscar</h2>
        <p>Insira o número do processo</p>
      <Topo>
        <input
          onChange={(event) => setCnj(event.target.value)}
          placeholder="Número do processo"
          type="text"
          value={cnj}
        />
        <button onClick={atualizarCnj}>Buscar</button>
      </Topo>
    </Cima>
  );
}

const Cima = styled.div`
    display: block;
    height: 200px;
    background: #d3d3d3;
    border: solid #a9a9a9 0;
    border-bottom-width: 1px;
    h2{
        font-family: "Roboto";
        font-style: normal;
        font-size: 28px;
        color: black;
        padding-left: 420px;
        padding-top: 40px;
    }
    p{
        font-family: "Roboto";
        font-style: normal;
        font-size: 16px;
        color: black;
        padding-left: 420px;
    }`
const Topo = styled.div`
  padding-top: 10px;
  padding-left: 20px;
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


export default Home;
