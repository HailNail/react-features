import { Suspense, useState } from 'react';
import type { DetailedUser } from '../../types/UserTypes';
import { fetchExtraDetails } from '../utils/fetchExtraDetails';
import ExtraDetailedContent from './ExtraDetailedContent';
import SpinnerIcon from '../../lib/SpinnerIcon';

const UserCard = ({ userId }: { userId: number }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailedPromise, setDetailedPromise] =
    useState<Promise<DetailedUser> | null>(null);

  const handleToggleDetails = () => {
    if (!showDetails && !detailedPromise) {
      setDetailedPromise(fetchExtraDetails(userId));
    }
    setShowDetails((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleToggleDetails}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails && detailedPromise && (
        <Suspense fallback={<SpinnerIcon />}>
          <ExtraDetailedContent detailedPromise={detailedPromise} />
        </Suspense>
      )}
    </div>
  );
};

export default UserCard;
