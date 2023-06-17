import Button from "../../../../components/Button";
import sad from "../../../../assets/images/sad.svg";
import { ErrorContainer as Error } from "./styles";
export default function ErrorContainer({ handleTryAgain }) {
  return (
    <Error>
      <img src={sad} alt="Bad request icon" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={handleTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Error>
  );
}
