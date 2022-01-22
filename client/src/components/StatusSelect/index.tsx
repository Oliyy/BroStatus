import React from 'react';
import styles from './statusSelect.module.css';
import { socketHandler } from '../../utils/socketHandler';
import { status, person, statusListOption } from '../../utils/interfaces';

// props for Status Select component
// pretty busy here because it's a small project I
// didn't add a better state management system
type StatusSelectProps = {
  setStatus: any,
  statusList: Array<statusListOption>
  status: status,
  person: person,
  editMode: any
}

function StatusSelect({
  setStatus, statusList, status, person, editMode,
}: StatusSelectProps) {
  // Update main status
  const selectMainStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const personToUpdate = {
      ...person,
      status: {
        main: value,
      },
    };
    // send updated main status to the socket server
    socketHandler().updateStatus(personToUpdate);

    // update UI state
    setStatus({ main: value });
  };

  // update sub status
  const selectSubStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const personToUpdate = {
      ...person,
      status: {
        main: status.main,
        sub: value,
      },
    };
    // update sub status on server
    socketHandler().updateStatus(personToUpdate);

    // update component state
    status.sub = value;
    setStatus(status);
  };

  return (
    <>
      <select defaultValue="default" onChange={selectMainStatus}>
        <option value="default" disabled>Select status</option>
        { statusList.map((statusOption) => <option key={statusOption.name} value={statusOption.name}>{ statusOption.name }</option>)}
      </select>

      { status.main && (
        <>
          <select defaultValue="default" onChange={selectSubStatus}>
            <option value="default" disabled>Select status</option>
            { statusList.find((statusOption) => statusOption.name === status.main)?.subStatusOptions.map((subStatusOption) => <option key={subStatusOption} value={subStatusOption}>{ subStatusOption }</option>)}
          </select>
          <button className={styles.doneButton} onClick={() => editMode(false)}><img src="/icons/tick.png" /></button>
        </>
      )}
    </>
  );
}

export default StatusSelect;
