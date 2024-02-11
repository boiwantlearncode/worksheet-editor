import WorksheetCSS from './Worksheet.module.css';
import useStore from '../utilities/Store';
import { numberToAlphabet } from "../utilities/Tools";

function Worksheet() {
  const { title, questions } = useStore();

  return (
    <main className={WorksheetCSS.main}>
      <h1 className={WorksheetCSS.title}>{title}</h1>
      {questions.map((question, i) => {
        return (
          <div key={i} className={WorksheetCSS.questionBlock}>
            <div className={WorksheetCSS.questionText}>
              <p>{i+1}</p>
              <p>{question.question}</p>
            </div>
            {question.options &&
              <div className={WorksheetCSS.options}>
                {question.options.map((option, i) => {
                  if (i + 1 !== question.options!.length) {
                    return (
                      <div key={i} className={WorksheetCSS.eachOption}>
                        <p>{numberToAlphabet(i+1)}</p>
                        <p>{option.content}</p>
                      </div>
                    )
                  }
                })}
              </div>
            }
          </div>
        )
      })}
    </main>
  )
}

export default Worksheet;