import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatReceivedDateString = (
  dateString: string,
  desiredFormat = 'dd MMM yyyy'
): string => {
  return format(new Date(dateString), desiredFormat, { locale: ptBR });
};
