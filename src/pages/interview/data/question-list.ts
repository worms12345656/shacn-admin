export const questionList = [
  {
    id: '1',
    name: 'list-1',
    categories: [
      {
        categoryName: 'Back End',
        questionList: [
          {
            questionId: '3',
            questionName: 'Characteristic of OOP',
            hint: [
              'Polymorphism',
              'Abtraction',
              'Encapsulation',
              'Inheritance',
            ],
          },
          {
            questionId: '4',
            questionName: 'What is Polymorphism In OOP',
            hint: ['object can take multiple form'],
          },
        ],
      },
      {
        categoryName: 'Front End',
        questionList: [
          {
            questionId: '1',
            questionName: 'What is javascript',
            hint: [
              'is a script or porgaming language',
              'help web page handle difficult logic',
            ],
          },
          {
            questionId: '2',
            questionName: 'let vs const',
            hint: [
              'let can be updated while const cannot',
              'both cannot re-declared',
            ],
          },
        ],
      },
    ],
  },
]
