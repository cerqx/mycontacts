import { InputSearchContainer } from "./styles";

export default function InputSearch({ searchTerm, setSearchTerm }) {
  return (
    <InputSearchContainer>
      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}
        type="text"
        placeholder="Pesquise pelo nome..."
      />
    </InputSearchContainer>
  );
}
