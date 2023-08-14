const checkEmailAddressValidation = (emailStr: string) => {
  const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

  if (regExp.test(emailStr)) {
    return true;
  }

  return false;
};

export default checkEmailAddressValidation;
