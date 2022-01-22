import React, { useState, useEffect } from 'react';
import styles from './person.module.css';
import { person, status, statusListOption } from '../../utils/interfaces';
import { socketHandler } from '../../utils/socketHandler';

type PersonProps = {
  person: person,
  statusList: Array<statusListOption>,
}

function Person({ person, statusList }: PersonProps) {
  const [edit, setEdit] = useState<Boolean>(false);
  const [statusColor, setStatusColor] = useState('#fff');

  const [status, setStatus] = useState<status>({ main: '', sub: '' });

  // const [statusOptions, setStatusOptions] = useState([]);

  const updateStatusColor = () => {
    const statusOption = statusList.find((statusOption) => person.status?.main === statusOption.name) ?? { color: '#fff' };
    setStatusColor(statusOption.color);
  };

  useEffect(() => {
    updateStatusColor();
  });

  const selectMainStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const personToUpdate = {
      ...person,
      status: {
        main: value,
      },
    };
    socketHandler().updateStatus(personToUpdate);
    setStatus({ main: value });
    updateStatusColor();
  };

  const selectSubStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const personToUpdate = {
      ...person,
      status: {
        main: status.main,
        sub: value,
      },
    };
    socketHandler().updateStatus(personToUpdate);

    // update component state
    status.sub = value;
    setStatus(status);
  };

  const editMode = (enabled: boolean) => {
    setEdit(enabled);
  };

  return (
    <div className={styles.person} style={{ borderColor: statusColor }}>
      <button className={styles.editButton} onClick={() => editMode(true)}><img src="/icons/edit.png" /></button>
      <img src={person.profilePicture} />
      <h1>{ person.name }</h1>

      { !edit && person.status && (
        <div className={styles.status}>
          <p className={styles.mainStatus}>{ person.status.main }</p>
          <p className={styles.subStatus}>{ person.status.sub }</p>
        </div>
      )}

      { edit && (
        <select onChange={selectMainStatus}>
          <option selected disabled>
            Select status
          </option>
          { statusList.map((statusOption) => <option value={statusOption.name}>{ statusOption.name }</option>)}
        </select>
      )}

      { edit && status?.main && (
        <>
          <select onChange={selectSubStatus}>
            <option selected disabled>
              Select sub status
            </option>
            { statusList.find((statusOption) => statusOption.name === status.main)?.subStatusOptions.map((subStatusOption) => <option value={subStatusOption}>{ subStatusOption }</option>)}
          </select>
          <button className={styles.doneButton} onClick={() => editMode(false)}><img src="/icons/tick.png" /></button>
        </>
      )}

    </div>
  );
}

export default Person;
