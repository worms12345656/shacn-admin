import { Question } from '@/services/question/schema'
import { questionResult } from '@/services/result/type'

type Category = {
  categoryName: string
  questionList: {
    index: number
    questionId: string
    questionName: string
    hint: string
    rating?: number
  }[]
}

export const groupQuestionList = (
  questionList: Question[] | questionResult[]
) => {
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

type CategoryWithRating = {
  categoryName: string
  questionList: questionResult[]
}
export const groupQuestionListWithRating = (questionList: questionResult[]) => {
  const categoryList: CategoryWithRating[] = []
  console.log('questionList', questionList)

  questionList.forEach((item) => {
    if (categoryList.length === 0) {
      return categoryList.push({
        categoryName: item.category,
        questionList: [
          {
            ...item,
          },
        ],
      })
    }

    const position = categoryList.findIndex(
      (category) => category.categoryName === item.category
    )

    return position > -1
      ? categoryList[position].questionList.push({
          ...item,
        })
      : categoryList.push({
          categoryName: item.category,
          questionList: [
            {
              ...item,
            },
          ],
        })
  })

  return categoryList
}
