import { Container } from "./styles";

import Loader from "../../components/Loader";

import Modal from "../../components/Modal";
import useHome from "./useHome";
import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import EmptyList from "./components/EmptyList";
import SearchNotFound from "./components/SearchNotFound";
import ErrorContainer from "./components/ErrorContainer";
import ListHeader from "./components/ListHeader";
import ContactList from "./components/ContactList";

export default function Home() {
  const {
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
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isEmptyList = contacts.length < 1 && !isLoading && !hasError;
  const isSearchNotFound =
    !hasError && !isLoading && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtdContacts={contacts.length}
        qtdFilteredContacts={filteredContacts.length}
      />

      {isEmptyList && <EmptyList />}

      {hasError && <ErrorContainer handleTryAgain={handleTryAgain} />}

      {isSearchNotFound && <SearchNotFound searchTerm={searchTerm} />}

      {!hasError && (
        <>
          {filteredContacts.length > 0 && <ListHeader />}

          {filteredContacts.length > 0 &&
            filteredContacts.map((contact) => (
              <ContactList
                key={contact.id}
                contact={contact}
                handleDeleteContact={handleDeleteContact}
              />
            ))}
          <Modal
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            visible={isDeleteModalVisible}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            isLoading={isLoadingDelete}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
