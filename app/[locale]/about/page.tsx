import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Associació Formació i Sensibilització Barcelona",
  description: "This is About Page for Associació Formació i Sensibilització Barcelona",
  // other metadata
};

const AboutPage = () => {


  const t = useTranslations('home');
  return (
    <>
      <Breadcrumb
        pageName="About us"
        description="The Associació Formació i Sensibilització Barcelona is a recently registered organization that started its activities in 2019 as an initiative group."
      />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
    </>
  );
};

export default AboutPage;
