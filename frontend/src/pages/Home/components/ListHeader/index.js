import arrow from "../../../../assets/images/icons/arrow.svg";
import { ListHeader as List } from "./styles";

export default function ListHeader() {
  return (
    <List>
      <button type="button">
        <span>Nome</span>
        <img src={arrow} alt="Botão de ordenação dos contatos" />
      </button>
    </List>
  );
}
