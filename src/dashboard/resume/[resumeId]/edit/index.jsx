import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import dummy from '@/data/dummy'
function EditResume() {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState();
    useEffect(()=>{
        console.log(params.resumeId);
        setResumeInfo(dummy);

    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>

      {/*form section*/}
      <FormSection/>

      {/*Preview section*/}
      <ResumePreview/>

      </ResumeInfoContext.Provider>
     
    </div>
  )
}

export default EditResume
