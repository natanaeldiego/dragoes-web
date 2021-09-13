
export const CustomStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff'
  },
};

export const DateFormat = (date: string) => {
  const dateFormat = new Date(date);
  const dateCreated = new Intl.DateTimeFormat('pt-BR').format(dateFormat);
  return dateCreated;
}