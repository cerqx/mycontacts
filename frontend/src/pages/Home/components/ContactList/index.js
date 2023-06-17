import { Link } from "react-router-dom";
import { Card } from "./styles";

import edit from "../../../../assets/images/icons/edit.svg";
import trash from "../../../../assets/images/icons/trash.svg";

export default function ContactList({ contact, handleDeleteContact }) {
  return (
    <>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>{contact?.name}</strong>
            {contact.category.name && <small>{contact?.category.name}</small>}
          </div>
          <span>{contact?.email}</span>
          <span>{contact?.phone}</span>
        </div>

        <div className="actions">
          <Link to={`/edit/${contact.id}`}>
            <img src={edit} alt="Botão de edição de contato" />
          </Link>

          <button type="button" onClick={() => handleDeleteContact(contact)}>
            <img src={trash} alt="Botão de excluir contato" />
          </button>
        </div>
      </Card>
    </>
  );
}
