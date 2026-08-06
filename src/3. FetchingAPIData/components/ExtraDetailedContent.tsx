import { use } from 'react';
import type { DetailedUser } from '../../types/UserTypes';

const ExtraDetailedContent = ({
  detailedPromise,
}: {
  detailedPromise: Promise<DetailedUser>;
}) => {
  const details = use(detailedPromise);
  return (
    <div>
      <ul>
        <li>{details.email}</li>
        <li>
          {details.address.city} - {details.address.street}
        </li>
        <li>{details.company.name}</li>
        <li>{details.phone}</li>
      </ul>
    </div>
  );
};

export default ExtraDetailedContent;
