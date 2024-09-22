import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; // Import useParams here
import PersonalDetail from './forms/PersonalDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid, Home } from 'lucide-react';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams(); // useParams is now available

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center gap-5'>
          <Link to="/dashboard">
            <Button className="flex gap-5"><Home /></Button>
          </Link>

         <ThemeColor></ThemeColor>

        </div>

        <div className='flex gap-2'>
          {activeFormIndex >= 2 && (
            <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            className='flex gap-2'
            size="sm"
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Conditional rendering based on form index */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : activeFormIndex === 6 ? (
        <Navigate to={'/my-resume/' + resumeId + '/view'} />
      ) : null}
    </div>
  );
}

export default FormSection;
