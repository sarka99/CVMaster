import React from 'react';

export default function ProfessionalExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: resumeInfo?.themeColor }}>
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
          style={{
            color:resumeInfo?.themeColor
          }}
          >{experience?.title}</h2>
          
          <div className='flex justify-between items-center'>
            <h2 className='text-xs'>
              {experience?.companyName}, {experience?.city}, {experience?.state}
            </h2>
            <span className='text-xs'>
              {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </span>
          </div>

          <p className='text-xs my-2'>{experience.workSummery}</p>
        </div>
      ))}
    </div>
  );
}
