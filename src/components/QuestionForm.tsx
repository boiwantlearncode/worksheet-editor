import QuestionFormCSS from './QuestionForm.module.css';

import Tag from './Tag';
import Option from './Option';

import useStore from '../utilities/Store';
import { OptionType, QuestionType } from '../utilities/Types';

function QuestionForm() {
  const { selected, setSelected, questions, setQuestions } = useStore();

  const tagList = ["MCQ", "OPEN"];

  const getSelectedQuestionInformation = () => {
    return questions.filter((question) => question.id === selected)[0];
  }

  const getUpdatedQuestions = (value: string) => {
    return function(question: QuestionType) {
      if (question.id === selected) {
        question.question = value
      }
      return question
    }
  }

  const getOptions: OptionType[] = (() => {
    if (getSelectedQuestionInformation().options) {
      return getSelectedQuestionInformation().options!
    } else {
      return new Array<OptionType>;
    };
  })();

  const editSelectedQuestion = (value: string) => {
    return questions.map(getUpdatedQuestions(value));
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    return setQuestions(editSelectedQuestion(e.currentTarget.value))
  }

  return (
    <main className={QuestionFormCSS.main}>
      <h2 className={QuestionFormCSS.sectionHeader}>Type</h2>
      <div className={QuestionFormCSS.tagList}>
      {tagList.map((tag, i) => {
        return <Tag key={i} questionType={tag} currentSelectedQuestionTag={getSelectedQuestionInformation().questionType}/>
      })}
      </div>
      <h2 className={QuestionFormCSS.sectionHeader}>Question</h2>
      <textarea onChange={handleTextChange} value={getSelectedQuestionInformation().question}></textarea>
      <h2 className={QuestionFormCSS.sectionHeader}>Options</h2>
      <div className={QuestionFormCSS.optionsList}>
      {getOptions.map((option, i) => {
        return <Option key={i} index={i} content={option.content}/>
      })}
      </div>
    </main>
  )
}

export default QuestionForm;