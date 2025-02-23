import { useState, useEffect, ReactNode, ChangeEvent } from 'react'
import axios from 'axios';
import { LuRefreshCcw } from "react-icons/lu";


function FineTuning() {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [buttonPushed, setButtonPushed] = useState(1);
  const [modelsMC, setModelsMC] = useState<string[]>([]);
  const [datasetsMC, setDatasetsMC] = useState<string[]>([]);
  const [selectedModelMC, setSelectedModelMC] = useState<string>("");
  const [selectedDatasetMC, setSelectedDatasetMC] = useState<string>('');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [epoch, setEpoch] = useState<string>('');

  useEffect(() => {
     axios.get('http://localhost:5000/magicalCodex/models_MC')
        .then(response => {
          setModelsMC(response.data.models_MC)
          console.log("setModelsMC", response.data.models_MC)
        })
        .catch(error => {
          console.error('Error fetching models of MC:', error)
        });

      axios.get('http://localhost:5000/magicalCodex/datasets_MC')
        .then(response => {
          setDatasetsMC(response.data.datasetsMC);
          console.log("datasets MC", response.data.datasetsMC)
        })
        .catch(error => {
          console.error('Error fetching datasets:', error)
        })
  }, [])

  useEffect(() => {
    if (modelsMC.length > 0 && datasetsMC.length > 0) {
      showContentEditor();
    }
  }, [modelsMC, datasetsMC]);

  useEffect(() => {
    if (epoch.length >= 0) {
      showContentEditor();
    }
  }, [epoch]);

  useEffect(() => {
    if (inputText.length >= 0) {
      showContentEditor();
    }
  }, [inputText])

  useEffect(() => {
    if(outputText) {
      showContentEditor();
    }
  }, [outputText])

  const handleModelClickMC = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("Model MC selected:", event.target.value)
    setSelectedModelMC(event.target.value)
  }

  const handleDatasetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('Dataset MC selected:', event.target.value)
    setSelectedDatasetMC(event.target.value)
  }

  const handleEpochChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Epochs:', event.target.value)
    // const newEpoch = parseFloat(event.target.value);
    // setEpoch(newEpoch)
    // setEpoch(event.target.value)
    const newValue = event.target.value;
    if (/^\d*\.?\d*$/.test(newValue)) {
      console.log('Epochs:', newValue);
      setEpoch(newValue);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.match(/[^0-9.]/) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    const newEpoch = parseFloat(epoch);
    if (!isNaN(newEpoch)) {
      setEpoch(newEpoch.toString());
    } else {
      setEpoch('');
    }
  };

  const handleTestAndTrain = async () => {
    if (!selectedDatasetMC && !selectedModelMC) {
      alert("Make sure you choose a model and a dataset!");
      return;
    }

    if (!epoch) {
      alert("Please choose a number of Epochs!");
      return;
    }

    console.log("dataset chosen:", selectedDatasetMC)
    console.log("model chosen:", selectedModelMC)

    // const trainDatasetFineTuning = async () => {
    if (selectedModelMC.includes('gpt2tokenizer')) {
      const trainGpt2 = await fetch('http://127.0.0.1:5000/magicalCodex/dtrain_gpt2', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          model_name: selectedModelMC,
          dataset_name: selectedDatasetMC,
          epoch: epoch,
        })
      });

      const trainGpt2result = await trainGpt2.json();
      console.log('Training Gpt2 result:', trainGpt2result)

    } else if (selectedModelMC.includes('berttokenizer')) {
      const trainBert = await fetch('http://127.0.0.1:5000/magicalCodex/dtrain_bert', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          model_name: selectedModelMC,
          dataset_name: selectedDatasetMC,
          epoch: epoch,
        })
      });
      const trainBertresult = await trainBert.json();
      console.log('Training Bert result:', trainBertresult)
    }
  }

  const handleGenerateText = async () => {
    if (selectedModelMC.includes('gpt2tokenizer')) {
      console.log('GPT2 Tokenizer selected')
      const generateTextFineTuning = await fetch('http://127.0.0.1:5000/magicalCodex/dgenerate_text', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          prompt_text: inputText,
        })
      });
      const generatedText = await generateTextFineTuning.json()
      setOutputText(generatedText.generated_text)

      if (!generateTextFineTuning.ok) {
        throw new Error('HTTP error! Status: ${response.status}')
      }

    } else if (selectedModelMC.includes('berttokenizer')) {
      console.log('Bert Tokenizer selected')
      const predictWordFineTuning = await fetch('http://127.0.0.1:5000/magicalCodex/dpredict_word', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          prompt_text: inputText,
        })
      });

      if (!predictWordFineTuning.ok) {
        throw new Error('HTTP error! Status: ${predictWordFineTuning.status}')
      }

      const predictWord = await predictWordFineTuning.json()
      console.log(predictWord)
      setOutputText(predictWord.predicted_token)
    } 
    
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    console.log(e.target.value)
  }

  const showContentEditor = () => {
    setContent(
      <div>
        <div className="w-full flex gap-5 bg-slate-200 p-5 rounded-xl text-slate-800">
          <div>
            <p className="mb-3"><strong>Fine Tuned Model Name</strong></p>
            <input className="h-12 w-64 p-5 rounded-lg border border-slate-800" type="text" />
          </div>
          <div>
            <p className="mb-3"><strong>Base Model</strong></p>
            <select
              name=""
              id=""
              className="w-64 h-12 rounded-md border border-slate-800 bg-white"
              onChange={handleModelClickMC}
              
            >
              <optgroup label="Your Models">
                <option disabled hidden selected value="">Select the Model</option>
                {modelsMC.map((models, key) => (
                  <option key={key} value={models}>{models}</option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <p className="mb-3"><strong>Train Dataset</strong></p>
            <select
              className="w-64 h-12 rounded-md border border-slate-800 bg-white"
              name=""
              id=""
              onChange={handleDatasetChange}
            >
              <optgroup label="Your Datasets">
                <option disabled hidden selected>Select a dataset</option>
                {datasetsMC.map(datasetsMC => (
                  <option key={datasetsMC} value={datasetsMC}>{datasetsMC}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div>

        </div>

        <div className="flex gap-10 mt-10 text-lg ">
          <div className="bg-slate-200 border rounded-xl border-slate-500 text-slate-800 p-3 w-9/12">

          </div>
          <div className="bg-slate-200 border rounded-xl border-slate-500 w-3/12 p-5 text-slate-800 overflow-y-auto h-[60vh]">
            <div className="mb-3">
              <p className="mb-3">Variables</p>

              <div className="flex gap-4">
                <p className="font-type-machine p-1 pl-2 pr-2 bg-slate-400 rounded-md text-s">input</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="mb-3">Output Column</p>

            </div>

            <div className="mb-3">
              <p className="mb-3">Epochs</p>

              <input
                type="text"
                className="h-12 w-full border border-slate-600 rounded-md pl-2 pr-2"
                value={epoch}
                onChange={handleEpochChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="mb-3">
              <p className="mb-3">Stop Sequence</p>

              <input type="text" className="h-12 w-full border border-slate-600 rounded-md pl-2 pr-2" />
            </div>

            <div className="mb-3">


              <button
                className="h-12 w-full bg-slate-600 text-white border border-slate-600 rounded-md pl-2 pr-2"
                onClick={handleTestAndTrain}
              >Train</button>
            </div>


          </div>
        </div>

        <div className="mt-10 right-0 inset-0">
          <div className="flex justify-between">
            <div></div>
            <div className="flex gap-10">
              <button className="text-slate-200 ">
                View Settings
              </button>
              <button
                className="text-slate-200 border border-slate-500 pl-5 pr-5 pt-2 pb-2 rounded-lg flex items-center hover:bg-slate-500"
                onClick={handleGenerateText}
              >
                <LuRefreshCcw /> &nbsp;Generate Output
              </button>
            </div>
          </div>
        </div>


        <div className="flex mt-10 mb-10 text-slate-800 border border-slate-600 rounded-xl bg-slate-100">
          <div className="w-6/12">
            <div className="bg-slate-300  p-3 rounded-tl-xl border-b border-r border-slate-600">
              Input
            </div>
            <div className="bg-slate-100 border-slate-600 rounded-bl-xl border-r flex ">
              <div className="w-4/12 grid p-3 items-center border-r border-slate-600">
                Input
              </div>
              <div className="w-8/12 p-3">
                <input
                  className='w-full h-[60px] p-3'
                  placeholder="Enter a custom input"
                  value={inputText}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="w-3/12 border-r border-slate-600">
            <div className="bg-slate-300  p-3  border-b border-slate-600">
              Output Prompt
            </div>
            <div className="bg-slate-100 p-3  border-slate-600 ">
              {outputText && (
                <div className="">
                  <p>{outputText}</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-3/12">
            <div className="bg-slate-300  p-3 rounded-tr-xl border-b border-slate-600">
              Target Completion
            </div>
            <div className="bg-slate-100 p-3 border-slate-600 ">

            </div>
          </div>
        </div>
      </div>
    )
    setButtonPushed(1);
  }

  const showContentExamples = () => {
    setContent(
      <div className="w-full rounded-xl p-10 bg-slate-200 text-slate-800">
        <div className=""><strong>Fine-tuned Models</strong></div>
        <p>You currently have no fine-tunings for this app.</p>
      </div>
    )
    setButtonPushed(2);
  }
  
  return (
    <>

      <div className="pl-20 pt-20 pr-20 text-white">
        <h1 className="text-3xl"><strong>Fine Tuning</strong></h1>
        <div className="flex">
          <p className="text-lg">We have documentation about this! &nbsp;</p>
          <a href="" className=" hover:underline hover:underline-offset-1 text-lg text-slate-300"> Click to read our documentation</a>
        </div>

        <div className="flex justify-between mt-10 text-lg">
          <div className="flex">
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
              onClick={showContentEditor}
            >
              Create
            </button>
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
              onClick={showContentExamples}
            >
              View Fine-Tuned Models
            </button>
          </div>
          <div className="item-to-align">
            <button className="pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-lg bg-slate-500 hover:bg-slate-600">
              Create Fine Tune
            </button>
          </div>
        </div>

        <div className="mt-10 ">
          {content}
        </div>


      </div>

    </>
  )
}


export default FineTuning