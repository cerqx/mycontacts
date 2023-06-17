import isEmailValid from "../../utils/isEmailValid";
import useErrors from "../../hooks/useErrors";
import { useEffect, useState, useImperativeHandle } from "react";
import formatPhone from "../../utils/formatPhone";
import CategoriesService from "../../services/CategoriesService";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  useImperativeHandle(
    ref,
    () => {
      return {
        setFieldsValues: (contact) => {
          setName(contact.name ?? "");
          setEmail(contact.email ?? "");
          setPhone(formatPhone(contact.phone ?? ""));
          setCategoryId(contact.category.id ?? "");
        },

        resetFields: () => {
          setName("");
          setEmail("");
          setPhone("");
          setCategoryId("");
        },
      };
    },
    []
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
        //
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({ name, email, phone, categoryId });

    setIsSubmitting(false);
  }

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: "name", message: "O nome é obrigatório." });
    } else {
      removeError("name");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "O e-mail é inválido!" });
    } else {
      removeError("email");
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  return {
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
  };
}
