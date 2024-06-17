import { useEffect, useState } from 'react';
import { setClientStatus } from '../utils/api';

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

const statusOptions = [
  { value: 'В работе', label: 'В работе' },
  { value: 'Отказ', label: 'Отказ' },
  { value: 'Сделка закрыта', label: 'Сделка закрыта' },
  { value: 'Не в работе', label: 'Не в работе' },
];

export default function ClientListItem({ client }: { client: TypeClients }) {
  const [status, setSelectedStatus] = useState('Не в работе');

  useEffect(() => {
    setSelectedStatus(client.status);
  }, [client]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setClientStatus(client._id, newStatus)
      .then((updatedClient) => {
        // @ts-ignore
        setSelectedStatus(updatedClient.status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <li className="client-list-item">
      <div className="client-list-item__info">
        <span className="client-list-item__name">{`${client.firstName} ${client.middleName} ${client.lastName}`}</span>
      </div>
      <select value={status} onChange={handleStatusChange}>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.label} defaultValue={status}>
            {option.label}
          </option>
        ))}
      </select>
    </li>
  );
}
