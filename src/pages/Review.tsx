import { useState, ReactNode, useEffect } from "react"
import '../styles/Review.css';
import { LuBinary } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa6";
import { FaFolderTree } from "react-icons/fa6";
import { GiMeshNetwork } from "react-icons/gi";
import { GoXCircle } from "react-icons/go";

function Review() {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [buttonPushed, setButtonPushed] = useState(0);
  const [button, setButton] = useState<ReactNode | null>(null);
  const [modalEvaluation, setModalEvaluation] = useState(false);
  const [buttonEvaluationStep1, setButtonEvaluationStep1] = useState(0);
  const [contentEvaluation, setContentEvaluation] = useState<ReactNode | null>(null);
  const [buttonContinueEvaluation, setButtonContinueEvaluation] = useState<ReactNode | null>(null);
  const [modalEvaluationStep2, setModalEvaluationStep2] = useState(false);
  const [modalBulk, setModalBulk] = useState(false);

  const showContentEvaluation = () => {
    setContent(
      <p>No evaluations yet, create an evaluation to get started!</p>
    )
    setButtonPushed(1)
    setButton(
      <button onClick={toggleModalEvaluation} className="w-full h-full">Create Evaluation</button>
    )
  }

  const showContentBulk = () => {
    setContent(
      <p>No bulk inferences yet! Launch a bulk inference to get started!</p>
    )
    setButtonPushed(2)
    setButton(
      <button
        onClick={toggleModalBulk}
      >New Bulk Inference</button>
    )
  }

  const showContentEvaluationBinary = () => {
    setContentEvaluation(
      <>
        <p className="mt-10">3. Select human evaluation source?</p>
        <select className='mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
          <option value="">Use Scale's workforce (Scale Studio)</option>
          <option value="">Use your own workforce (Scale Studio)</option>
        </select>
      </>
    )
    setButtonEvaluationStep1(1)
    setButtonContinueEvaluation(
      <button
        className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white"
        onClick={toggleModalEvaluationStep2}
      >
        Continue
      </button>
    )
  }

  const showContentEvaluationClassification = () => {
    setContentEvaluation(
      <>
        <p className="mt-10">2a. Which column in the dataset should be used as the expected output?</p>
        <select className='mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
          <option value=""></option>
        </select>

        <label className="">
          <input type="checkbox" className="h-5 w-5" />
          <span>&nbsp;Strip starting in the dataset should be used as the expected output?</span>
        </label>

      </>
    )
    setButtonEvaluationStep1(2)
    setButtonContinueEvaluation(
      <button className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white">
        Start Evaluation
      </button>
    )
  }

  const showContentEvaluationMauve = () => {
    setContentEvaluation(
      <>
        <p className="mt-10">2a. Which column in the dataset should be used as the expected output?</p>
        <select className='mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
          <option value=""></option>
        </select>

      </>
    )
    setButtonEvaluationStep1(3)
    setButtonContinueEvaluation(
      <button className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white">
        Start Evaluation
      </button>
    )
  }

  const toggleModalEvaluation = () => {
    setModalEvaluation(!modalEvaluation);
  }

  const toggleModalBulk = () => {
    setModalBulk(!modalBulk);
  }

  useEffect(() => {
    showContentEvaluation();
  }, [])

  if (modalEvaluation) {
    document.body.classList.add('active-modalEvaluation')
  } else {
    document.body.classList.remove('active-modalEvaluation')
  }

  if (modalBulk) {
    document.body.classList.add('active-modalBulk')
  } else {
    document.body.classList.remove('active-modalBulk')
  }

  const toggleModalEvaluationStep2 = () => {
    setModalEvaluationStep2(!modalEvaluationStep2)
  }

  if (modalEvaluationStep2) {
    document.body.classList.add('active-modalEvaluationStep2')
  } else {
    document.body.classList.remove('active-modalEvaluationStep2')
  }


  return (
    <>

      <div className="pl-20 pt-20 pr-20 text-white">
        <h1 className="text-3xl"><strong>Review</strong></h1>

        <div className="flex justify-between mt-10 text-lg">
          <div className="flex">
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
              onClick={showContentEvaluation}
            >
              Evaluation Results
            </button>
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
              onClick={showContentBulk}
            >
              Bulk Inferences
            </button>
          </div>
          <div className="item-to-align">
            <button className="pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-lg bg-slate-500 hover:bg-slate-600">
              {button}
            </button>
          </div>
        </div>

        <div className="w-full h-[50vh] grid justify-center items-center">
          <p>{content}</p>
        </div>
      </div>

      {modalEvaluation && (
        <div className="modal bg-slate-300 fixed top-0 left-[15vw] right-0 bottom-0 overflow-auto">
          <div onClick={toggleModalEvaluation} className="overlay bg-slate-800 fixed top-0 left-[15vw] right-0 bottom-0"></div>
          <div className="modal-evaluation text-slate-200">
            <div className="flex justify-between">
              <h1 className="text-xl mb-10 mt-5"><strong>Evaluation Setup</strong></h1>
              <button onClick={toggleModalEvaluation}><GoXCircle className="text-4xl" /></button>
            </div>

            <div className="flex bg-slate-300 text-slate-800 gap-5 w-[70vw] border border-slate-700 ">
              <div className="w-1/2 border-r p-5 border-slate-700">
                <h3 className="text-xl ">Select Evaluation Type</h3>
                <p>Choose how you would want to evaluate your variants.</p>
              </div>
              <div className="w-1/2  p-5">
                <h3 className="text-xl">Select Evaluation Configs</h3>
                <p>Select your dataset and variants to evaluate.</p>
              </div>
            </div>
            <div className="flex bg-slate-300 text-slate-800 gap-5 w-[70vw] border border-slate-700 text-lg">
              <div className="w-1/2 p-5 border-r border-slate-700">
                <p className="mb-5">Human Evaluations</p>
                <button
                  className={`flex gap-5 border border-slate-700 w-full p-5 items-center ${buttonEvaluationStep1 === 1 ? 'bg-slate-400' : ''}`}
                  onClick={showContentEvaluationBinary}
                >
                  <LuBinary className="text-6xl" />
                  <div>
                    <strong>Binary</strong>
                    <p>Determine how well one variant's output meets your criteria.</p>
                  </div>
                </button>
                <button className="flex gap-5 border border-slate-700 w-full p-5 mt-5 items-center">
                  <FaTrophy className="text-6xl" />
                  <div>
                    <strong>Ranking</strong>
                    <p>Determine how several variants compare to each other and which one is consistently best.</p>
                  </div>
                </button>

                <p className="mb-5 mt-5">Programmatic Evaluations</p>
                <button
                  className={`flex gap-5 border border-slate-700 w-full p-5 items-center ${buttonEvaluationStep1 === 2 ? 'bg-slate-400' : ''}`}
                  onClick={showContentEvaluationClassification}
                >
                  <FaFolderTree className="text-6xl " />
                  <div>
                    <strong>Classification</strong>
                    <p>Exact matching your labels and outputs. Generates F1 score with overall and per class accuracy metrics.</p>
                  </div>
                </button>
                <button
                  className={`flex gap-5 border border-slate-700 w-full p-5 mt-5 items-center ${buttonEvaluationStep1 === 3 ? 'bg-slate-400' : ''}`}
                  onClick={showContentEvaluationMauve}
                >
                  <GiMeshNetwork className="text-9xl" />
                  <div>
                    <strong>Mauve</strong>
                    <p>Measure distribution similarities between your labels and outputs. Useful for longer generations, but recommended to have many samples for a more precise score.</p>
                  </div>
                </button>
              </div>
              <div className="w-1/2 p-5">
                <p>1. Which variant(s) would you like to evaluate?</p>
                <select className='mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
                  <option value="">Variant 1</option>
                  <option value="">Variant 2</option>
                </select>

                <p className="mt-10">2. Which dataset would you like to evaluate against?</p>
                <select className='mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
                  <optgroup label="Your datasets">
                    <option disabled hidden selected>Your datasets</option>
                    <option value="">.csv</option>
                  </optgroup>
                </select>
                <div>
                  {contentEvaluation}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div></div>
              <div>{buttonContinueEvaluation}</div>
            </div>

          </div>
          {/* <button className="close-modal-evaluation" onClick={toggleModalEvaluation}>Cancel</button> */}
        </div>
      )}

      {modalEvaluationStep2 && (
        <div className="modal bg-slate-300 fixed top-0 left-[15vw] right-0 bottom-0 overflow-auto">
          <div onClick={toggleModalEvaluation} className="overlay bg-slate-800 fixed top-0 left-[15vw] right-0 bottom-0"></div>
          <div className="modal-evaluation text-slate-200">
            <div className="flex justify-between">
              <h1 className="text-xl mb-10 mt-5"><strong>Evaluation Setup (step 2)</strong></h1>
              <button onClick={toggleModalEvaluation}><GoXCircle className="text-4xl" /></button>
            </div>

            <div className="flex bg-slate-300 text-slate-800 gap-5 w-[70vw] border border-slate-700 ">
              <div className="w-1/2 border-r p-5 border-slate-700">
                <h3 className="text-xl ">Define Instructions</h3>
                <p>Input tasks and good/bad parameters</p>
              </div>
              <div className="w-1/2  p-5">
                <h3 className="text-xl">Evaluation Preview</h3>
                <p>Based on the fields on the left, this is what the expert will see</p>
              </div>
            </div>
            <div className="flex bg-slate-300 text-slate-800 gap-5 w-[70vw] border border-slate-700 text-lg">
              <div className="w-1/2 p-5 border-r border-slate-700">
                <p className="mb-5 mt-5">1. What is the main task of your app? (required)</p>
                <input
                  className={`flex gap-5 border border-slate-700 w-full p-5 items-center h-[15vh]`}
                />

                <p className="mb-5 mt-5">2. What would you consider to be a good output?</p>
                <input
                  className={`flex gap-5 border border-slate-700 w-full p-5 items-center h-[15vh]`}
                />

                <p className="mb-5 mt-5">3. What would you consider to be a bad output?</p>
                <input
                  className={`flex gap-5 border border-slate-700 w-full p-5 items-center h-[15vh]`}
                />

              </div>
              <div className="w-1/2 p-5">
                <div className=" p-5 bg-white border border-slate-700">
                  <p>Instructions</p>
                  <p>(Please specify instructions and ranking criteria using the left hand side)</p>
                </div>

                <div className=" p-5 bg-white border border-slate-700 grid justify-center items-center mt-10 h-[20vh]">
                  <p>Generated output here</p>
                </div>

                <div className=" p-5 bg-white border border-slate-700 grid justify-center items-center mt-10 h-[20vh]">
                  <p>Based on the instructions provided, please determine whether the model output is good or bad</p>
                  <div className="grid justify-center items-center">
                    <div className="flex gap-5">
                      <button className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-lg hover:bg-slate-600 `}>Good</button>
                      <button className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-lg hover:bg-slate-600`}>Bad</button>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p><strong>Pricing Estimate</strong></p>
                  <p>A snapshot of what you might expect to be paying</p>

                  <div className="flex justify-center mt-5 border border-slate-700 rounded-t-xl">
                    <div className="w-2/12 p-3 border-r  bg-slate-400 border-slate-700 rounded-tl-xl">
                      VARIANTS
                    </div>
                    <div className="w-2/12 p-3 border-r  bg-slate-400 border-slate-700">
                      ITEMS
                    </div>
                    <div className="w-2/12 p-3 border-r  bg-slate-400 border-slate-700">
                      ESTIMATED TIME
                    </div>
                    <div className="w-3/12 p-3 border-r  bg-slate-400 border-slate-700">
                      UNIT RATE
                    </div>
                    <div className="w-3/12 p-3 rounded-tr-xl  bg-slate-400 border-slate-700">
                      ESTIMATED COST
                    </div>
                  </div>

                  <div className="flex justify-center border border-slate-700 rounded-b-xl">
                    <div className="w-2/12 p-3 border-r  bg-white border-slate-700 rounded-bl-xl">
                      1
                    </div>
                    <div className="w-2/12 p-3 border-r  bg-white border-slate-700">
                      918
                    </div>
                    <div className="w-2/12 p-3 border-r  bg-white border-slate-700">
                      19.0 hours
                    </div>
                    <div className="w-3/12 p-3 border-r bg-white border-slate-700">
                      $0.21 per item per variant
                    </div>
                    <div className="w-3/12 p-3 rounded-br-xl  bg-white border-slate-700">
                      <strong>$192.78</strong>
                    </div>
                  </div>

                </div>

              </div>
            </div>
            <div className="flex justify-between">
              <div></div>
              <div className="flex gap-5">
                <button className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white"
                  onClick={toggleModalEvaluation}> Back </button>
                <button className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white">Start Evaluation</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalBulk && (
        <>
          <div className="modal bg-slate-300 fixed top-0 left-[15vw] right-0 bottom-0 overflow-auto">
            <div onClick={toggleModalBulk} className="overlay bg-slate-800 fixed top-0 left-[15vw] right-0 bottom-0"></div>
            <div className="modal-evaluation w-[73vw] text-slate-200">
              <div className="flex justify-between">
                <h1 className="text-xl mb-10 mt-5"><strong>Lauch Inference Batch</strong></h1>
                <button onClick={toggleModalBulk}><GoXCircle className="text-4xl" /></button>
              </div>

              <div>
                <p>1. Which variant(s) would you like to evaluate?</p>
                <select className='text-slate-700 mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
                  <option value="">Variant 1</option>
                  <option value="">Variant 2</option>
                </select>
              </div>

              <div>
                <p>2. Which dataset would you like to evaluate against?</p>
                <select className='text-slate-700 mb-3 w-full h-12 mt-3 rounded-md border border-slate-800 pl-3 bg-white' name="" id="">
                  <optgroup label="Your datasets">
                    <option disabled hidden selected>Your datasets</option>
                    <option value="">.csv</option>
                  </optgroup>
                </select>
              </div>

              <div className="flex justify-between">
                <div></div>
                <div className="flex gap-5">
                  <a className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white"
                    href='/review'> Back </a>
                  <button className="p-3 border border-slate-700 text-slate-700 mt-5 bg-white">Evaluation</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}






    </>
  )
}

export default Review