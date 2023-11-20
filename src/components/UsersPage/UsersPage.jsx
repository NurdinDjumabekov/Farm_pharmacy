import UserCard from '../UserCard/UserCard';
import cls from './studentsPage.module.css';

const UsersPage = ({ users }) => {
  return (
    <main className={cls.studentsWrapper}>
      {users.map((user) => <UserCard key={user.id} userData={user} />) || (
        <h3 className={cls.noneData}>Список Пользователей пуст</h3>
      )}
    </main>
  );
};

export default UsersPage;
