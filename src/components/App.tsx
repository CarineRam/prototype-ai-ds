// import { useState, useEffect } from 'react'
// import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../styles/App.css'
import Demo from '../pages/Demo.tsx'
import Kernel from '../pages/Kernel.tsx'
import Layout from '../pages/Layout.tsx'
import TrainTest from '../pages/TrainTest.tsx'
import PreviewDataset from '../pages/PreviewDataset.tsx'
import Model from '../pages/Model.tsx'
import Visualization from '../pages/Visualization.tsx'
import Summary from '../pages/Summary.tsx'
import Prompt from '../pages/Prompt.tsx'
import FineTuning from '../pages/FineTuning.tsx'
import Compare from '../pages/Compare.tsx'
import Review from '../pages/Review.tsx'
import AppVariants from '../pages/AppVariants.tsx'
import { FileProvider } from './connect/FileContext.tsx';
import Histogram from './connect/Histogram.tsx'




function App() {

  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   axios.get('http://localhost:5000/members')
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // },[])

  return (
    <>
      <FileProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Demo />} />
            <Route path='demo' element={<Demo />} />
            <Route path='/' element={<Layout />} >
              <Route path='kernel' element={<Kernel />} />
              <Route path='previewdataset' element={<PreviewDataset />} />
              <Route path='model' element={<Model />} />
              <Route path='traintest' element={<TrainTest />} />
              <Route path='visualize' element={<Visualization />} />
              <Route path='summary' element={<Summary />} />
              <Route path='prompt' element={<Prompt />} />
              <Route path='finetuning' element={<FineTuning />} />
              <Route path='compare' element={<Compare />} />
              <Route path='appvariants' element={<AppVariants />} />
              <Route path='review' element={<Review />} />
              <Route path='histogram' element={<Histogram/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FileProvider>
    </>
  )
}

export default App
