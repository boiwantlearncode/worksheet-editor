import OptionCSS from "./Option.module.css";

import useStore from "../utilities/Store";
import { OptionType, QuestionType } from "../utilities/Types";
import { numberToAlphabet } from "../utilities/Tools";

import DeleteDefaultSVG from '../assets/delete-default.svg';

function Option(props: OptionType) {
  const { index, content } = props;
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
          question.options[index].content = value;
          if (addNewOption) {
            question.options.push({
              "content": "",
              "index": question.options.length + 1
            })
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
    if (index + 1 !== getOptions.length) {
      setQuestions(editSelectedQuestion(e.currentTarget.value, false))
    } else {
      setQuestions(editSelectedQuestion(e.currentTarget.value, true))
    }
  }

  const mapFunction = (question: QuestionType): QuestionType => {
    const newQuestion: QuestionType = { ...question };

    if (question.id === selected && newQuestion.options) {
      newQuestion.options = newQuestion.options.filter((option, i) => i !== index);
    }
  
    return newQuestion;
    // return question.options!.filter((option: OptionType, i) => i !== index);
  }

  const deleteOption = () => {
    setQuestions(questions.map(mapFunction));

  }

  return (
    <div className={OptionCSS.option}>
      <div className={`${index + 1 === getOptions.length ? OptionCSS.emptyIdentifier : OptionCSS.identifier}`}>
        <p>{numberToAlphabet(index + 1)}</p>
      </div>
      <input onChange={handleTextChange} className={`${index + 1 === getOptions.length ? OptionCSS.emptyInput : OptionCSS.input}`} type="text" name="content" id="content" value={content} />
      {index + 1 !== getOptions.length ?
      <img onClick={deleteOption} className={OptionCSS.deleteSVG} src={DeleteDefaultSVG} alt="Delete" /> :
      <div className={OptionCSS.deleteButtonEmptyPlaceholder}></div>
      }
    </div>
  )
}

export default Option;