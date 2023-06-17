import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function useEditContact() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");
  const contactFormRef = useRef(null);
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push("/");
          toast({
            type: "danger",
            text: "Ocorreu um erro ao carregar este contato.",
          });
        });
      }
    }
    loadContact();
  }, [id, history, contactName, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);
      setContactName(contactData.name);

      toast({
        type: "success",
        text: "O contato foi editado com sucesso.",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao editar o contato.",
      });
    }
  }

  return { isLoading, contactName, handleSubmit, contactFormRef };
}
