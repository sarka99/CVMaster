import React, { act, useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import Summary from './forms/Summary';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(false)

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
        <div className='flex gap-2'>
          {activeFormIndex >=2 && 
          <Button size="sm"
          onClick = {()=> setActiveFormIndex(activeFormIndex-1)}>
             <ArrowLeft/>
             </Button>}
          <Button className='flex gap-2' size="sm"
          disabled = {!enableNext}
          onClick = {()=> setActiveFormIndex(activeFormIndex+1)}>
            Next 
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/*personal detail*/}
      {activeFormIndex == 1? <PersonalDetail enableNext = {(v) => setEnableNext(v)}/>
      :activeFormIndex==2? <Summary/>:null
      
      }

      {/* Summary  */}
      {/* Experience  */}
      {/* Educational detail  */}
      {/* Skills   */}
    </div>
  );
}

export default FormSection;
