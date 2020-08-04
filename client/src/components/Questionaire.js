import React from 'react';



const Questionaire = ({
    handleAnswer, 
    data: { question, correct_answer, 
    incorrect_answers},
}) => {

    const ShuffledAnswer = [correct_answer, ...incorrect_answers].sort(
        () => Math.random() - 0.5
    );

    return (  
        <div className="container">
            <div >
                            <h2 dangerouslySetInnerHTML={{__html: question}}>
                                
                            </h2>
                        </div>
                        <div className='answer'>
                            {ShuffledAnswer.map(answer => (    
                                <button
                                    className='btn' 
                                    onClick={() => handleAnswer
                                    (answer)}>
                                    {answer}
                                </button>                  
                            ))}      
                        </div>
        </div>
    ); 
};


export default Questionaire;