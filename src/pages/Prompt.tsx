import { FaUpload } from "react-icons/fa6";
import { useState, useEffect, ReactNode, ChangeEvent } from 'react'
import { LuRefreshCcw } from "react-icons/lu";
import axios from "axios";

function Prompt() {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [buttonPushed, setButtonPushed] = useState(1);
  const [temperature, setTemperature] = useState<number>(0);
  const [maxLength, setMaxLength] = useState<number>(65);
  const [modelsMC, setModelsMC] = useState<string[]>([]);
  const [selectedModelMC, setSelectedModelMC] = useState<string>("");
  const [selectedDatasetMC, setSelectedDatasetMC] = useState<string>('');
  const [datasetsMC, setDatasetsMC] = useState<string[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [bertOutputContent, setBertOutputContent] = useState(null);
  const [gpt2OutputContent, setGpt2OutputContent] = useState(null);
  const [outputContent, setOutputContent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string[]>([]);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTemperature = parseFloat(e.target.value);
    setTemperature(newTemperature);
  };

  const handleIncrement = () => {
    const newTemperature = Math.min(1, temperature + 0.01);
    setTemperature(parseFloat(newTemperature.toFixed(2)));
  }

  const handleDecrement = () => {
    const newTemperature = Math.max(0, temperature - 0.01);
    setTemperature(parseFloat(newTemperature.toFixed(2)));
  }

  const handleTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTokens = parseFloat(e.target.value);
    setMaxLength(newTokens);
  }

  const handleIncrementTokens = () => {
    const newTokens = Math.min(1100, maxLength + 25);
    setMaxLength(parseFloat(newTokens.toFixed(2)));
  }

  const handleDecrementTokens = () => {
    const newTokens = Math.max(0, maxLength - 25);
    setMaxLength(parseFloat(newTokens.toFixed(2)));
  }

  const showContentEditor = () => {
    setContent(
      <textarea className="w-full bg-slate-200">Editor</textarea>
    )
    setButtonPushed(1);
  }

  const showContentExamples = () => {
    setContent(<p>Examples</p>)
    setButtonPushed(2);
  }

  useEffect(() => {
    showContentEditor();
  }, []);

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

  console.log("Rendering with datasetsMC", datasetsMC);

  const handleModelClickMC = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("Model MC selected:", event.target.value)
    setSelectedModelMC(event.target.value)
  }

  const handleDatasetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('Dataset MC selected:', event.target.value)
    setSelectedDatasetMC(event.target.value)
  }

  const handleTemplateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value);
  };

  const handlePredictAndGenerate = async () => {
    if (!selectedModelMC) {
      alert("Please select a model first")
      return;
    }

    console.log('Tplt:', selectedTemplate)
    console.log('MS: ', selectedModelMC)

    if (selectedTemplate.includes('autocomplete')) {
      try {
        let apiUrl = '';
        if (selectedModelMC.includes('berttokenizer')) {
          apiUrl = 'http://127.0.0.1:5000/magicalCodex/predict_mask';
          const predictMaskResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input_text: inputContent, max_length: maxLength })
          });
          const predictMaskData = await predictMaskResponse.json();
          setBertOutputContent(predictMaskData.predicted_token);
          setOutputContent(predictMaskData.predicted_text);
        } else if (selectedModelMC.includes('gpt2tokenizer')) {
          apiUrl = 'http://127.0.0.1:5000/magicalCodex/generate_text';
          const generateTextResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ input_text: inputContent, max_length: maxLength })
          });
          const generateTextData = await generateTextResponse.json()
          setOutputContent(generateTextData.generated_text);
        }
      } catch (error) {
        console.error("Error fetching the API", error);
      }
    } else if (selectedTemplate.includes('genericClassification')){
      console.log('Generic Classification Template selected')
    } else if (selectedTemplate.includes('namedEntityExtraction')){
      console.log('Named Entity Extraction Template selected')
    } else if (selectedTemplate.includes('oneSentenceSummarization')){
      console.log('One Sentence Summerization Template selected')
    } else {
      alert("Please select a template first")
      return;
    }

  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputContent(e.target.value);
    console.log(e.target.value)
  };

  return (
    <>

      <div className="pl-20 pt-20 pr-20 text-white">
        <h1 className="text-3xl"><strong>Prompt</strong></h1>
        <div className="flex">
          <p className="text-lg">Crafting an exceptional prompt can significantly enhance the caliber of your application. &nbsp;</p>
          <a href="" className=" hover:underline hover:underline-offset-1 text-lg text-slate-300"> Discover insights and guidance on formulating prompts here.</a>
        </div>

        <div className="flex justify-between mt-10 text-lg">
          <div className="flex">
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
              onClick={showContentEditor}
            >
              Editor
            </button>
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
              onClick={showContentExamples}
            >
              Few-Shot Examples
            </button>
          </div>
          <div className="item-to-align">
            <button className="pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-lg bg-slate-500 hover:bg-slate-600">
              Save New Variant
            </button>
          </div>
        </div>

        <div className="flex gap-10 mt-10 text-lg ">
          <div className="bg-slate-200 border rounded-xl border-slate-500 text-slate-800 p-3 w-9/12">
            {content}
          </div>
          <div className="bg-slate-200 border rounded-xl border-slate-500 w-3/12 p-5 text-slate-800 overflow-y-auto h-[60vh]">
            <div>
              <p className="mb-3">Template</p>

              <select
                className='mb-3 w-full h-12 rounded-md border-slate-800 bg-slate-300'
                name=""
                id=""
                onChange={handleTemplateChange}
              >
                <optgroup label="Example Prompts">
                  <option disabled hidden selected>Start from Template</option>
                  <option value="genericClassification">Generic Classification</option>
                  <option value="autocomplete">Autocomplete</option>
                  <option value="namedEntityExtraction">Named Entity Extraction</option>
                  <option value="oneSentenceSummarization">One-Sentence Summarization</option>
                </optgroup>
              </select>
            </div>

            <div>
              <p className="mb-3">Dataset</p>

              <div className="mb-3">
                <select
                  className="w-full h-12 rounded-md border-slate-800 bg-slate-300"
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

            <div className="mb-3">
              <p className="mb-3">Variables</p>

              <div className="flex gap-4">
                <p className="font-type-machine p-1 pl-2 pr-2 bg-slate-400 rounded-md text-s">text</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="mb-3">Output Taxonomy</p>

              <button className="min-h-12 pl-4 pr-4 border rounded-xl border-slate-500 hover:bg-slate-400">
                Add Output Taxonomy
              </button>
            </div>

            <div className="mb-3">
              <p className="mb-3">Model</p>

              <select
                name=""
                id=""
                className="w-full h-12 rounded-md border-slate-800 bg-slate-300"
                onChange={handleModelClickMC}
              >
                <optgroup label="Your Models">
                  <option disabled hidden selected>Select the Model</option>
                  {modelsMC.map(modelsMC => (
                    <option key={modelsMC} value={modelsMC}>{modelsMC}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="mb-3">
              <div className="flex justify-between">
                <p className="mb-6">Temperature</p>
                <div className="controls">
                  <button onClick={handleDecrement}>-&nbsp; </button>
                  <input
                    type="text"
                    value={temperature}
                    className="input w-20 border border-slate-600 rounded-md pl-2 pr-2"
                  />
                  <button onClick={handleIncrement}> &nbsp;+</button>
                </div>
              </div >
              <div className="relative ">

                <input
                  className="w-full h-5 bg-slate-600 rounded-full top-0 -mt-3 left-0"
                  type='range'
                  min={0}
                  max={1}
                  step={0.01}
                  value={temperature}
                  onChange={handleTemperatureChange}
                ></input>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between">
                <p className="mb-6">Maximum Tokens</p>
                <div className="controls">
                  <button onClick={handleDecrementTokens}>-&nbsp; </button>
                  <input
                    type="text"
                    value={maxLength}                    
                    className="input w-20 border border-slate-600 rounded-md pl-2 pr-2"
                  />
                  <button onClick={handleIncrementTokens}> &nbsp;+</button>
                </div>
              </div >
              <div className="relative ">

                <input
                  className=" h-5 bg-slate-600 rounded-full w-full top-0 -mt-3 left-0"
                  type='range'
                  min={0}
                  max={1100}
                  step={25}
                  value={maxLength}
                  onChange={handleTokensChange}
                ></input>
              </div>
            </div>

            <div className="mb-3">
              <p className="mb-3">Stop Sequence</p>

              <input type="text" className="h-12 w-full border border-slate-600 rounded-md pl-2 pr-2" />
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
                onClick={handlePredictAndGenerate}
              >
                <LuRefreshCcw /> &nbsp;Generate Output
              </button>
            </div>
          </div>
        </div>


        <div className="flex mt-10 mb-10 text-slate-800 border border-slate-600 rounded-xl bg-slate-100">
          <div className="w-7/12">
            <div className="bg-slate-300  p-3 rounded-tl-xl border-b border-r border-slate-600">
              Input
            </div>
            <div className="bg-slate-100 border-slate-600 rounded-bl-xl border-r flex ">
              <div className="w-4/12 grid p-3 items-center border-r border-slate-600">
                Input
              </div>
              <div className="w-8/12 p-3">
                <input
                  className='w-full h-[60px] p-3' placeholder="Enter a custom input"
                  value={inputContent}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="w-5/12">
            <div className="bg-slate-300  p-3 rounded-tr-xl border-b border-slate-600">
              New Variant
            </div>
            <div className="bg-slate-100 p-3 border-slate-600 rounded-br-xl">
              <p>{outputContent}</p>
              <div>
                <p>{bertOutputContent}</p>
              </div>
              <div>
                <p>{gpt2OutputContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Prompt