import { useTranslation } from 'next-i18next'

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// export async function getStaticProps({ locale }) {
//     return {
//       props: {
//         ...(await serverSideTranslations(locale, [
//           'all',
//         ])),
//         // Will be passed to the page component as props
//       },
//     }
//   }
  export default function Casing({children}) { 
    const { t } = useTranslation()
    let modchild;
    try{
    let modchild = children.replaceAll(' ', '') ?? children;
    }catch(e){
      console.log(e)
    }
    return t(`${modchild ?? children}`);
  }