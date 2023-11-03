import Students from '../Students/Students';
import cls from './studentsPage.module.css'

const UsersPage = ({ users }) =>
{

    return (
        <main className={cls.studentsWrapper}>
            {
                users.map(user => <Students key={user.id} userData={user} />) || <h3 style={{ textAlign: 'center', marginTop: '8px' }}>Список учеников пуст</h3>
            }
        </main>
    )
};

export default UsersPage;