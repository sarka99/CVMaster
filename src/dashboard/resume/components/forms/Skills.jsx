import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input';
import { Rating } from '@smastrom/react-rating'
import { Button } from '../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

import '@smastrom/react-rating/style.css'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';
function Skills() {
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating : 0
    }
    ])
    const handleChange = (index,name,value) =>{
        const newEntries = skillsList.slice();
        newEntries [index][name] = value;
        setSkillsList(newEntries);
    }
    const [loading,setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
    const AddNewSkills = ()=>{
        setSkillsList([...skillsList,{
            name: '',
            rating : 0
        }])
    }
    const RemoveSkills =()=> {
        if(skillsList.length>1){
            setSkillsList(skillsList=>skillsList.slice(0,-1))
        }
    }
    const {resumeId} = useParams();
    useEffect(()=>{
        resumeInfo && setSkillsList(resumeInfo?.skills)
        console.log(skillsList)
    },[resumeInfo])
    const onSave = ()=>{
        setLoading(true);
        const data = {
            data : {
                skills : skillsList.map(({id, ...rest}) => rest)
            }
        }
        GlobalApi.updateResumeDetail(resumeId,data)
            .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Skills Updated!');

        },(error) => {
            setLoading(false);
            toast('Server Error, Try Again!');
        })

    }


  return (
    <div>
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 '>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your Top Skills</p>
    <div>
        {skillsList.map((item,index)=>(
            <div className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full" onChange={(e) => handleChange(index,'name',e.target.value)}
                    defaultValue={item?.name}
                    />
                </div>                    
                <Rating style={{ maxWidth: 120 }} value={item.r}
                onChange={(v) => handleChange(index,'rating', v)} 
                defaultValue={item?.rating}
                />

            </div>
        ))}
    </div>
    </div>
    <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button variant="outline" className="text-primary" onClick={AddNewSkills}>+ Add More Skill</Button>
                <Button variant="outline" className="text-primary" onClick={RemoveSkills}>- Remove Skill</Button>
                </div>
                <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
            </div>

    </div>
  )
}

export default Skills
