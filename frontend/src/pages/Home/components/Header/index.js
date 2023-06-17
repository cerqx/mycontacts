import { Link } from "react-router-dom";
import { Header as HeaderContainer } from "./styles";

export default function Header({ hasError, qtdContacts, qtdFilteredContacts }) {
  const alignment = hasError
    ? "flex-end"
    : qtdContacts > 0
    ? "space-between"
    : "center";

  return (
    <HeaderContainer justifyContent={alignment}>
      {!hasError && qtdContacts > 0 && (
        <strong>
          {qtdFilteredContacts}{" "}
          {qtdFilteredContacts === 1 ? "contato" : "contatos"}
        </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </HeaderContainer>
  );
}
