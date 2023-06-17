import magnifierQuestion from "../../../../assets/images/magnifierQuestion.svg";
import { SearchNotFoundContainer } from "./styles";

export default function SearchNotFound({ searchTerm }) {
  return (
    <SearchNotFoundContainer>
      <img src={magnifierQuestion} alt="Contato não encontrado icon" />
      <span>
        Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong>.
      </span>
    </SearchNotFoundContainer>
  );
}
