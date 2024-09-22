import { Loader2, PlusSquare, User } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../../components/ui/button';
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
    const [openDialog, setOpenDiaglog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState();
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const onCreate=()=>{        
      setLoading(true);
        const uuid = uuidv4();
        const data = {
          data:{
            title : resumeTitle,
            resumeId : uuid,
            userName : user?.fullName,
            userEmail : user?.primaryEmailAddress?.emailAddress
          }
        }
        console.log("Requesting to:", import.meta.env.VITE_BASE_URL + "/api/user-resumes");

        GlobalApi.CreateNewResume(data).then(resp=>{
          if(resp){
            setLoading(false);
            console.log("Created resume: " , )
            navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit');
          }
        },(error)=>{
          console.log("error when creating resume:" , resp);
          setLoading(false);
        } )
    }
    
  return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center bg-secondary
        rounded-lg h-[280px]
        w-[250px]
        hover:scale-105 transition-all
        hover:shadow-md
        cursor-pointer
        border-dashed'  onClick={()=>setOpenDiaglog(true)} >
            <PlusSquare/>
        </div>
        <Dialog open={openDialog}>
    <DialogTrigger></DialogTrigger>
    <DialogContent>
    <DialogHeader>        
        <DialogTitle >Create New Resume</DialogTitle>
        <DialogDescription>
            <p>Add a Title For Your New Resume</p>
        <Input className="my-2" placeholder = "Ex.Software Developer Resume" 
        onChange={(e) => setResumeTitle(e.target.value)}/>
 
      </DialogDescription>
      <div className='flex justify-end gap-5'>
        <Button onClick={()=>setOpenDiaglog(false)} variant="ghost">Cancel</Button>
        <Button 
        disabled={!resumeTitle || loading}
        onClick={()=>onCreate()}>
          {loading?
          <Loader2 className='animate-spin'/> : 'Create'
        }
          </Button>

      </div>
    </DialogHeader>
  </DialogContent>  

    </Dialog>
    </div>

  );
}

export default AddResume;