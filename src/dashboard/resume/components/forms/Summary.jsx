import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function Summary({enableNext}) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [loading,setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            summery: summery,
        });
    }, [summery]);
  

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data = {
            data : {
                summery:summery
            }
        }
        GlobalApi.updateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enableNext(true)
            setLoading(false)
            toast("Details Updated")

        },(error)=>{
            setLoading(false)
        })
        enableNext(true)        
    }



    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Your Summary for The Job Title</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                </div>
            
                <Textarea
                className="mt-5"
                required
                value={summery}
                onChange={(e) => setSummery(e.target.value)}/>


                <div className='mt-2 flex justify-end'>
                <Button type = "submit"
                    disabled = {loading}> {loading?<LoaderCircle className='animate-spin'/> : 'Save'} </Button>
                </div>
            </form>
            
        </div>
    );
}

export default Summary;
