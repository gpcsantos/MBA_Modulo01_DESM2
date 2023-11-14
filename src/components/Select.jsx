// componete para caixa de combinação da lista de cidades
export default function Select({
  children: allCities = {},
  selectName = "name_select",
  selectId = "id_Select",
  onSelectChange = null,
}) {
  function handleSelectChange({ currentTarget }) {
    if (onSelectChange) {
      const cityId = currentTarget.value;
      onSelectChange(cityId);
    }
  }
  return (
    <select name={selectName} id={selectId} onChange={handleSelectChange}>
      {allCities.map((city) => {
        const { id, name } = city;
        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
}
