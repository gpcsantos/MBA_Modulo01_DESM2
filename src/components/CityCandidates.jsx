import { formaNumber, formaPercent } from "../utils/utils";

// monta o card com os dados de cada candidato que concorreu à eleição da cidade selecionada
export default function CityCandidates({
  // traz os dados da eleição da cidade selecionada
  children: cityCandidates,
  // lista de candidatos para realizar a busca dos candidade que
  // concorreram a eleição na cidade selecionada
  candidates = [],
  //todal de eleitores da cidade, para calculo da porcentagem
  totalVoters = [],
}) {
  return (
    <>
      {
        // map para iterar sobre cada dado da eleição da cidade
        cityCandidates.map((city) => {
          // filtro para busa dos dados do candidado
          const [filteredCandidate] = candidates.filter((candidate) => {
            const { id } = candidate;
            return id === city.candidateId;
          });
          const { name, username } = filteredCandidate; // desconstrução dos dados a serem utilizados
          const { id, votes } = city; // desconstrução dos dados a serem utilizados
          const percent = (votes / totalVoters) * 100; // calculo de porcentagem votos/presentes
          const imgSrc = `/img/${username}.png`; // monta caminha da imagems
          let status = ""; // variável de controle
          let colorText = "";

          if (cityCandidates.indexOf(city) === 0) {
            status = "Eleito";
            colorText = "text-green-600";
          } else {
            status = "Não eleito";
            colorText = "text-red-600";
          }
          return (
            <div key={id} className="w-72 border p-2 m-2">
              <div className="flex flex-row justify-around">
                <div>
                  <img src={imgSrc} alt="" className="rounded-full w-24 h-24" />
                </div>
                <div className="flex flex-col justify-center">
                  <div
                    className={`${colorText} text-center text-xl font-semibold`}
                  >
                    {formaPercent(percent)}%
                  </div>
                  <div className="text-center text-sm">
                    {formaNumber(votes)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mt-6 mb-1">
                <div className="text-xl font-bold mb-3">{name}</div>
                <div className={`${colorText} text-lg font-semibold`}>
                  {status}
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
}
