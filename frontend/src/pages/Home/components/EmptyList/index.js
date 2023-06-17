import { EmptyListContainer } from "./styles";
import emptyBox from "../../../../assets/images/emptyBox.svg";

export default function EmptyList() {
  return (
    <EmptyListContainer>
      <img src={emptyBox} alt="No Contacts" />
      <p>
        Você ainda não tem nenhum contato cadastrado! Clique no botão{" "}
        <strong>"Novo contato"</strong> à cima para cadastrar o seu primeiro!
      </p>
    </EmptyListContainer>
  );
}
