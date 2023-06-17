import toast from "../../utils/toast";
import { useEffect, useState, useMemo, useCallback } from "react";
import ContactsService from "../../services/ContactsService";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts();
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts, refreshPage]);

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);
      toast({
        type: "success",
        text: "O contato foi deletado com sucesso.",
      });

      handleCloseDeleteModal();
      setRefreshPage(!refreshPage);
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao deletar o contato.",
      });
      handleCloseDeleteModal();
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    contactBeingDeleted,
    isDeleteModalVisible,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    contacts,
    setSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    handleDeleteContact,
    searchTerm,
  };
}
