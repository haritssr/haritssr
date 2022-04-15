export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      projectName: 'Haris Lab',
      webAddress: 'www.harislab.com',
      developmentStartDate: 'June 2021',
      developmentStatus: 'Ongoing',
      numberOfWebPages: '150',
      estimatedDevelopmentTime: 'Ongoing or 4 hour/day',
    },
    {
      id: 2,
      projectName: 'Haris Studio',
      webAddress: 'www.harislab.com',
      developmentStartDate: 'June 2021',
      developmentStatus: 'Ongoing',
      numberOfWebPages: '150',
      estimatedDevelopmentTime: 'Ongoing or 4 hour/day',
    },
  ]);
}
