import config from '../../../config.js';

const people = () => {
  // static list of current people pulled from config
  const currentPeople = config.people;

  return {
    async getPeople() {
      return currentPeople;
    },
    updateStatusByPerson(person) {
      const personToUpdate = currentPeople.find(currentPerson => person.name === currentPerson.name)
      personToUpdate.status = person.status;
      return currentPeople;
    }
  };
};

const People = people();
export default People;
