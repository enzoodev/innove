export const formatLocationAddressLabel = (address?: TLocationAddress) => {
  if (!address) {
    return null;
  }

  const { rua, numero, complemento, cep, bairro, cidade, estado } = address;

  let formattedAddress = `${rua}, ${numero}`;
  if (complemento) {
    formattedAddress += `, ${complemento}`;
  }
  formattedAddress += ` - ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;

  return formattedAddress;
};
