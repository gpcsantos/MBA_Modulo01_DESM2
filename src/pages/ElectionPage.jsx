import { useState } from "react";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { useEffect } from "react";

import {
  apiGetCandidates,
  apiGetCities,
  apiGetElection,
} from "../services/apiService";

import Select from "../components/Select";
import CityDataElection from "../components/CityDataElection";
import CityCandidates from "../components/CityCandidates";

export default function ElectionPage() {
  // back-end

  // allCities recebe dados do back-end referente à todas as cidades
  const [allCities, setAllCities] = useState([]);
  // allCandidates recebe dados do back-end referente à lista de candidatos
  const [allCandidates, setAllCandidatess] = useState([]);
  // allElection recebe dados do back-end referentes
  // aos dados da eleição de todoas as cidades
  const [allElection, setAllElection] = useState([]);
  // selectesCity armazena o estado da cidade selecionada
  // é preenchida no UseEffect de inicialização da página
  const [selectedCity, setSelectedCity] = useState([]);
  // cityCandidates armazena o filtro dos candidatos de uma cidade
  // é atualizada por useEffect que monitora as alterações de
  // selectedCity, allElection
  const [cityCantidates, setCityCandidates] = useState([]);

  // busca, prepara os dados do back-em para variáveis de memória
  useEffect(() => {
    async function getAllCities() {
      try {
        const backEndAllCities = await apiGetCities();
        backEndAllCities.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setAllCities(backEndAllCities); // cidades ordenadas por nome
        setSelectedCity(backEndAllCities[0]);
      } catch (error) {
        console.log(error);
      }
    }

    async function getAllCandidates() {
      try {
        const backEndAllCandidates = await apiGetCandidates();
        setAllCandidatess(backEndAllCandidates); // lista de candidatos, sem ordenação
      } catch (error) {
        console.log(error);
      }
    }

    async function getAllElection() {
      try {
        const backEndAllElection = await apiGetElection();
        backEndAllElection.sort((a, b) => {
          return b.votes - a.votes;
        });
        // dados das eleições ordenado por votos, do maior para o menor
        // a ordenação, nesse momento, já resolve o problema de colocar o elito
        // como primeiro quando for realizada a lista dos candidatos que
        // concorreram na cidade selecionada
        setAllElection(backEndAllElection);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCities();
    getAllCandidates();
    getAllElection();
  }, []);

  // executado quando há alteração em selectedCity (quando é alteada uma cidade)
  useEffect(() => {
    const { id } = selectedCity;
    const filteredElection = allElection.filter((election) => {
      return election.cityId === id;
    });
    setCityCandidates(filteredElection);
  }, [selectedCity, allElection]);

  // atualiza o estado da cidade selecionada quando muda a cidade
  function handleSelectChange(cityId) {
    const [changeCity] = allCities.filter((city) => {
      return city.id === cityId;
    });
    setSelectedCity(changeCity);
  }

  return (
    <div>
      <Header>
        <h1>React Election</h1>
      </Header>

      <Main>
        <div className="flex flex-col items-center mb-5">
          <div className="my-3">Escolha o município</div>
          <Select
            selectName="city"
            selectId="city"
            selected="0"
            onSelectChange={handleSelectChange}
          >
            {allCities}
          </Select>
        </div>
        <div className="border pb-5">
          <CityDataElection>{selectedCity}</CityDataElection>
          <div className="flex flex-row flex-wrap justify-evenly">
            <CityCandidates
              candidates={allCandidates}
              totalVoters={selectedCity.presence}
            >
              {cityCantidates}
            </CityCandidates>
          </div>
        </div>
      </Main>
    </div>
  );
}
