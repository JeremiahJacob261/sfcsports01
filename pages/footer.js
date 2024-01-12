import Link from "next/link"
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
export default function Footer() {
    const {t} = useTranslation("all")
    return(
        <div>
            <p>Footer</p>
            <Link href='https://t.me/+zuEJOr2THctiMzQ1'>
                    <p style={{ color:'whitesmoke'}}>{t("TelegramGroup")}</p>
                    </Link>
        </div>
    )
}