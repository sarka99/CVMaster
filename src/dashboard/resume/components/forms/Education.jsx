import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education() {
    const [educationalList,setEducationalList] = useState([{
        universityName: '',
        degree:'',
        major : '',
        startDate:'',
        endDate: '',
        description : ''
    }]);
    const params = useParams();
    const handleChange = (event,index) =>{
        const newEntries = educationalList.slice();
        const {name, value} = event.target;
        newEntries [index][name] = value;
        setEducationalList(newEntries);
    }    
    const [loading,setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const AddNewEducation = ()=>{
        setEducationalList([...educationalList, 
            {
                universityName: '',
                degree:'',
                major : '',
                startDate:'',
                endDate: '',
                description : ''
        }
    
    ])

    }
    const RemoveEducation = ()=>{
        if(educationalList.length>1){
            setEducationalList(educationalList=>educationalList.slice(0,-1))
        }
    }
    const onSave = ()=>{   
        setLoading(true);
     const data = {
        data:{
          education:educationalList  
        }
     }
        GlobalApi.updateResumeDetail(params?.resumeId,data).then(res=>{
        console.log(res);
        setLoading(false);
        toast('Details Update!')
     },(error)=>{
        setLoading(false);
        toast('Server Error, Please try again!')
     })
    }
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
    },[educationalList])


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 '>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your Educational Details</p>
    <div>
        {educationalList.map((item, index) =>(
            <div>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div className='col-span-2'>
                        <label>University Name</label>
                        <Input name="universityName" onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div>
                        <label>Degree</label>
                        <Input name="degree" onChange={(e)=>handleChange(e,index)}/>
                    </div>
        
                    <div>
                        <label>Major</label>
                        <Input name="major" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    
                    <div>
                        <label>Start Date</label>
                        <Input name="startDate" type="date" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    
                    <div>
                        <label>End Date</label>
                        <Input name="endDate"  type="date" onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                    <label >Description</label>
                    <textarea name="description" className="rounded-lg border border-black p-6" onChange={(e) => handleChange(e, index)} />
                    </div>

           

                </div>
                <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button variant="outline" className="text-primary" onClick={AddNewEducation}>+ Add More Education</Button>
                <Button variant="outline" className="text-primary" onClick={RemoveEducation}>- Remove Education</Button>
                <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}    
                </Button>
                </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Education