import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'all',
        ])),
        // Will be passed to the page component as props
      },
    }
  }

  export default function p({children}) { 
    const { t } = useTranslation()
    console.log(t('all:SeeAllReferrals'))
    let modchild;
    try{
    let modchild = children.replaceAll(' ', '');
    }catch(e){
      console.log(e)
    }
    return <p>{t(`${children.replaceAll(' ', '') ?? children}`)}</p>;
  }