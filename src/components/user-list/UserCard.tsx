import React, { memo } from 'react';
import { User } from '../../services/api';
import './styles/UserCard.css';

interface UserCardProps {
  /** User data to display */
  user: User;
}

/**
 * UserCard component that displays individual user information
 * Memoized for performance optimization
 * @param props - Component props
 * @returns JSX element
 */
const UserCard: React.FC<UserCardProps> = memo(({ user }) => {
  return (
    <article className="user-card" role="listitem">
      <div className="user-avatar">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          loading="lazy"
        />
      </div>
      <div className="user-info">
        <h3 className="user-name">
          {user.first_name} {user.last_name}
        </h3>
      </div>
    </article>
  );
});

UserCard.displayName = 'UserCard';

export default UserCard;
