import { formaNumber } from "../utils/utils";

//monta o cabeçalho de dados referentes aos quantitativos de eleitores da cidade selecionada
export default function CityDataElection({ children: dataCityElection = [] }) {
  const { name, absence, presence, votingPopulation } = dataCityElection;
  return (
    <div>
      <h1 className="text-center my-3 font-bold text-2xl">Eleiçõe de {name}</h1>
      <div className="flex justify-center space-x-5 mb-5">
        <span>
          <strong>Total de eleitores: </strong>
          {formaNumber(votingPopulation)}
        </span>
        <span>
          <strong>Abstenção: </strong>
          {formaNumber(absence)}
        </span>
        <span>
          <strong>Comparecimento: </strong>
          {formaNumber(presence)}
        </span>
      </div>
    </div>
  );
}
