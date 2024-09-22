import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from '../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * This is used to get the users resume list, based on their email (filter)
   */
  const GetResumesList = async () => {
    try {
      const email = user.primaryEmailAddress.emailAddress; // Ensure this is correct
      const resp = await GlobalApi.GetUserResumes(email);
      setResumeList(resp.data.data);
      console.log(resp.data.data)
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-2xl'>My Resume</h2>
      <p>Start Creating AI resume</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
