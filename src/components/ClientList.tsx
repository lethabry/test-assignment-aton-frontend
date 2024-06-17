import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClientListItem from './ClientItem';
import { getClients } from '../utils/api';

type TypeClients = {
  _id: string;
  accountNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  inn: string;
  responcibleWorker: string;
  status: string;
};

export default function ClientList() {
  const location = useLocation();

  const [clients, setClients] = useState<TypeClients[]>([]);

  useEffect(() => {
    if (location.pathname === '/clients')
      getClients()
        .then((clients) => {
          setClients(clients);
        })
        .catch((err) => console.log(err));
  }, [location.pathname]);

  return (
    <section className="client-list">
      <h2 className="client-list__title">Список клиентов</h2>
      <ul>
        {clients.map((client) => (
          <ClientListItem key={client._id} client={client} />
        ))}
      </ul>
    </section>
  );
}
