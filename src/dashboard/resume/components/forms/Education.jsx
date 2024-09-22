import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education() {
  const [educationalList, setEducationalList] = useState([{
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  // Add new education entry
  const AddNewEducation = () => {
    setEducationalList([...educationalList, {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  // Remove education entry
  const RemoveEducation = (index) => {
    if (educationalList.length > 1) {
      const updatedList = educationalList.filter((_, i) => i !== index);
      setEducationalList(updatedList);
    }
  };

  useEffect(() => {
    if (resumeInfo && resumeInfo?.education) {
      setEducationalList(resumeInfo?.education);
    }
  }, [resumeInfo]);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    });
  }, [educationalList]);

  // Save educational details to the backend
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest) // Exclude id field if necessary
      }
    };

    GlobalApi.updateResumeDetail(params?.resumeId, data).then(res => {
      setLoading(false);
      toast('Details updated!');
    }, (error) => {
      setLoading(false);
      toast('Server error, please try again.');
    });
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 '>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your Educational Details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input name="universityName" value={item.universityName} onChange={(e) => handleChange(e, index)} />
            </div>

            <div>
              <label>Degree</label>
              <Input name="degree" value={item.degree} onChange={(e) => handleChange(e, index)} />
            </div>

            <div>
              <label>Major</label>
              <Input name="major" value={item.major} onChange={(e) => handleChange(e, index)} />
            </div>

            <div>
              <label>Start Date</label>
              <Input name="startDate" type="date" value={item.startDate} onChange={(e) => handleChange(e, index)} />
            </div>

            <div>
              <label>End Date</label>
              <Input name="endDate" type="date" value={item.endDate} onChange={(e) => handleChange(e, index)} />
            </div>

            <div className="col-span-2">
              <label>Description</label>
              <textarea name="description" className="rounded-lg border border-black p-6"
                value={item.description} onChange={(e) => handleChange(e, index)} />
            </div>

            <div className='col-span-2 flex justify-end'>
              <Button variant="outline" className="text-primary" onClick={() => RemoveEducation(index)}>- Remove Education</Button>
            </div>
            <div className='flex justify-between'>
        <Button variant="outline" className="text-primary" onClick={AddNewEducation}>+ Add More Education</Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
          </div>
          
          
        ))}
      </div>

      {/* Render Add/Save Buttons here outside the map */}
     
    </div>
  );
}

export default Education;
