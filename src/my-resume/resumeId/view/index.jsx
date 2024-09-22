import React, { useEffect, useState } from 'react'; // Added useState import
import Header from '../../../components/custom/Header';
import { Button } from '../../../components/ui/button';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'; // Ensure correct import
import GlobalApi from '../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
  import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);  
  const { resumeId } = useParams();

  const HandleDownload = () => {
    window.print();
  };

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="non-print-area">
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congratulations! Your Resume is Ready
          </h2>
          <p className='text-center text-gray-400'>
            You Are Now Ready to Download and Share Your Resume
          </p>

          <div className='flex justify-between px-44 my-10'>
            <Button onClick={HandleDownload}>Download</Button>

            <RWebShare
        data={{
          text: "Hello Everyone, This is my most recent resume. Open URL to see",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+ " " + resumeInfo?.lastName + " Resume",
        }}
        onClick={() => console.log("shared successfully!")}>
               
      <Button>Share</Button>

      </RWebShare>

          </div>
        </div>
      </div> 
      
      <div>
        <div id="print-area" className='my-20 mx-20 md:mx-25 lg:mx-10'>
          <ResumePreview />
        </div>
      </div>
      

    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
