import useStore from "../utilities/Store";
import { OptionType, QuestionType } from "../utilities/Types";
import OptionCSS from "./Option.module.css";


function Option(props: OptionType) {
  const { index, identifier, content } = props;
  const { selected, setSelected, questions, setQuestions } = useStore();

  const getSelectedQuestionInformation = () => {
    return questions.filter((question) => question.id === selected)[0];
  }

  const getOptions: OptionType[] = (() => {
    if (getSelectedQuestionInformation().options) {
      return getSelectedQuestionInformation().options!
    } else {
      return new Array<OptionType>;
    };
  })();

  const getUpdatedQuestions = (value: string, addNewOption: boolean) => {
    return function(question: QuestionType) {
      if (question.id === selected) {
        if (question.options) {
          for (var i = 0; i < question.options.length; i++) {
            if (question.options[i].identifier === identifier) {
              question.options[i].content = value;
            }
          }
          if (addNewOption) {
            question.options.push({
              "identifier": (question.options.length + 1 + 9).toString(36).toUpperCase(), 
              "content": "",
              "index": question.options.length + 1
            }, )
          }
        }
      }
      return question
    }
  }

  const editSelectedQuestion = (value: string, addNewOption: boolean) => {
    return questions.map(getUpdatedQuestions(value, addNewOption));
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (index !== getOptions.length) {
      setQuestions(editSelectedQuestion(e.currentTarget.value, false))
    } else {
      setQuestions(editSelectedQuestion(e.currentTarget.value, true))
    }
  }

  return (
    <div className={OptionCSS.option}>
      <div className={`${index === getOptions.length ? OptionCSS.emptyIdentifier : OptionCSS.identifier}`}>
        <p>{identifier}</p>
      </div>
      <input onChange={handleTextChange} type="text" name="content" id="content" value={content} />
    </div>
  )
}

export default Option;