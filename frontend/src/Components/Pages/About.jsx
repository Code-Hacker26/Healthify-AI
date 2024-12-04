import React from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';
import DepartmentSectionStyle2 from '../Section/DepartmentSection/DepartmentSectionStyle2';
import FeaturesSectionStyle2 from '../Section/FeaturesSection/FeaturesSectionStyle2';

import TeamSection from '../Section/TeamSection';
import { pageTitle } from '../../helpers/PageTitle';
const departmentData = [
  {
    title: 'Neurology',
    subTitle:
      'Blood tests, imaging studies, and other tests to diagnose health conditions',
    iconUrl: '/assets/images/icons/calendar_white.svg',
    href: '/',
  },
  {
    title: 'Rehabilitation services',
    subTitle:
      'Physical therapy, occupational therapy, and other services to help patients recover from injuries',
    iconUrl: '/assets/images/icons/calendar_white.svg',
    href: '/departments/department-details',
  },
  {
    title: 'Preventive care',
    subTitle:
      'Annual checkups, immunizations, and health screenings care preventive',
    iconUrl: '/assets/images/icons/calendar_white.svg',
    href: '/departments/department-details',
  },
  {
    title: 'Treatment for acute and chronic conditions',
    subTitle:
      'Medication management, disease management, and other treatments to improve health outcomes',
    iconUrl: '/assets/images/icons/calendar_white.svg',
    href: '/departments/department-details',
  },
  {
    title: 'Mental health services',
    subTitle:
      'Counseling, therapy, and other services to help patients manage mental health conditions',
    iconUrl: '/assets/images/icons/calendar_white.svg', // Fixed path here
    href: '/departments/department-details',
  },
];

const featureListData = [
  {
    title: 'Experienced Medical Professionals',
    subTitle:
      'Our team includes experienced doctors, nurses, <br />and other healthcare professionals who are <br />dedicated to providing the best possible care to <br />our patients.',
    iconUrl: '/assets/images/icons/professional.svg',
  },
  {
    title: 'Comprehensive <br />Services',
    subTitle:
      'We offer a wide range of healthcare services, <br />from preventive care to specialized treatment <br />for complex conditions.',
    iconUrl: '/assets/images/icons/comprehensive.svg',
  },
  {
    title: 'Patient-centered <br />Approach',
    subTitle:
      'We believe in treating each patient as an <br />individual, and we take the time to understand <br />your unique health needs and concerns.',
    iconUrl: '/assets/images/icons/patient.svg',
  },
  {
    title: 'State-of-the-art <br />Facilities',
    subTitle:
      'Our healthcare center is equipped with the <br />latest technology and equipment to provide our <br />patients with the most advanced care possible.',
    iconUrl: '/assets/images/icons/facilities.svg',
  },
];


const teamData = [
  {
    imgUrl: '/assets/images/about/doctor_1.png',
    name: 'Dr. James Lee, MD',
    designation: 'Head of Cardiologist',
    description:
      'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
  },
  {
    imgUrl: '/assets/images/about/doctor_2.png',
    name: 'Dr. John Smith, MD',
    designation: 'Emergency Medicine Physician',
    description:
      'With expertise in treating acute illnesses and injuries in medicine physician',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
  },
  {
    imgUrl: '/assets/images/about/doctor_3.png',
    name: 'Dr. Susan Bones, MD',
    designation: 'Board-certified Pediatrician',
    description:
      'With experience in managing complex medical conditions in children',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
  },
];


export default function About() {
  pageTitle('About');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/assets/images/about/banner_bg.svg"
        imgUrl="/assets/images/about/banner_img.png"
        title="Welcome to <br />ProHealth Medical & Healthcare Center"
        subTitle="Your Partner in Health and Wellness"
      />
      <Section topMd={175} topLg={125} topXl={85} bottomMd={100} bottomLg={110}>
        <FeaturesSectionStyle2
          sectionTitle="Why Choose Us"
          imgUrl="/assets/images/about/doctor_1.png"
          data={featureListData}
        />
      </Section>
      <Section topMd={190} topLg={145} topXl={105}>
        <TeamSection
          sectionTitle="Experts Doctor"
          sectionTitleUp="MEET OUR"
          data={teamData}
        />
      </Section>
    </>
  );
}
