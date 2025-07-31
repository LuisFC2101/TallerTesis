import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import FormCrearEmprendedor from '../components/FormCrearEmprendedor';
import Form from '@components/Form'; 

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');
  const [showCrearPopup, setShowCrearPopup] = useState(false);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedUsers) => {
    setDataUser(selectedUsers);
  }, [setDataUser]);

  const userData = dataUser && dataUser.length > 0 ? dataUser[0] : {};

  const columns = [
    { title: "Nombre", field: "nombreCompleto", width: 350, responsive: 0 },
    { title: "Correo electrónico", field: "email", width: 300, responsive: 3 },
    { title: "Rut", field: "rut", width: 150, responsive: 2 },
    { title: "Rol", field: "rol", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Usuarios</h1>
          <div className='filter-actions'>
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
              {dataUser.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-user-button' disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
              {dataUser.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
            <button className='add-user-button' onClick={() => setShowCrearPopup(true)}>
              + Agregar Emprendedor
            </button>
          </div>
        </div>
        <Table
          data={users}
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Popup para editar usuario */}
      <Popup show={isPopupOpen} setShow={setIsPopupOpen}>
        <Form
          title="Editar usuario"
          fields={[
            {
              label: "Nombre completo",
              name: "nombreCompleto",
              defaultValue: userData.nombreCompleto || "",
              placeholder: 'Diego Alexis Salazar Jara',
              fieldType: 'input',
              type: "text",
              required: true,
              minLength: 15,
              maxLength: 50,
              pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              patternMessage: "Debe contener solo letras y espacios",
            },
            {
              label: "Correo electrónico",
              name: "email",
              defaultValue: userData.email || "",
              placeholder: 'example@gmail.cl',
              fieldType: 'input',
              type: "email",
              required: true,
              minLength: 15,
              maxLength: 30,
            },
            {
              label: "Rut",
              name: "rut",
              defaultValue: userData.rut || "",
              placeholder: '21.308.770-3',
              fieldType: 'input',
              type: "text",
              minLength: 9,
              maxLength: 12,
              pattern: /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
              patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
              required: true,
            },
            {
              label: "Rol",
              name: "rol",
              fieldType: 'select',
              options: [
                { value: 'administrador', label: 'Administrador' },
                { value: 'usuario', label: 'Usuario' },
              ],
              required: true,
              defaultValue: userData.rol || "",
            },
            {
              label: "Nueva contraseña",
              name: "newPassword",
              placeholder: "**********",
              fieldType: 'input',
              type: "password",
              required: false,
              minLength: 8,
              maxLength: 26,
              pattern: /^[a-zA-Z0-9]+$/,
              patternMessage: "Debe contener solo letras y números",
            }
          ]}
          onSubmit={handleUpdate}
          buttonText="Editar usuario"
          backgroundColor={'#fff'}
        />
      </Popup>

      {/* Popup para crear emprendedor */}
      <Popup show={showCrearPopup} setShow={setShowCrearPopup}>
        <FormCrearEmprendedor onClose={() => setShowCrearPopup(false)} />
      </Popup>
    </div>
  );
};

export default Users;
