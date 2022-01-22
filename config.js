module.exports = {
  people: [
    { name: 'Oliy Barrett',
      profilePicture: 'https://media-exp1.licdn.com/dms/image/D4D03AQEdSoBcDrb1Gg/profile-displayphoto-shrink_800_800/0/1633352778792?e=1648080000&v=beta&t=NPpRTDcjS85wZzKYULfrCCCXfF7_LJYnN6VJYVKnl3E'
    }, {
      name: 'Yoav Zimet',
      profilePicture: 'https://media-exp1.licdn.com/dms/image/C4E03AQGadVICW9mBUA/profile-displayphoto-shrink_800_800/0/1635546399536?e=1648080000&v=beta&t=ElEVWfye-DGognsLU6Soc5ikT7XOMp6Sp0u8ZJKtyBQ'
    }, {
      name: 'Raven Douglas',
      profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQEjmIhqfFhmGw/profile-displayphoto-shrink_800_800/0/1639412877546?e=1648080000&v=beta&t=H7jT9lU3AKFii37C9Tn-TsUkknpELi4UsY3CLvumWtY'
    }
  ],
  statusOptions: [
      {
        name: 'Chilling',
        subStatusOptions: ['Don\'t mind being disturbed', 'Do not disturb'],
        color: '#98f5ff',
      }, {
        name: 'Keyed In',
        subStatusOptions: ['Available', 'Only disturb if urgent'],
        color: '#0b485a',
      }, {
        name: 'Busy',
        subStatusOptions: ['Can be interrupted', 'Only disturb if urgent', 'Do not disturb at all'],
        color: '#A17562',
      }, {
        name: 'In a Meeting',
        subStatusOptions: ['Do not disturb', 'Only disturb if urgent'],
        color: '#2486e6',
      }, {
        name: 'Sleep',
        subStatusOptions: ['Do not disturb', 'Only disturb if urgent'],
        color: '#0c4c74',
      },
    ],
  socketUrl: 'http://localhost:9998/hi'
};
