import React from 'react';
import { User } from '../services/api';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      </div>
      <div className="user-info">
        <h3 className="user-name">
          {user.first_name} {user.last_name}
        </h3>
        <p className="user-email">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
