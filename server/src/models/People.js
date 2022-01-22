import config from '../../../config.js';

/**
 * Creates a new people model instance
 * @class
 */
const people = () => {
  // static list of current people pulled from global repo config
  const currentPeople = config.people;

  return {
    /**
     * Get array of people from config
     * @function getPeople
     * @return {object} Returns an object with an array of people
     */
    getPeople() {
      return currentPeople;
    },

    /**
     * Validate and update the status of user on bro status
     * @function updateStatusByPerson
     * @param {Object<person>} person - The updated person object
     * @return {Array} Returns an array with updated people
     */
    updateStatusByPerson(person) {
      const personToUpdate = currentPeople.find((currentPerson) => person.name === currentPerson.name);
      personToUpdate.status = person.status;
      return currentPeople;
    },
  };
};

// new instance of people model
const People = people();
export default People;
