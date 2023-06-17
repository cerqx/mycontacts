import { Form, ButtonContainer } from "./styles";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import { forwardRef } from "react";
import Button from "../Button";
import useContactForm from "./useContactForm";

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    handleNameChange,
    name,
    isSubmitting,
    handleEmailChange,
    email,
    handlePhoneChange,
    phone,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  } = useContactForm(onSubmit, ref);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input
            error={getErrorMessageByFieldName("name")}
            placeholder="Nome*"
            onChange={handleNameChange}
            value={name}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName("email")} noValidate>
          <Input
            type="email"
            error={getErrorMessageByFieldName("email")}
            placeholder="E-mail"
            onChange={handleEmailChange}
            value={email}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Telefone"
            onChange={handlePhoneChange}
            value={phone}
            maxLength="15"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup isLoading={isLoadingCategories}>
          <Select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={isLoadingCategories || isSubmitting}
          >
            <option value="">Sem categoria</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isSubmitting}
          >
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
});

export default ContactForm;
