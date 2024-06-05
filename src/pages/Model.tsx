import { useState, ReactNode, useEffect, ChangeEvent } from "react"
import axios from "axios";

interface ModelDetails {
  type: string;
  description: string;
  hyperparameters: { [key: string]: string };
}

function Model() {
  const [buttonPushed, setButtonPushed] = useState(0);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  // const [modelContent, setModelContent] = useState<ReactNode | null>(null);
  const [modelDetails, setModelDetails] = useState<ModelDetails | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [refreshCount, setRefreshCount] = useState(0);


  const showPrivate = () => {
    setContent(
      <div className="grid justify-center items-center">
        Seems you don't have any private models yet.
      </div>
    )
    setButtonPushed(1)
  }

  useEffect(() => {
    axios.get('http://localhost:5000/models')
      .then(response => {
        setModels(response.data.models);
        // console.log('setModels0:',response.data.models)
        console.log('setModels1:', models)
      })
      .catch(error => {
        console.error('Error fetching models:', error);
      });
  }, [])

  useEffect(() => {
    if (selectedModel) {
      fetchModelDetails(selectedModel);
    }
  }, [selectedModel]);

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("Model selected:", event.target.value)
    setSelectedModel(event.target.value);
    // setError("");
    // setModelDetails(null);
    // setIsSubmitted(false);
  }

  const fetchModelDetails = (model: string) => {
    axios
      .post('http://localhost:5000/model_details', { model })
      .then(response => {
        setModelDetails(response.data);
        console.log('setModelDetails', response.data)
        // return response.data;
      })
      .catch(error => {
        console.error('Error fetching model details:', error);
        setModelDetails(null);
      });
  };

  const handleSubmit = () => {
    console.log("Submit button clicked")
    setIsSubmitted(true);

    if (!selectedModel) {
      console.error("No model selected");
      setError("No model selected")
      return;
    }

    console.log("Selected model:", selectedModel);

    axios
      .post("http://localhost:5000/select_model", { model: selectedModel })
      .then((response) => {
        console.log("Model selection response:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting selected model:", error)
        setError("Error submitting selected model")
      })
  }

  const handleClick = () => {
    handleSubmit();
    showPublic();
  }

  useEffect(() => {
      showPublic();
  });

  // useEffect(() => {
  //   if (models.length > 0 && refreshCount <2){
  //     showPublic();
  //     setRefreshCount(refreshCount + 1);
  //   }
    
  // }, [models, refreshCount]);

  const showPublic = () => {
    setContent(
      <div>

        <div>
          <select
            className="text-black text-xl w-[30%] h-10 mt-5 rounded-lg bg-slate-200 pl-3 border border-slate-800 mr-5 mb-5"
            onChange={handleModelChange}
            // value={selectedModel}
          >
            <optgroup label="Choose a model">
              <option value=" " disabled hidden selected>Select a model</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </optgroup>
          </select>
          <button
            onClick={handleClick}
            className="text-black border border-slate-800 pr-10 pl-10 h-10 rounded-lg bg-slate-300"
          >
            Submit
          </button>
        </div>
        
        {isSubmitted && modelDetails && (
          <div>
            <h2>{selectedModel}</h2>
            <p><strong>Type:</strong> {modelDetails.type}</p>
            <p><strong>Description:</strong> {modelDetails.description}</p>
            <p><strong>Hyperparameters:</strong></p>
            <ul>
              {Object.entries(modelDetails.hyperparameters).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    )
    setButtonPushed(2)
  }

  return (
    <div className="pl-20 pt-20 pr-20 text-white">
      <h1 className="text-3xl"><strong>Models</strong></h1>

      <div className="flex justify-between mt-10 text-lg">
        <div className="flex">
          <button
            className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
            onClick={showPrivate}
          >
            Private
          </button>
          <button
            className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
            onClick={showPublic}
          >
            Public
          </button>
        </div>
      </div>

      <div>{content}</div>

    </div>
  )
}

export default Model