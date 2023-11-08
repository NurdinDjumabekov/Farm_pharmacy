import cls from './students.module.sass'
import defaultAva from '../../assets/images/student/defaultAva.svg'

const Students = ({ userData }) =>
{

    return (
        <div className={cls.wrapper}>
            <div className={cls.userCard}>
                <div className={cls.top}>
                    <div className={cls.ava}>
                        <img src={!userData.ava ? defaultAva : userData.ava} alt="avatar" />
                    </div>
                    <div className={cls.mainInfo}>
                        <b>{userData.username}</b>

                    </div>
                </div>
                <div className={cls.middle}>
                    <div className={cls.courseInfo}>
                        <p>email: {userData.is_superuser}</p>
                    </div>
                    <div className={cls.monthInfo}>
                        <p></p>
                    </div>
                </div>
                <div className={cls.bottom}>
                    <button className={cls.editBtn}>Редактировать данные</button>
                    <button className={cls.deleteBtn}>Удалить</button>
                </div>
            </div>
        </div>
    )
};

export default Students;