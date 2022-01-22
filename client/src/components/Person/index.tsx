import React, { useState, useEffect } from 'react';
import styles from './person.module.css';
import { person, status, statusListOption } from '../../utils/interfaces';

// import components
import Status from '../Status';
import StatusSelect from '../StatusSelect';

// type definition for props
type PersonProps = {
  person: person,
  statusList: Array<statusListOption>,
}

function Person({ person, statusList }: PersonProps) {
  // state store for per person data
  const [edit, setEdit] = useState<Boolean>(false);
  const [statusColor, setStatusColor] = useState('#fff');
  const [status, setStatus] = useState<status>({ main: '', sub: '' });

  // function to update status color of component
  const updateStatusColor = () => {
    const statusOption = statusList.find((statusOption) => person.status?.main === statusOption.name) ?? { color: '#fff' };
    setStatusColor(statusOption.color);
  };

  // when component loads/reloads update status color
  useEffect(() => {
    updateStatusColor();
  });

  // udpate whether the user is in edit mode per person component
  const editMode = (enabled: boolean) => {
    setEdit(enabled);
  };

  return (
    <div className={styles.person} style={{ borderColor: statusColor }}>
      <button className={styles.editButton} onClick={() => editMode(true)}><img src="/icons/edit.png" /></button>

      <img src={person.profilePicture} />
      <h1>{ person.name }</h1>

      { !edit && person.status && (
        <Status main={person.status.main} sub={person.status.sub} />
      )}

      { edit && (
        <StatusSelect setStatus={setStatus} status={status} person={person} statusList={statusList} editMode={editMode} />
      )}
    </div>
  );
}

export default Person;
