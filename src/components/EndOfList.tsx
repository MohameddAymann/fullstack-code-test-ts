import React from 'react';
import './EndOfList.css';

interface EndOfListProps {
  /** Total number of users loaded */
  totalUsers: number;
}

/**
 * EndOfList component for displaying when all users have been loaded
 * @param props - Component props
 * @returns JSX element
 */
const EndOfList: React.FC<EndOfListProps> = ({ totalUsers }) => {
  return (
    <div className="end-of-list" role="status" aria-live="polite">
      <div className="end-of-list-icon" aria-hidden="true">
        🎉
      </div>
      <h3 className="end-of-list-title">You've reached the end!</h3>
      <p className="end-of-list-message">
        You've loaded all {totalUsers} users. No more users to display.
      </p>
      <div className="end-of-list-decoration" aria-hidden="true">
        <div className="decoration-line"></div>
        <div className="decoration-dot"></div>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
};

export default EndOfList;
