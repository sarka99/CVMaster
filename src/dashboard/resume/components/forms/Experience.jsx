import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input'; // Adjusted path
import { Button } from '../../../../components/ui/button';
import RichTextEditor from '../../../components/RichTextEditor';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',

}
function Experience() {
    const [experienceList, setExperienceList] = useState([{
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummery: '' // Note: This matches your Strapi field for markdown
    }]);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

    useEffect(()=>{
        resumeInfo && setExperienceList(resumeInfo?.Experience)

    }, [resumeInfo])

    const handleChange = (index,event) =>{
        const newEntries = experienceList.slice();
        const {name, value} = event.target;
        newEntries [index][name] = value;
        setExperienceList(newEntries);

    }
    const [loading,setLoading] = useState(false);

    const handleRichTextEditor =(e,name,index)=>{
        const newEntries = experienceList.slice();
        newEntries [index][name] = e.target.value;
        setExperienceList(newEntries);
    }
    const AddNewExperience = () =>{
        setExperienceList([...experienceList, formField])
    }
    const RemoveExperience = () =>{
        if(experienceList.length>1){
            setExperienceList(experienceList=>experienceList.slice(0,-1))
        }
    }
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        })
        console.log(experienceList);

    },[experienceList])
    const params = useParams();



    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                Experience:experienceList.map(({ id, ...rest }) => rest)
            }
        }
         console.log(experienceList)

        GlobalApi.updateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            toast('error !')

            setLoading(false);
        })


    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 '>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your Previous Job Experience</p>    
            <div>
                {experienceList.map((field,index)=>(
                    <div>

                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg' g>
                        <div>
                        <label className='text-xs'>Position Title</label>
                        <Input name="title" onChange={(event) => handleChange(index, event)}
                        defaultValue={field?.title}
                        
                        />
                        </div>

                        <div>
                        <label className='text-xs'>Company Name</label>
                        <Input name="companyName" onChange={(event) => handleChange(index, event)}
                        defaultValue={field?.companyName}

                        />
                        </div>

                        <div>
                        <label className='text-xs'>City</label>
                        <Input name="city" onChange={(event) => handleChange(index, event)}
                        defaultValue={field?.city}
                        />
                        </div>

                        <div>
                        <label className='text-xs'>State</label>
                        <Input name="state" onChange={(event) => handleChange(index, event)}
                        defaultValue={field?.state}
                        />
                        </div>

                        <div>
                        <label className='text-xs'>Start Date</label>
                        <Input name="startDate" type = "date" onChange={(event) => handleChange(index, event)}
                        defaultValue={field?.startDate}
                        />
                        </div>

                        <div>
                        <label className='text-xs'>End Date</label>
                        <Input name="endDate" type="date" onChange={(event) => handleChange(index, event)}
                        defaultValue={field?.endDate}
/>
                        </div>  


                        <div className='col-span-2'>
                        <RichTextEditor 
                        onRichTextEditorChange={(event) =>handleRichTextEditor(event,'workSummery',index)}
                        defaultValue={field?.workSummery}

                        />
                        </div>    

                    </div>

                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button variant="outline" className="text-primary" onClick={AddNewExperience}>+ Add More Experience</Button>
                <Button variant="outline" className="text-primary" onClick={RemoveExperience}>- Remove Experience</Button>
                </div>
                <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
            </div>
        </div>


    </div>
  )
}

export default Experience
