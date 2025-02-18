import { Question } from '@/services/question/schema'

type Category = {
  categoryName: string
  questionList: {
    index: number
    questionId: string
    questionName: string
    hint: string
  }[]
}

export const groupQuestionList = (questionList: Question[]) => {
  const categoryList: Category[] = []

  questionList.forEach((item, index) => {
    if (categoryList.length === 0) {
      return categoryList.push({
        categoryName: item.category,
        questionList: [
          {
            index,
            questionId: item.id,
            questionName: item.name,
            hint: item.hint,
          },
        ],
      })
    }

    const position = categoryList.findIndex(
      (category) => category.categoryName === item.category
    )

    return position > -1
      ? categoryList[position].questionList.push({
          index,
          questionId: item.id,
          questionName: item.name,
          hint: item.hint,
        })
      : categoryList.push({
          categoryName: item.category,
          questionList: [
            {
              index,
              questionId: item.id,
              questionName: item.name,
              hint: item.hint,
            },
          ],
        })
  })

  return categoryList
}
