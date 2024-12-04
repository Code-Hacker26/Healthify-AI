import React,{useContext} from 'react';
import Hero from '../Hero';
import AboutSection from '../Section/AboutSection';

import Banner from '../Section/BannerSection';
import Section from '../Section';
import FeaturesSection from '../Section/FeaturesSection';
import TestimonialSection from '../Section/TestimonialSection';
import BlogSection from '../Section/BlogSection';

import FaqSection from '../Section/FaqSection';

import DepartmentSection from '../Section/DepartmentSection';
import { pageTitle } from '../../helpers/PageTitle';
import GlobalContext from '../../context/GlobalContext';
import { Link } from 'react-router-dom';



const featureListData = [
  {
    iconSrc: '/assets/images/home_1/compassion.svg',
    title: 'Compassion',
    subTitle:
      'We understand that seeking medical care can be a stressful and emotional experience, and we strive to create a welcoming and supportive environment that puts our patients at ease and every one.',
  },
  {
    iconSrc: '/assets/images/home_1/excellence.svg',
    title: 'Excellence',
    subTitle:
      'We are committed to providing excellent medical care and services to our patients. We believe in continuously improving our skills, knowledge, and resources to ensure that we deliver the highest quality care possible.',
  },
  {
    iconSrc: '/assets/images/home_1/integrity.svg',
    title: 'Integrity',
    subTitle: `We believe in practicing medicine with integrity and honesty. We are transparent in our communication and decision-making processes, and we always put our patient's interests first & provide best solution.`,
  },
  {
    iconSrc: '/assets/images/home_1/respect.svg',
    title: 'Respect',
    subTitle:
      'We treat all individuals with respect and dignity, regardless of their background, beliefs, or circumstances. We believe that every person deserves to be treated with compassion and kindness.',
  },
  {
    iconSrc: '/assets/images/home_1/teamwork.svg',
    title: 'Teamwork',
    subTitle:
      'We believe in working collaboratively with our team members and other healthcare professionals to provide comprehensive and effective care to our patients.',
  },
];

const brandData = [
  { imgUrl: '/assets/images/brand_1.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_2.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_3.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_4.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_5.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_6.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_7.png', imgAlt: 'Brand' },
  { imgUrl: '/assets/images/brand_8.png', imgAlt: 'Brand' },
];

const faqData = [
  {
    title: 'What services does our healthcare platform offer?',
    content:
      'Our platform offers a variety of services including online doctor consultations, disease prediction based on symptoms, patient registration, telemedicine options for video consultations, and access to healthcare professionals across different specializations.',
  },
  {
    title: 'How do I schedule an appointment?',
    content:
      'You can easily schedule an appointment by selecting a doctor based on your needs, choosing an available time slot, and confirming your appointment directly through the platform. You can also opt for video consultations through our telemedicine feature.',
  },
  {
    title: 'Can I use health insurance for consultations?',
    content:
      'We currently do not support direct integration with health insurance providers. However, you can contact your insurance company to check if telemedicine services are reimbursable.',
  },
  {
    title: 'What should I prepare before a consultation?',
    content:
      'Before your consultation, make sure to have a list of symptoms, your medical history, and any relevant documents ready. For video consultations, ensure you have a stable internet connection and a quiet environment for the call.',
  },
  {
    title: 'How do I request a prescription refill?',
    content:
      'To request a prescription refill, simply log in to your account, go to your consultation history, and request a refill from your previous consultation. The doctor will review and approve the request if necessary.',
  },
];

const blogData = [
  {
    title: 'The Benefits of Mindfulness Meditation for Stress and Anxiety',
    thumbUrl: '/assets/images/home_1/post_1.jpeg',
    date: 'May 1, 2023',
    btnText: 'Learn More',
    href: 'https://isha.sadhguru.org/yoga/meditations/benefits-of-meditation/?gad_source=1&gclid=Cj0KCQjwurS3BhCGARIsADdUH51_OIiuJI283h6ezFCFFSEWYKaYvTkRc2z9GibVSDG9tpOiNmllZ_waAuHaEALw_wcB',
    socialShare: true,
  },
  {
    title: 'Healthy Eating on a Budget: Tips and Strategies',
    thumbUrl: '/assets/images/home_1/post_2.jpeg',
    date: 'May 4, 2023',
    btnText: 'Learn More',
    href: 'https://www.healthline.com/nutrition/19-ways-to-eat-healthy-on-a-budget',
    socialShare: true,
  },
  {
    title: 'The Importance of Regular Cancer Screenings and Early Detection',
    thumbUrl: '/assets/images/home_1/post_3.jpeg',
    date: 'May 1, 2023',
    btnText: 'Learn More',
    href: 'https://www.who.int/europe/news-room/fact-sheets/item/cancer-screening-and-early-detection-of-cancer',
    socialShare: true,
  },
];



const departmentData = [
  {
    title: 'ENT Department',
    iconUrl: '/assets/images/home_1/department_icon_2.svg',
    href: '/',
  },
  {
    title: 'Gynecology Department',
    iconUrl: '/assets/images/home_1/department_icon_3.svg',
    href: '/',
  },
  {
    title: 'Cardiology Department',
    iconUrl: '/assets/images/home_1/department_icon_4.svg',
    href: '/',
  },
  {
    title: 'Neurology Department',
    iconUrl: '/assets/images/home_1/department_icon_5.svg',
    href: '/',
  },
  {
    title: 'Neurology Department',
    iconUrl: '/assets/images/home_1/department_icon_6.svg',
    href: '/',
  },
];

export default function Home() {
  pageTitle('Home');
  const gContext = useContext(GlobalContext);


  return (
    <>

   
   <Hero
  title="Your Partner in Health and Wellness"
  subTitle="We are committed to providing you with the best medical and healthcare services to help you live healthier and happier."
  bgUrl="/assets/images/home_1/hero_bg.jpeg"
  imgUrl="/assets/images/home_1/hero_img.png"
  videoBtnText="See how we work"
  videoUrl="https://www.youtube.com/embed/VcaAVWtP48A"
  infoList={[
    {
      title: 'Hotline',
      subTitle: '9687148778',
      iconUrl: '/assets/images/contact/icon_1.svg',
    },
    {
      title: 'Ambulance',
      subTitle: 'Dial : 108',
      iconUrl: '/assets/images/icons/ambulance.svg',
    },
    {
      title: 'Location',
      subTitle: 'Ahmedabad Gujarat',
      iconUrl: '/assets/images/icons/pin.svg',
    },
  ]}
  btnText="Disease Prediction"
  
  btnUrl="/predict"
/>

      {/* Start Feature Section */}
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={185}
        bottomLg={140}
        bottomXl={100}
      >
        <FeaturesSection sectionTitle="Our Values" data={featureListData} />
      </Section>
      {/* End Feature Section */}
      {/* Start About Section */}
      <Section>
      <AboutSection
  imgUrl="/assets/images/home_1/about.png"
  spiningImgUrl="/assets/images/home_1/about_mini.svg"
  title="About Us"
  subTitle="PRO HEALTH"
  featureList={[
    {
      featureListTitle:
        'ProHealth is a team of experienced medical professionals',
      featureListSubTitle:
        'Dedicated to providing top-quality healthcare services...',
    },
  ]}
/>

      </Section>
      {/* End About Section */}
      {/* Start Departments Section */}
      <Section topMd={185} topLg={150} topXl={110}>
  <DepartmentSection
    sectionTitle="Departments"
    bgUrl="/assets/images/home_1/department_bg.svg"
    data={departmentData}
  />
</Section>

{/* End Departments Section */}

{/* Start Testimonial */}
<Section
  topMd={185}
  topLg={140}
  topXl={100}
  bottomMd={200}
  bottomLg={150}
  bottomXl={110}
>
  <TestimonialSection
    sectionTitle="Some Feedback"
    sectionTitleDown="Of our Patients"
  />
</Section>
{/* End Testimonial */}
{/* Start Banner Section */}
<Section>
  <Banner
    bgUrl="/assets/images/home_1/cta_bg.svg"
    imgUrl="/assets/images/home_1/cta_img.png"
    title="Don’t Let Your Health Take a Backseat!"
    subTitle="Schedule an appointment with one of our experienced medical professionals today!"
  />
</Section>
{/* End Banner Section */}
{/* Start Blog Section */}
<Section topMd={190} topLg={145} topXl={105}>
  <BlogSection
    sectionTitle="Latest Update"
    sectionTitleUp="BLOG POSTS"
    data={blogData}
  />
</Section>
{/* End Blog Section */}

{/* Start Appointment Section */}
{/* <Section topMd={190} topLg={145} topXl={105} id="appointment">
  <AppointmentSection
    sectionTitle="Appointment"
    sectionTitleUp="BOOK AN"
    imgUrl="/assets/images/home_1/appointment.jpeg"
  />
</Section> */}
{/* End Appointment Section */}
{/* Start FAQ Section */}
<Section topMd={190} topLg={145} topXl={105}>
  <FaqSection
    data={faqData}
    sectionTitle="Usually Asked"
    sectionTitleUp="What People"
  />
</Section>
{/* End FAQ Section */}
</>
  );
}