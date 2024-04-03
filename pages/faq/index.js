import { useState } from 'react'
import { Stack, Container } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router'
import faq from '../api/faq.json'
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'faq',
        ])),
        // Will be passed to the page component as props
      },
    }
  }
export default function Faq() {
  const { t } = useTranslation('faq')
  const [expanded, setExpanded] = useState(false);

  let i = 0;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
const router = useRouter();
  return (
    <div className='backgrounds'>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <CloseIcon style={{ color: '#E5E7EB', width: '30px', height: '30px', margin: '8px' }}
        onClick={()=>{
          router.back()
        }}
        /><p className="title-faq" sx={{ height: '91px', color: '#D9D9D9', textAlign: 'center', fontSize: '32px', fontWeight: '900',fontFamily:'Poppins,sans-serif' }}>
        {t("FREQUENTLYASKEDQUESTIONS")}
      </p>
      </Stack>
      
      <Container sx={{ height: '42px' }}></Container>
      <Stack sx={{padding:'8px'}} spacing={1}>
      {
        faq.QA.map((f)=>{
         
          return(
            <Accordion expanded={expanded === `panel${f.id}`} onChange={handleChange(`panel${f.id}`)}
            sx={{background:'#3F1052'}}
            key={f.id}
            >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p sx={{ width: '33%', flexShrink: 0,color:'#3F1052',fontFamily:'Poppins,sans-serif' }}>
            {t(f.Question) ?? t.Question}
          </p>
          <p sx={{ color: '#E5E7EB' }}></p>
        </AccordionSummary>
        <AccordionDetails>
          <p sx={{ color: '#E5E7EB',fontWeight:'100',fontSize:'15px',fontFamily:'Poppins,sans-serif' }}>
           {t(f.Answer) ?? f.Answer}
          </p>
        </AccordionDetails>
      </Accordion>
          )
        })
      }
      </Stack>
      
    </div>
  )
}