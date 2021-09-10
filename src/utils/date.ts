import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatReceivedDateString = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMM yyyy', { locale: ptBR });
};
