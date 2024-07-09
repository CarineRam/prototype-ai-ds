import { IoIosApps } from "react-icons/io";
import Switch from '@mui/material/Switch';
import { LuRefreshCcw } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import axios from 'axios'

interface Parameter {
  id: number;
  name: string;
  model: string;
  temperature: number;
  max_tokens: number;
  stop_sequences: string;
  save_date: string;
}

function Compare() {
  const [variants, setVariants] = useState<Parameter[]>([]);
  const [selectedVariant1, setSelectedVariant1] = useState<Parameter | null>(null);
  const [selectedVariant2, setSelectedvariant2] = useState<Parameter | null>(null);

  useEffect(() => {
    axios.get<Parameter[]>('http://localhost:5000/magicalCodex/view_parameters')
      .then(response => {
        setVariants(response.data.reverse())
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the parameters!', error)
      })
  }, []);

  const handleVariant1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const variant = variants.find(v => v.id === selectedId) || null;
    setSelectedVariant1(variant);
  }

  const handleVariant2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const variant = variants.find(v => v.id === selectedId) || null;
    setSelectedvariant2(variant);
  }

  return (
    <div className="pl-20 pt-20 pr-20 pb-20 text-white">
      <h1 className="text-3xl"><strong>Compare</strong></h1>

      <div className=" mt-5 bg-slate-200 text-slate-800 p-4 border border-slate-600 rounded-xl">
        <div className="flex gap-5 items-center">
          <p className="text-xl">&nbsp;Comparing</p>
          <select 
            className='mb-3 p-2 h-10 rounded-md border border-slate-800 bg-slate-300' 
            name="" 
            id=""
            onChange={handleVariant1Change}
            value={selectedVariant1?.id || ''}
            >
            {variants.map((variant: Parameter) => (
              <option key={variant.id} value={variant.id}>{variant.name}</option>
            ))}
          </select>
          <p className="text-xl">to</p>
          <select 
            className='mb-3 p-2 h-10 rounded-md border border-slate-800 bg-slate-300' 
            name="" 
            id=""
            value={selectedVariant2?.id || ''}
            onChange={handleVariant2Change}
            >
            {variants.map((variant: Parameter) => (
              <option key={variant.id} value={variant.id}>{variant.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedVariant1 && selectedVariant2 && (
        <div>
          <div className="mt-10 pb-5 text-xl items-center bg-slate-200 text-slate-800 p-4 border border-slate-600 rounded-xl">
            <div className="flex justify-between">
              <p className="text-xl">Variant Differences</p>
              <div className="flex items-center">
                Show Identical fields
                <Switch defaultChecked color="default" />
              </div>
            </div>
            <div className="flex border border-slate-600 rounded-t-xl">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                PARAMETERS
              </div>
              <div className="w-5/12 p-3 bg-slate-300 border-r border-slate-600">
                <div className="flex">
                  <IoIosApps className="text-2xl" /><p className="text-xl">&nbsp;{selectedVariant1.name}</p>
                </div>
              </div>
              <div className="w-5/12 p-3 bg-slate-300 rounded-tr-xl">
                <div className="flex">
                  <IoIosApps className="text-2xl" /><p className="text-xl">&nbsp;{selectedVariant2.name}</p>
                </div>
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                Prompt
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600 font-type-machine">
                Classify each input.<br />

                Use this format:<br />

                Input:<br />
                Class:<br />

                Begin:<br />

                Input:<br />
                Class:<br />
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600 font-type-machine">
                Classify each input.<br />

                Use this format:<br />

                Input:<br />
                Class:<br />

                Begin:<br />

                Input:<br />
                Class:<br />
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                System Message
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                N/A
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                N/A
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                Model
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant1.model}
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant2.model}
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                Temperature
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant1.temperature}
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant2.temperature}
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                Max Tokens
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant1.max_tokens}
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant2.max_tokens}
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600">
                Stop Sequences
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant1.stop_sequences}
              </div>
              <div className="w-5/12 p-3 border-r border-slate-600">
                {selectedVariant2.stop_sequences}
              </div>
            </div>

            <div className="flex border-l border-r border-b border-slate-600 rounded-b-xl">
              <div className="w-2/12 p-3 bg-slate-300 rounded-tl-xl border-r border-slate-600 rounded-bl-xl">
                Variable
              </div>
              <div className="w-10/12 p-3 border-r border-slate-600 rounded-br-xl grid justify-center">
                No prompt variables
              </div>
            </div>
          </div >

          <div className="mt-10 items-center bg-slate-200 text-slate-800 p-4 border border-slate-600 rounded-xl">
            <div className="flex gap-5 items-center">
              <p className="text-xl">&nbsp;Evaluate</p>
              <select className='mb-3 p-2 h-10 rounded-md border border-slate-800 bg-slate-300' name="" id="">
                <option value="">Classification</option>
                <option value="">Mauve Score</option>
                <option value="">Human Evaluation</option>
              </select>
              <p className="text-xl">against</p>
              <select className='mb-3 p-2 h-10 rounded-md border border-slate-800 bg-slate-300' name="" id="">
                <optgroup label="Your Datasets">
                  <option disabled hidden selected>Select Dataset</option>
                  <option value="">Dataset 1</option>
                  <option value="">Dataset 2</option>
                </optgroup>
              </select>
            </div>

            <div className="mt-10 right-0 inset-0 text-slate-800">
              <div className="flex justify-between">
                <div></div>
                <div className="flex gap-10">
                  <button className="">
                    View Settings
                  </button>
                  <button className=" border border-slate-500 pl-5 pr-5 pt-2 pb-2 rounded-lg flex items-center hover:bg-slate-300">
                    <LuRefreshCcw /> &nbsp;Generate Output
                  </button>
                </div>
              </div>
            </div>

            <div className="flex mt-10 mb-5 text-slate-800 border border-slate-600 rounded-xl bg-slate-100">
              <div className="w-4/12">
                <div className="bg-slate-300  p-3 rounded-tl-xl border-b border-r border-slate-600">
                  Input
                </div>
                <div className="bg-slate-100 border-slate-600 rounded-bl-xl border-r flex ">
                  <div className="w-4/12 grid p-3 items-center border-r border-slate-600">
                    Input
                  </div>
                  <div className="w-8/12 p-3">
                    <input className='w-full h-[60px] p-3' placeholder="Enter a custom input" />
                  </div>
                </div>
              </div>

              <div className="w-4/12 border-r border-slate-600">
                <div className="bg-slate-300  p-3 rounded-tr-xl border-b border-slate-600">
                  {selectedVariant1.name}
                </div>
                <div className="bg-slate-100 p-3 border-slate-600 ">

                </div>
              </div>

              <div className="w-4/12">
                <div className="bg-slate-300  p-3 rounded-tr-xl border-b border-slate-600">
                  {selectedVariant2.name}
                </div>
                <div className="bg-slate-100 p-3 border-slate-600 ">

                </div>
              </div>
            </div>


          </div>
        </div>
      )}


    </div >
  )
}


export default Compare