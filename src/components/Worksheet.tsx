import WorksheetCSS from './Worksheet.module.css';
import useStore from '../utilities/Store';

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
                        <p>{option.identifier}</p>
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