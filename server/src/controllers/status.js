import People from '../models/People.js';
import config from '../../../config.js';

const status = () => {
  return {
    async getStatus() {
      const peopleStatus = await People.getPeople();
      return { peopleStatus, error: false }
    },
    updateStatus(request) {
      // status validation
      const newStatus = config.statusOptions.find(statusOption => statusOption.name === request.status.main);
      if (!newStatus) return { error: true }


      if (request.status.sub) {
        const newSubStatus = newStatus.subStatusOptions.find(subStatusOption => subStatusOption === request.status.sub)
        if (!newSubStatus) return { error: true }
      }

      const peopleStatus = People.updateStatusByPerson(request)
      return { peopleStatus, error: false }
    }
  };
};

const Status = status();
export default Status;
