import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div  className='shadow-lg h-full p-14 border-t-[20px] '
    style={
      {
        borderColor:resumeInfo?.themeColor
      }
    }>
      {/*Personal details*/}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>
      {/*Summary*/}
      <SummaryPreview resumeInfo={resumeInfo}/>
      {/*Professional experience*/}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>
      {/*Educational*/}
      <EducationalPreview resumeInfo={resumeInfo}/>
      {/*Skills*/}
      <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview
