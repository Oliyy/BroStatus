// import models
import People from '../models/People.js';

// import config
import config from '../../../config.js';

/**
 * Creates a new status controller instance
 * @class
 */
const status = () => ({
  /**
     * Get the current status of people from memory
     * @function getStatus
     * @return {object} Returns an object with an array of people's status
     */
  getStatus() {
    const peopleStatus = People.getPeople();
    return { peopleStatus };
  },

  /**
     * Validate and update the status of user on bro status
     * @function updateStatus
     * @param {object} request - The request object from the socket, includes new status data
     * @return {object} Returns an object with an array of people's updated status'
     */
  updateStatus(request) {
    // status validation
    const newStatus = config.statusOptions.find((statusOption) => statusOption.name === request.status.main);
    if (!newStatus) return { error: true };

    // if it includes a sub status selection validate it as well.
    if (request.status.sub) {
      const newSubStatus = newStatus.subStatusOptions.find((subStatusOption) => subStatusOption === request.status.sub);
      if (!newSubStatus) return { error: true };
    }

    // Use the people model to update the person in memory
    const peopleStatus = People.updateStatusByPerson(request);
    return { peopleStatus };
  },

  /**
     * Get list of available status' to chose from
     * @function getStatusList
     * @return {Object} Object with an Array of status options
     */
  getStatusList() {
    return { statusListOptions: config.statusOptions };
  },
});

// New stauts controller instance
const Status = status();
export default Status;
